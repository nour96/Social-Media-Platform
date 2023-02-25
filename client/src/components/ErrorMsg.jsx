import React from 'react';

export const ErrorMsg = ({ msg }) => {
  return (
    <div style={{ textAlign: 'start', color: 'red', fontSize: 'small' }}>
      {msg}
    </div>
  );
};
