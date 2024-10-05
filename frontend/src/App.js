import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { checkAuthStatus, logout } from './features/auth/authSlice';
import Login from './pages/Login';
import Map from './components/Map';
import './App.css';

function App() {
  const { isAuthenticated, user, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuthStatus());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1 className="text-3xl font-bold underline">
            Fullstack App Boilerplate
          </h1>
          {isAuthenticated ? (
            <>
              <p>Welcome, {user.username || user.email}!</p>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <Navigate to="/login" replace />
          )}
        </header>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={isAuthenticated ? <Map /> : <Navigate to="/login" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;