import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Formik, Form, Field } from 'formik';

function validateUsername(value) {
  let error;
  value = value.trim();
  if (!value) {
    error = 'Required';
  }
  return error;
}

function validatePassword(value) {
  let error;
  value = value.trim();
  if (!value) {
    error = 'Required';
  }
  return error;
}

function handleSubmit(e, login, setMessage) {
  if (e.username === "admin" && e.password === "admin") {
    login();
  } else {
    setMessage("Incorrect credentials, please try again.")
  }
}

function Login(props) {
  const [message, setMessage] = useState('Welcome, please use admin/admin to continue.')

  const auth = props.useAuth();
  const navigate = useNavigate();
  const login = (e) => {
    auth.signin(() => {
      navigate("/profile", { replace: true });
    });
  };

  if (auth.user) {
    return <Navigate to="/home" />
  }

  return (
    <Container style={{ height: '70vh' }}>
      <Row style={{ height: '100%' }}>
        <Col className="d-flex align-items-center justify-content-center">
          <Card className="p-2" style={{ width: '25rem' }}>
            <Card.Body>
              <Card.Title className="mb-4">Company Login</Card.Title>
              <Formik
                initialValues={{ username: '', password: '' }}
                onSubmit={(e) => handleSubmit(e, login, setMessage)}
              >
                {({ errors, touched, isValidating }) => (
                <Form>
                  <Row className="mb-2">
                    <Col>
                      <label style={{ width: '100%' }} htmlFor="username">
                        <span>Username</span>
                        {errors.username && touched.username && <span className="float-right" style={{ color: 'red' }}>{errors.username}</span>}
                      </label>
                      <Field id="username" name="username" validate={validateUsername} style={{ padding: '0.5em', width: '100%' }} placeholder="Username" />
                    </Col>
                  </Row>
                  <Row className="mb-4">
                    <Col>
                      <label style={{ width: '100%' }} htmlFor="password">
                        <span>Password</span>
                        {errors.username && touched.username && <span className="float-right" style={{ color: 'red' }}>{errors.password}</span>}
                      </label>
                      <Field id="password" name="password" validate={validatePassword} style={{ padding: '0.5em', width: '100%' }} placeholder="Password" />
                    </Col>
                  </Row>
                  <Row>
                    <Col className="text-left">
                      <Button variant="link">
                        <a href="#/signup">Create account</a>
                      </Button>
                    </Col>
                    <Col className="text-right">
                      <Button variant="primary" type="submit">
                        Submit
                      </Button>
                    </Col>
                  </Row>
                </Form>
                )}
              </Formik>
            </Card.Body>
          </Card>
        </Col>
        <Col className="d-flex align-items-center justify-content-center">
          <h2 className="m-4">
            {message}
          </h2>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
