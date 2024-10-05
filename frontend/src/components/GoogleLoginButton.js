import React from 'react';

const GoogleLoginButton = () => {
  const handleGoogleLogin = () => {
    window.location.href = '/accounts/google/login/';
  };

  return (
    <button onClick={handleGoogleLogin} className="google-login-button">
      Login with Google
    </button>
  );
};

export default GoogleLoginButton;