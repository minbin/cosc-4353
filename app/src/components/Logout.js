import React from 'react';
import { Container, Row, Card } from 'react-bootstrap';

import Cookies from 'universal-cookie';

function Logout(props) {
  const auth = props.useAuth();
  const cookies = new Cookies();

  cookies.remove('profile');

  auth.signout(() => {});
  return (
    <Container className="d-flex align-items-center" style={{ height: '70vh' }}>
      <Row className="mx-auto">
        <Card style={{ width: '25rem' }}>
          <Card.Body>
            <Card.Title className="mx-4 my-4">Successfully logged out.</Card.Title>
          </Card.Body>
        </Card>
      </Row>
    </Container>
  );
}

export default Logout;
