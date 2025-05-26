// src/components/FeedbackButtons.jsx
import React from 'react';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

const FeedbackButtons = ({ teamIndex, feedbacks, onFeedback }) => {
  return (
    <div style={{
      display: 'flex',
      gap: '0.5rem',
      marginTop: '1rem',
      alignItems: 'center'
    }}>
      <span>피드백:</span>
      <button
        onClick={() => onFeedback(teamIndex, true)}
        style={{
          background: feedbacks[teamIndex] === true ? '#FF6B35' : '#eee',
          border: 'none',
          padding: '0.5rem 1rem',
          borderRadius: '20px',
          cursor: 'pointer',
          color: feedbacks[teamIndex] === true ? 'white' : '#333'
        }}
      >
        <ThumbUpIcon />
      </button>
      <button
        onClick={() => onFeedback(teamIndex, false)}
        style={{
          background: feedbacks[teamIndex] === false ? '#FF6B35' : '#eee',
          border: 'none',
          padding: '0.5rem 1rem',
          borderRadius: '20px',
          cursor: 'pointer',
          color: feedbacks[teamIndex] === false ? 'white' : '#333'
        }}
      >
        <ThumbDownIcon />
      </button>
    </div>
  );
};

export default FeedbackButtons;
