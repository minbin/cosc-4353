import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Formik, Form, Field } from 'formik';

import { firestore } from '../firebase';
import { collection, query, where, getDocs, addDoc, doc, setDoc } from 'firebase/firestore';
import bcrypt from 'bcryptjs';

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

const handleSubmit = async (e, login, setMessage) => {
  const pw = bcrypt.hashSync(e.password, 8);
  e.password = pw
  const isCreate = await createUser(e);
  if (isCreate) {
    login(e);
  } else {
    setMessage("Could not create account.")
  }
}

const getUser = async (e) => {
  const db = firestore;
  const userRef = collection(db, 'UserCredentials');
  const q = query(userRef, where('username', '==', e.username));
  const qs = await getDocs(q);
  return !qs.empty;
}

const createUser = async (e) => {
  const db = firestore;
  const user = await getUser(e);
  if (user) return false;

  const userRef = collection(db, 'UserCredentials');
  const resUser = await addDoc(userRef, {
    username: e.username,
    password: e.password
  })

  await setDoc(doc(db, 'ClientInformation', e.username), {
    'name': 'John Doe',
    'address1': '123 Main St',
    'address2': '456 Side St',
    'city': 'Anytown',
    'state': 'TX',
    'zipcode': '77777'
  });

  await setDoc(doc(db, 'FuelQuote', e.username), {
    'history': []
  });

  return resUser.id;
}

function Signup(props) {
  const [message, setMessage] = useState('Create an account.')

  const auth = props.useAuth();
  const navigate = useNavigate();
  const login = (e) => {
    auth.signin(e, (e) => {
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
              <Card.Title className="mb-4">Account Creation</Card.Title>
              <Formik
                initialValues={{ username: '', password: '' }}
                onSubmit={(e) => handleSubmit(e, login, setMessage)}
              >
                {({ errors, touched, isValidating }) => (
                <Form>
                  <Row className="mb-2">
                    <Col>
                      <label style={{ width: '100%' }} htmlFor="username" className="d-flex justify-content-between">
                        <span>Username</span>
                        <div data-testid="usernameError" name="username" style={{ color: 'red' }}>{errors.username}</div>
                      </label>
                      <Field id="username" name="username" validate={validateUsername} style={{ padding: '0.5em', width: '100%' }} placeholder="Username" />
                    </Col>
                  </Row>
                  <Row className="mb-4">
                    <Col>
                      <label style={{ width: '100%' }} htmlFor="password" className="d-flex justify-content-between">
                        <span>Password</span>
                        <div data-testid="passwordError" name="password" style={{ color: 'red' }}>{errors.password}</div>
                      </label>
                      <Field id="password" name="password" validate={validatePassword} style={{ padding: '0.5em', width: '100%' }} placeholder="Password" type="password"/>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="text-left">
                      <Button variant="link" href="#/login">
                        Log in Instead
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

export default Signup;
