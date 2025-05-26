const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const { createTunnel } = require('tunnel-ssh');
const fs = require('fs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// ==============================================
// SSH 터널 설정 (환경변수 기반)
// ==============================================
const tunnelConfig = {
  // SSH 서버 정보
  host: process.env.SSH_HOST,
  port: parseInt(process.env.SSH_PORT) || 22,
  username: process.env.SSH_USER,

  // 인증 방식 (비밀번호/키 중 선택)
  ...(process.env.SSH_PASSWORD 
    ? { password: process.env.SSH_PASSWORD }
    : {
        privateKey: fs.readFileSync(process.env.SSH_KEY_PATH),
        passphrase: process.env.SSH_PASSPHRASE
      }
  ),

  // 대상 MySQL 서버 정보
  dstHost: process.env.DB_HOST,
  dstPort: parseInt(process.env.DB_PORT) || 3306,
  
  // 로컬 포트 포워딩 설정
  localHost: '127.0.0.1',
  localPort: 3307
};

// ==============================================
// 글로벌 변수 선언
// ==============================================
let pool; // MySQL 커넥션 풀
let sshTunnel; // SSH 터널 인스턴스

// ==============================================
// 서버 초기화 함수
// ==============================================
const initializeServer = async () => {
  try {
    // 1. SSH 터널 생성
    sshTunnel = await new Promise((resolve, reject) => {
  const server = createTunnel(
    {}, // tunnelOptions (필요시 옵션 추가)
    { port: tunnelConfig.localPort }, // serverOptions
    {
      host: tunnelConfig.host,
      port: tunnelConfig.port,
      username: tunnelConfig.username,
      password: tunnelConfig.password,
      privateKey: tunnelConfig.privateKey,
      passphrase: tunnelConfig.passphrase
    }, // sshOptions
    {
      srcAddr: tunnelConfig.localHost,
      srcPort: tunnelConfig.localPort,
      dstAddr: tunnelConfig.dstHost,
      dstPort: tunnelConfig.dstPort
    }, // forwardOptions
    (error) => {
      error ? reject(error) : resolve(server);
    }
  );
});
    console.log('✅ SSH 터널 연결 성공');

    // 2. MySQL 커넥션 풀 생성
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
    const testConn = await pool.getConnection();
    await testConn.ping();
    testConn.release();
    console.log('✅ MySQL 연결 성공');

    // 4. 서버 시작
    app.listen(PORT, () => {
      console.log(`🚀 서버 실행: http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error('❌ 서버 초기화 실패:', error);
    process.exit(1);
  }
};

// ==============================================
// 미들웨어 설정
// ==============================================
app.use(cors());
app.use(express.json());

// ==============================================
// API 엔드포인트 (기존 코드 100% 보존)
// ==============================================

// 사용자 전체 조회
app.get('/api/users', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM users');
    res.json(rows);
  } catch (err) {
    handleDBError(res, err);
  }
});

// 사용자 상세 조회
app.get('/api/users/:id', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM users WHERE user_id = ?',
      [req.params.id]
    );
    res.json(rows[0] || {});
  } catch (err) {
    handleDBError(res, err);
  }
});

// 프로필 조회 (사용자 JOIN)
app.get('/api/profiles', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT u.user_id, u.name, u.email, 
             p.tech_stack, p.keywords, p.average
      FROM users u
      JOIN profiles p ON u.user_id = p.user_id
    `);
    res.json(rows);
  } catch (err) {
    handleDBError(res, err);
  }
});

// 공모전 목록 조회
app.get('/api/competitions', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT c.*, COUNT(t.team_id) AS team_count 
      FROM competitions c
      LEFT JOIN teams t ON c.competition_id = t.competition_id
      GROUP BY c.competition_id
    `);
    res.json(rows);
  } catch (err) {
    handleDBError(res, err);
  }
});

// 공모전별 팀 조회
app.get('/api/competitions/:id/teams', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT t.team_id, GROUP_CONCAT(u.name) AS members
      FROM teams t
      JOIN teammembers tm ON t.team_id = tm.team_id
      JOIN users u ON tm.user_id = u.user_id
      WHERE t.competition_id = ?
      GROUP BY t.team_id
    `, [req.params.id]);
    res.json(rows);
  } catch (err) {
    handleDBError(res, err);
  }
});

// 팀 생성 (트랜잭션 처리)
app.post('/api/teams', async (req, res) => {
  const { competition_id, members } = req.body;
  const connection = await pool.getConnection();
  
  try {
    await connection.beginTransaction();

    // 1. 팀 생성
    const [teamResult] = await connection.query(
      'INSERT INTO teams (competition_id) VALUES (?)',
      [competition_id]
    );
    const teamId = teamResult.insertId;

    // 2. 팀 멤버 추가
    for (const userId of members) {
      await connection.query(
        'INSERT INTO teammembers (team_id, user_id) VALUES (?, ?)',
        [teamId, userId]
      );
    }

    await connection.commit();
    res.json({ success: true, team_id: teamId });
  } catch (err) {
    await connection.rollback();
    handleDBError(res, err);
  } finally {
    connection.release();
  }
});

// 평가 생성
app.post('/api/evaluations', async (req, res) => {
  const { team_id, evaluatee_id, evaluator_id, competition_id, score } = req.body;
  
  try {
    const [result] = await pool.query(
      `INSERT INTO evaluation 
      (team_id, evaluatee_id, evaluator_id, competition_id, score) 
      VALUES (?, ?, ?, ?, ?)`,
      [team_id, evaluatee_id, evaluator_id, competition_id, score]
    );
    res.json({ success: true, evaluation_id: result.insertId });
  } catch (err) {
    handleDBError(res, err);
  }
});

// 채팅 메시지 조회
app.get('/api/chatrooms/:room_id/messages', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT m.*, u.name AS user_name
      FROM chatmessages m
      JOIN users u ON m.user_id = u.user_id
      WHERE m.room_id = ?
      ORDER BY m.sent_at
    `, [req.params.room_id]);
    res.json(rows);
  } catch (err) {
    handleDBError(res, err);
  }
});

// ==============================================
// 에러 핸들링 시스템
// ==============================================
const handleDBError = (res, err) => {
  console.error('❗️ 데이터베이스 오류:', err);
  res.status(500).json({ 
    error: {
      message: err.message,
      code: err.code,
      sql: err.sql
    } 
  });
};

// ==============================================
// 서버 초기화 실행
// ==============================================
initializeServer().catch(error => {
  console.error('🔥 치명적 오류:', error);
  process.exit(1);
});

// ==============================================
// Graceful Shutdown 설정
// ==============================================
process.on('SIGINT', async () => {
  console.log('\n🔴 서버 종료 중...');
  if (pool) await pool.end();
  if (sshTunnel) sshTunnel.close();
  process.exit();
});
