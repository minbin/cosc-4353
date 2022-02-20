import React, { useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Formik, Form, Field } from 'formik';

function validateUsername(value) {
  let error;
  if (!value) {
    error = 'Required';
  }
  return error;
}

function validatePassword(value) {
  let error;
  if (!value) {
    error = 'Required';
  }
  return error;
}

function Login() {
  const [create, setCreate] = useState(false);

  return (
    <Container className="d-flex align-items-center" style={{ height: '75vh' }}>
      <Row className="mx-auto">
      <Card className="" style={{ width: '25rem' }}>
          <Card.Body>
            {
              !create && <Card.Title className="mb-4">Sign in to Company</Card.Title>
            }
            {
              create && <Card.Title className="mb-4">Create your account</Card.Title>
            }
            { 
              !create && 
              <Formik 
                initialValues={{ 
                  username: '',
                  password: ''
                }}
                onSubmit={values => {
                  console.log(values);
                }}
              >
                {({ errors, touched, isValidating }) => (
                  <Form>
                    <Row className="mb-1">
                      <Col>
                        <Field name="username" validate={validateUsername} style={{ padding: '0.5em', width: '100%' }} placeholder="Username" />
                        {errors.username && touched.username && <div style={{ color: 'red' }}>{errors.username}</div>}
                        {(!errors.username || !touched.username) && <div>&nbsp;</div>}
                      </Col>
                    </Row>
                    <Row className="mb-1">
                      <Col>
                        <Field name="password" validate={validatePassword} style={{ padding: '0.5em', width: '100%' }} placeholder="Password" />
                        {errors.password && touched.password && <div style={{ color: 'red' }}>{errors.password}</div>}
                        {(!errors.password || !touched.password) && <div>&nbsp;</div>}
                      </Col>
                    </Row>
                    <Row>
                      <Col className="text-left">
                        <Button variant="link" onClick={()=>{ setCreate(true); }}>
                          Create account
                        </Button>
                      </Col>
                      <Col className="text-right">
                        <Button variant="primary" type="submit">
                          Login
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                )}
              </Formik>
            }
            { 
              create && 
              <Formik 
                initialValues={{ 
                  username: '',
                  password: ''
                }}
                onSubmit={values => {
                  console.log(values);
                }}
              >
                {({ errors, touched, isValidating }) => (
                  <Form>
                    <Row className="mb-1">
                      <Col>
                        <Field name="username" validate={validateUsername} style={{ padding: '0.5em', width: '100%' }} placeholder="Username" />
                        {errors.username && touched.username && <div style={{ color: 'red' }}>{errors.username}</div>}
                        {(!errors.username || !touched.username) && <div>&nbsp;</div>}
                      </Col>
                    </Row>
                    <Row className="mb-1">
                      <Col>
                        <Field name="password" validate={validatePassword} style={{ padding: '0.5em', width: '100%' }} placeholder="Password" />
                        {errors.password && touched.password && <div style={{ color: 'red' }}>{errors.password}</div>}
                        {(!errors.password || !touched.password) && <div>&nbsp;</div>}
                      </Col>
                    </Row>
                    <Row>
                      <Col className="text-left">
                        <Button variant="link" onClick={()=>{ setCreate(false); }}>
                          Sign in instead
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
            }
          </Card.Body>
        </Card>
      </Row>
    </Container>
  );
}

export default Login;
