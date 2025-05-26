import React, { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import DrawerMenu from '../components/DrawerMenu';
import './TeamMatching2.css';

const dummyRooms = [
  {
    id: 1,
    leader: '이민지',
    tech: ['React', 'Firebase'],
    lookingFor: ['백엔드'],
    status: '모집중',
  },
  {
    id: 2,
    leader: '김철수',
    tech: ['Java', 'Spring'],
    lookingFor: ['디자인'],
    status: '모집완료',
  }
];

function TeamMatching2() {
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [openMenus, setOpenMenus] = useState({});

  return (
    <div className="team-matching-container">
      {/* 헤더 */}
      <header className="team-matching-header">
        <span className="logo">TUP!</span>
        {!drawerOpen && (
          <button
            className="menu-button"
            onClick={() => setDrawerOpen(true)}
            aria-label="메뉴 열기"
          >
            <MenuIcon style={{ fontSize: '2.2rem', color: '#FF6B35' }} />
          </button>
        )}
      </header>

      {/* 드로어 메뉴 */}
      <DrawerMenu
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        openMenus={openMenus}
        onToggle={setOpenMenus}
      />

      {/* 소개 텍스트 */}
      <div className="matching-intro">
        <h1>
          <span className="highlight">OpenTeamUp</span> - 자유롭게 팀 결성하기
        </h1>
        <p>
          원하는 팀장을 선택하거나, 나만의 팀을 만들어 자유롭게 팀원을 구성해보세요.
        </p>
      </div>

      {/* 팀 목록 카드 */}
      <div className="team-rooms">
        {dummyRooms.map(room => (
          <div key={room.id} className="room-card" onClick={() => setSelectedTeam(room)}>
            <h4>{room.leader}님의 팀</h4>
            <p>보유 기술: {room.tech.join(', ')}</p>
            <p>모집 포지션: {room.lookingFor.join(', ')}</p>
            <p className={`status ${room.status === '모집중' ? 'open' : 'closed'}`}>{room.status}</p>
          </div>
        ))}
      </div>

      {/* 선택된 팀 상세보기 */}
      {selectedTeam && (
        <div className="team-detail">
          <h3>팀장: {selectedTeam.leader}</h3>
          <p>보유 기술: {selectedTeam.tech.join(', ')}</p>
          <p>모집 중인 역할: {selectedTeam.lookingFor.join(', ')}</p>
          <button className="cta-button">이 팀에 신청하기</button>
        </div>
      )}
    </div>
  );
}

export default TeamMatching2;
