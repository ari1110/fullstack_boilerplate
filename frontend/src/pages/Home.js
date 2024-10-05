import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div>
      <Header />
      <main>
        <h2>Welcome to My Fullstack App</h2>
        <p>This is the home page of your application.</p>
      </main>
      <Footer />
    </div>
  );
};

export default Home;