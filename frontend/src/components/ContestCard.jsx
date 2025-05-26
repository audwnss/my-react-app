// src/components/ContestCard.jsx
import React from 'react';

const ContestCard = ({ onClick }) => {
  return (
    <div
      style={{
        background: 'white',
        padding: '2rem',
        borderRadius: '16px',
        boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        cursor: 'pointer',
        transition: 'transform 0.3s',
        fontFamily: "'Montserrat', 'Noto Sans KR', Arial, sans-serif"
      }}
      onClick={onClick}
    >
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
        <img
          src="/aws.png"
          alt="AWS"
          style={{
            width: '80px',
            height: '80px',
            objectFit: 'cover',
            borderRadius: '8px',
            marginRight: '1rem'
          }}
        />
        <div style={{ textAlign: 'left' }}>
          <h4 style={{ margin: 0, fontWeight: 700, color: '#333' }}>
            2025 AWS x Codetree 프로그래밍 경진대회
          </h4>
          <p style={{ margin: 0, color: '#666', fontSize: '0.95rem' }}>
            마감: 2025년 05월 16일 (D-14)
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContestCard;
