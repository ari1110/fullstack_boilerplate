import React from 'react';
import config from '../config';

const GoogleLoginButton = () => {
  const handleGoogleLogin = () => {
    window.location.href = `${config.API_URL}/accounts/google/login/`;
  };

  return (
    <button onClick={handleGoogleLogin} className="google-login-button">
      Login with Google
    </button>
  );
};

export default GoogleLoginButton;