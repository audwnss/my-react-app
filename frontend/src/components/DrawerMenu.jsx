import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const drawerMenus = [
  { key: "mypage", label: "마이페이지", sub: ["내 정보", "프로필 편집", "내 별점 확인하기⭐"] },
  { key: "activity", label: "활동 내역", sub: ["참가 공모전", "팀 프로젝트", "팀 채팅"] },
  { key: "settings", label: "설정", sub: ["알림 설정", "계정 관리"] },
];

function DrawerMenu({ open, onClose, openMenus, onToggle }) {
  if (!open) return null;

  return (
    <div
      className="drawer-overlay"
      onClick={(e) => e.target.classList.contains('drawer-overlay') && onClose()}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(0,0,0,0.25)',
        zIndex: 2000
      }}
    >
      <nav
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          width: '320px',
          height: '100vh',
          background: '#fff',
          padding: '2rem 1.5rem',
          boxShadow: '-2px 0 30px rgba(0,0,0,0.15)',
          zIndex: 2100
        }}
      >
        <button onClick={onClose} style={{
          background: 'none',
          border: 'none',
          position: 'absolute',
          top: '1.2rem',
          right: '1.2rem',
          zIndex: 2110,
          cursor: 'pointer'
        }}>
          <CloseIcon style={{ fontSize: '2rem', color: '#FF6B35' }} />
        </button>

        <h2 style={{ color: '#FF6B35', marginBottom: '2rem' }}>메뉴</h2>

        {drawerMenus.map(menu => (
          <div key={menu.key} style={{ marginBottom: '1.2rem' }}>
            <button
              onClick={() => onToggle(prev => ({ ...prev, [menu.key]: !prev[menu.key] }))}
              style={{
                width: '100%',
                background: 'none',
                border: 'none',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0.7rem 0.6rem',
                borderRadius: '7px',
                backgroundColor: openMenus[menu.key] ? '#FFF7F1' : 'none'
              }}
            >
              {menu.label}
              {openMenus[menu.key] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </button>
            {openMenus[menu.key] && (
              <ul style={{ listStyle: 'none', paddingLeft: '1.3rem', margin: 0 }}>
                {menu.sub.map((item, idx) => (
                  <li key={idx} style={{ padding: '0.5rem 0', borderBottom: idx < menu.sub.length - 1 ? '1px solid #eee' : 'none' }}>
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
}

export default DrawerMenu;
