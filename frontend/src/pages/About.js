import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const About = () => {
  return (
    <div>
      <Header />
      <main>
        <h2>About My Fullstack App</h2>
        <p>This is the about page of your application. You can add more information about your app here.</p>
      </main>
      <Footer />
    </div>
  );
};

export default About;