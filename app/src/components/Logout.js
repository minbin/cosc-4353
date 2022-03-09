import React from 'react';
import { Container, Row, Card } from 'react-bootstrap';

import Cookies from 'universal-cookie';
import Navigation from './Navigation';

function Signup() {
  const cookies = new Cookies();
  cookies.remove('auth');

  return (
    <Container>
      <Navigation auth={ cookies.get('auth') } style={{ width: '100%' }}/>
      <Container key="body" className="d-flex align-items-center" style={{ height: '75vh' }}>
        <Row className="mx-auto">
          <Card style={{ width: '25rem' }}>
            <Card.Body>
              <Card.Title className="mx-4 my-4">Successfully logged out.</Card.Title>
            </Card.Body>
          </Card>
        </Row>
      </Container>
    </Container>
  );
}

export default Signup;
