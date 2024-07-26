import React from 'react';

export const InfoCard = ({ title, value, description }) => {
  return (
    <div style={styles.card}>
      <h3>{title}</h3>
      <p style={styles.value}>{value}</p>
      <p>{description}</p>
    </div>
  );
};

const styles = {
  card: {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '16px',
    margin: '8px',
    textAlign: 'center',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  value: {
    fontSize: '24px',
    fontWeight: 'bold',
    margin: '8px 0',
  },
};
