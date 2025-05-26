// src/components/TeamList.jsx
import React from 'react';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import FeedbackButtons from './FeedbackButtons';

const TeamList = ({ matched, feedbacks, onFeedback }) => {
  return (
    <div style={{ marginTop: '2rem' }}>
      <h3 style={{
        fontFamily: "'Montserrat', 'Noto Sans KR', Arial, sans-serif",
        fontWeight: 700
      }}>매칭 결과</h3>

      {matched.map((team, idx) => (
        <div key={idx} style={{
          background: 'white',
          borderRadius: '8px',
          padding: '1rem',
          marginBottom: '1rem'
        }}>
          <h4 style={{
            fontFamily: "'Montserrat', 'Noto Sans KR', Arial, sans-serif",
            fontWeight: 700
          }}>팀 {idx + 1}</h4>

          {team.map(user => (
            <div key={user.id} style={{
              padding: '0.5rem',
              margin: '0.3rem 0',
              background: '#FFF9F7',
              borderRadius: '4px'
            }}>
              {user.name} - {user.skills.join(', ')}
            </div>
          ))}
          <FeedbackButtons
            teamIndex={idx}
            feedbacks={feedbacks}
            onFeedback={onFeedback}
          />

          <div style={{
            display: 'flex',
            gap: '0.5rem',
            marginTop: '1rem',
            alignItems: 'center'
          }}>
            <span>피드백:</span>
            <button
              onClick={() => onFeedback(idx, true)}
              style={{
                background: feedbacks[idx] === true ? '#FF6B35' : '#eee',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '20px',
                cursor: 'pointer',
                color: feedbacks[idx] === true ? 'white' : '#333'
              }}
            >
              <ThumbUpIcon />
            </button>
            <button
              onClick={() => onFeedback(idx, false)}
              style={{
                background: feedbacks[idx] === false ? '#FF6B35' : '#eee',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '20px',
                cursor: 'pointer',
                color: feedbacks[idx] === false ? 'white' : '#333'
              }}
            >
              <ThumbDownIcon />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TeamList;
