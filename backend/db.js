const mysql = require('mysql2/promise');
const tunnel = require('tunnel-ssh');
const fs = require('fs');
require('dotenv').config();

let pool;      // MySQL 커넥션 풀
let sshTunnel; // SSH 터널 인스턴스

// SSH 터널 설정
const tunnelConfig = {
  host: process.env.SSH_HOST,
  port: parseInt(process.env.SSH_PORT) || 22,
  username: process.env.SSH_USER,

  // 인증 방식: 비밀번호 또는 키
  ...(process.env.SSH_PASSWORD
    ? { password: process.env.SSH_PASSWORD }
    : {
        privateKey: fs.readFileSync(process.env.SSH_KEY_PATH),
        passphrase: process.env.SSH_PASSPHRASE
      }
  ),

  dstHost: process.env.DB_HOST,
  dstPort: parseInt(process.env.DB_PORT) || 3306,
  localHost: '127.0.0.1',
  localPort: 3307
};

// SSH 터널 및 MySQL 풀 생성 함수
async function connectWithTunnel() {
  // 1. SSH 터널 생성
  sshTunnel = await new Promise((resolve, reject) => {
    const server = tunnel(tunnelConfig, (error) => {
      error ? reject(error) : resolve(server);
    });
  });
  console.log('✅ SSH 터널 연결 성공');

  // 2. MySQL 풀 생성 (로컬 터널 포트 사용)
  pool = mysql.createPool({
    host: tunnelConfig.localHost,
    port: tunnelConfig.localPort,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });

  // 3. 연결 테스트
  const conn = await pool.getConnection();
  await conn.ping();
  conn.release();
  console.log('✅ MySQL 연결 성공');
}

// 외부에서 pool 사용 가능하게 export
module.exports = {
  connectWithTunnel,
  getPool: () => pool,
  closeTunnel: () => {
    if (sshTunnel) sshTunnel.close();
    if (pool) pool.end();
  }
};
