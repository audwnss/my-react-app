import React, { useState } from 'react';
import CodeIcon from '@mui/icons-material/Code';

function SkillManager({ skills, setSkills }) {
  const [newSkill, setNewSkill] = useState('');

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  return (
    <div style={{ padding: '1.5rem', background: '#f8f9fa', borderRadius: '12px', marginTop: '1.5rem' }}>
      <h3 style={{
        color: '#FF6B35',
        marginBottom: '1rem',
        fontFamily: "'Montserrat', 'Noto Sans KR', Arial, sans-serif",
        fontWeight: 700,
        letterSpacing: '0.02em'
      }}>
        <CodeIcon style={{ marginRight: '8px' }} />
        나의 기술 스택 관리
      </h3>
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <input
          type="text"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          placeholder="새로운 기술 추가 (예: React, Python, AWS)"
          style={{
            flex: 1,
            padding: '0.8rem',
            borderRadius: '8px',
            border: '1px solid #ddd',
            fontFamily: "'Noto Sans KR', 'Montserrat', Arial, sans-serif"
          }}
        />
        <button
          onClick={handleAddSkill}
          style={{
            padding: '0.5rem 1rem',
            background: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer'
          }}
        >
          추가
        </button>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
        {skills.map((skill, index) => (
          <div key={index} style={{
            background: '#FFEBD6',
            padding: '0.5rem 1rem',
            borderRadius: '20px',
            fontSize: '0.95rem',
            fontFamily: "'Montserrat', 'Noto Sans KR', Arial, sans-serif"
          }}>
            {skill}
          </div>
        ))}
      </div>
    </div>
  );
}

export default SkillManager;
