import React from 'react';
import { Container } from 'react-bootstrap';

import Cookies from 'universal-cookie';
import Navigation from './Navigation';

function Home() {
  const cookies = new Cookies();

  return (
    <Container>
      <Navigation auth={ cookies.get('auth') } style={{ width: '100%' }}/>
      <Container style={{ height: '70vh' }}>
        <h1 className="mb-3">Lorem ipsum</h1>
      </Container>
    </Container>
  );
}

export default Home;
