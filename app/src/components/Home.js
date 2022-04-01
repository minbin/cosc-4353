import React from 'react';
import { Container } from 'react-bootstrap';

function Home() {
  return (
    <Container style={{ height: '70vh' }}>
      <h1 className="mb-3">COSC-4353</h1>
      <p className="mb-3">This is a class project for COSC-4353. It is written in ReactJS and uses Firebase Firestore.</p>
    </Container>
  );
}

export default Home;
