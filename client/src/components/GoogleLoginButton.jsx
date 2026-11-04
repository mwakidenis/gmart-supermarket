import React from 'react';
import styled from 'styled-components';

// Styled component for Google sign-in button
const StyledGoogleLoginButton = styled.button`
  background-color: #db4437; /* Google red */
  border: none; /* No border */
  border-radius: 4px; /* Rounded corners */
  padding: 10px 20px; /* Padding */
  font-size: 16px; /* Font size */
  color: #ffffff; /* Text color */
  cursor: pointer; /* Cursor */
  transition: background-color 0.3s ease; /* Transition effect on hover */

  /* Hover state */
  &:hover {
    background-color: #c13584; /* Darker Google red on hover */
  }
`;

function GoogleLoginButton({ onClick, size }) {
  return (
    <StyledGoogleLoginButton type="button" onClick={onClick} style={{ width: size, height: 'auto' }}>
      {/* Google logo */}
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ marginRight: '8px' }}
      >
        <path
          d="M17.64 9.24C17.64 8.59 17.6 7.94 17.49 7.32H9v3.43h4.8c-.19 1.25-1.05 2.3-2.33 2.87v2.4h3.77c2.21-2.04 3.49-5.05 3.49-8.7z"
          fill="#fff"
        />
        <path
          d="M9 18c3.16 0 5.78-1.05 7.7-2.85l-3.77-2.4c-1.04.71-2.36 1.13-3.93 1.13-3.02 0-5.58-2.06-6.48-4.82H.88v2.41C2.29 15.27 5.3 18 9 18z"
          fill="#fff"
        />
        <path
          d="M2.52 10.2c-.14-.41-.23-.85-.23-1.3s.09-.89.23-1.3V5.18H.88C.32 6.62 0 8.26 0 10c0 1.74.32 3.38.88 4.82l1.64-1.27c-.34-.97-.54-2.05-.54-3.17z"
          fill="#fff"
        />
        <path
          d="M9 2.02c1.43 0 2.71.49 3.72 1.47l2.77-2.77C14.77.51 12.14 0 9 0 5.3 0 2.29 2.73.88 5.18l1.64 1.27C3.42 4.06 6.48 2.02 9 2.02z"
          fill="#fff"
        />
      </svg>
      Sign in with Google
    </StyledGoogleLoginButton>
  );
}

export default GoogleLoginButton;
