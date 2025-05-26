// src/components/ContestModal.jsx
import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import GroupsIcon from '@mui/icons-material/Groups';
import SkillManager from './SkillManager';
import TeamList from './TeamList';

const ContestModal = ({
  open,
  onClose,
  users,
  userSkills,
  setUserSkills,
  matched,
  matchTeam,
  feedbacks,
  onFeedback
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80%',
        maxWidth: 1200,
        bgcolor: 'background.paper',
        borderRadius: '12px',
        boxShadow: 24,
        p: 4,
        maxHeight: '90vh',
        overflowY: 'auto'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '2rem'
        }}>
          {/* 공모전 정보 (좌측) */}
          <div>
            <img
              src="/aws.png"
              alt="공모전"
              style={{ width: '100%', borderRadius: '8px', marginBottom: '1rem' }}
            />
            <h2 style={{
              fontFamily: "'Montserrat', 'Noto Sans KR', Arial, sans-serif",
              fontWeight: 800,
              color: '#222',
              letterSpacing: '0.01em'
            }}>
              2025 AWS x Codetree 프로그래밍 경진대회
            </h2>
            <div style={{
              background: '#F8F9FA',
              padding: '1rem',
              borderRadius: '8px',
              marginTop: '1rem',
              fontFamily: "'Noto Sans KR', 'Montserrat', Arial, sans-serif"
            }}>
              <p>• 주최: AWS / 코드트리</p>
              <p>• 일정: 2025.04.21 ~ 2025.05.16</p>
              <p>• 마감: D-14</p>
              <p>• 분야: 프로그래밍, 클라우드</p>
            </div>
            <SkillManager skills={userSkills} setSkills={setUserSkills} />
          </div>

          {/* 팀 매칭 + 팀 보기 (우측) */}
          <div>
            <h2 style={{
              color: '#FF6B35',
              fontFamily: "'Montserrat', 'Noto Sans KR', Arial, sans-serif",
              fontWeight: 800,
              letterSpacing: '0.01em'
            }}>
              <GroupsIcon style={{ marginRight: '8px' }} />
              함께하자 팀으로!
            </h2>

            <div style={{
              background: '#FFF5F2',
              borderRadius: '8px',
              padding: '1rem',
              marginTop: '1rem'
            }}>
              {/* 유저 리스트 */}
              <ul style={{
                listStyle: 'none',
                padding: 0,
                maxHeight: '200px',
                overflowY: 'auto',
                marginBottom: '1rem',
                fontFamily: "'Noto Sans KR', 'Montserrat', Arial, sans-serif"
              }}>
                {users.map(user => (
                  <li key={user.id} style={{
                    padding: '0.8rem',
                    margin: '0.5rem 0',
                    background: '#FFF9F7',
                    borderRadius: '6px'
                  }}>
                    {user.name} - {user.skills.join(', ')}
                  </li>
                ))}
              </ul>

              {/* 팀 매칭 버튼 */}
              <button
                onClick={matchTeam}
                style={{
                  width: '100%',
                  padding: '1rem',
                  background: '#FF6B35',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '1.1rem',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '8px',
                  fontWeight: 700
                }}
              >
                <GroupsIcon />
                TEAM UP!
              </button>

              {/* 매칭 결과 */}
              {matched.length > 0 && (
                <TeamList
                  matched={matched}
                  feedbacks={feedbacks}
                  onFeedback={onFeedback}
                />
              )}
            </div>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default ContestModal;
