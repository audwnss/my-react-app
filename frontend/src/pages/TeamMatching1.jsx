import React, { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import DrawerMenu from '../components/DrawerMenu';
import './TeamMatching1.css';


function TeamMatching1() {
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

      {/* 소개 문구 */}
      <div className="matching-intro">
        <h1>
          <span className="highlight">AutoTeamUp</span> - 빠르게 팀 결성하기
        </h1>
        <p>
          공모전을 선택한 참가자들이 랜덤으로 팀을 결성한 후, <strong>2차 피드백</strong>을 통해 최종 팀을 확정하는 방식입니다.
        </p>
      </div>
    </div>
  );
}

export default TeamMatching1;
