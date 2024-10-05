import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import GoogleLoginButton from '../components/GoogleLoginButton';

const Login = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="login-page">
      <h1>Login or Sign Up</h1>
      <p>Use your Google account to log in or sign up automatically:</p>
      <GoogleLoginButton />
      <p className="mt-4 text-sm text-gray-600">
        By logging in with Google, you'll be automatically registered if you're a new user.
      </p>
    </div>
  );
};

export default Login;