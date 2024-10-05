import React from 'react';

function About() {
  return (
    <div className="About">
      <h2 className="text-2xl font-bold mb-4">About This Boilerplate</h2>
      <p className="mb-2">
        This is a fullstack application boilerplate using React, Redux, Django, and GraphQL.
      </p>
      <p className="mb-2">
        It includes features such as:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>Google Authentication</li>
        <li>Interactive maps with Mapbox</li>
        <li>Real-time updates with Socket.io</li>
        <li>GraphQL API with Django and Graphene</li>
      </ul>
      <p>
        Feel free to modify and extend this boilerplate to suit your project needs!
      </p>
    </div>
  );
}

export default About;