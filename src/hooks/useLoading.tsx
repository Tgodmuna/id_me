import React from 'react';

interface LoadingSpinnerProps {
  color?: string;
  size?: number;
  width?: number;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ( {
  color = '#00f',
  size = 40,
  width = 4,
} ) => {
  const spinnerStyle: React.CSSProperties = {
    border: `${ width }px solid ${ color }`,
    borderTop: `${ width }px solid transparent`,
    borderRadius: '50%',
    width: size,
    height: size,
    animation: 'spin 1s linear infinite',
    margin: 'auto'
  };

  return <div style={ spinnerStyle }></div>;
};

export default LoadingSpinner;
