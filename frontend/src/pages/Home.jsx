import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import MenuIcon from '@mui/icons-material/Menu';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import GroupsIcon from '@mui/icons-material/Groups';
import CodeIcon from '@mui/icons-material/Code';
import SkillManager from '../components/SkillManager';
import DrawerMenu from '../components/DrawerMenu';
import ContestCard from '../components/ContestCard';
import ContestModal from '../components/ContestModal';
import Header from '../components/Header';
import FeedbackButtons from '../components/FeedbackButtons';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const dummyUsers = [
  { id: 1, name: "홍길동", skills: ["React", "JavaScript"] },
  { id: 2, name: "김철수", skills: ["Python", "Django"] },
  { id: 3, name: "이영희", skills: ["Java", "Spring"] },
  { id: 4, name: "박민수", skills: ["C++", "알고리즘"] },
  { id: 5, name: "최지우", skills: ["UI/UX", "Figma"] },
  { id: 6, name: "정우성", skills: ["Node.js", "Express"] },
  { id: 7, name: "한지민", skills: ["DB", "SQL"] },
  { id: 8, name: "서준호", skills: ["React", "TypeScript"] },
  { id: 9, name: "오세훈", skills: ["AI", "TensorFlow"] },
  { id: 10, name: "임수정", skills: ["Flutter", "모바일"] },
];

function Home() {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [userSkills, setUserSkills] = useState(["React", "JavaScript"]);
  const [users] = useState(dummyUsers);
  const [matched, setMatched] = useState([]);
  const [feedbacks, setFeedbacks] = useState({});
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [openMenus, setOpenMenus] = useState({});

  const matchTeam = () => {
    const shuffled = [...users].sort(() => Math.random() - 0.5);
    setMatched([shuffled.slice(0, 5), shuffled.slice(5, 10)]);
  };

  const handleFeedback = (teamIndex, isPositive) => {
    setFeedbacks(prev => ({ ...prev, [teamIndex]: isPositive }));
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <span className="home-logo">TUP!</span>
        {!drawerOpen && (
          <button
            onClick={() => setDrawerOpen(true)}
            className="menu-button"
            aria-label="메뉴 열기"
          >
            <MenuIcon style={{ fontSize: '2.2rem', color: '#FF6B35' }} />
          </button>
        )}
      </header>

      <DrawerMenu
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        openMenus={openMenus}
        onToggle={setOpenMenus}
      />
    
      
            <section
        className="hero-banner"
        style={{
            backgroundImage: `url(${process.env.PUBLIC_URL}/team.png)`
        }}
        >
        <div className="hero-overlay">
            <div className="hero-content">
            <h1>
                <span className="brand">TUP!</span><br />
                함께할 <span className="highlight">팀원</span>이 필요하신가요?
            </h1>
            <p>
                <span className="brand">TUP!</span>은 공모전 참가자를 위한 지능형 팀 매칭 플랫폼입니다.<br />
                기술 스택과 관심사를 기반으로 최적의 팀원을 찾아보세요!
            </p>
            </div>
        </div>
        </section>

      <section className="features-section">
        <div className="scroll-indicator">▼</div>
        <div className="feature-card" onClick={() => window.open('/TeamMatching1', '_blank')}>
          <h2>AutoTeamUp</h2>
          <p>공모전을 먼저 선택한 뒤, 빠르게 랜덤으로 팀을 구성할 수 있어요.</p>
          <button>빠르게 팀 결성하기!</button>
        </div>
        <div className="feature-card" onClick={() => window.open('/TeamMatching2', '_blank')}>
          <h2>OpenTeamUp</h2>
          <p>원하는 공모전, 팀장 또는 팀원이 되어 자유롭게 참여해보세요.</p>
          <button>자유롭게 팀 결성하기!</button>
        </div>
      </section>

      <section className="contest-list-section">
        <h2><EmojiEventsIcon style={{ color: '#FF6B35', marginRight: '0.5rem' }} />공모전 참여하기</h2>
        <div className="contest-list-scroll">
          {[...Array(5)].map((_, idx) => (
            <div key={idx} className="contest-card" onClick={() => setModalOpen(true)}>
              <img src="/aws.png" alt="공모전 이미지" className="contest-img" />
              <div className="contest-text">
                <h4>2025 AWS x Codetree 프로그래밍 경진대회</h4>
                <p>마감: 2025년 05월 16일 (D-14)</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <ContestModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        users={users}
        userSkills={userSkills}
        setUserSkills={setUserSkills}
        matched={matched}
        matchTeam={matchTeam}
        feedbacks={feedbacks}
        onFeedback={handleFeedback}
      />
    </div>
  );
}

export default Home;
