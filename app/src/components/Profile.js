import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Formik, Form, Field } from 'formik';

import Cookies from 'universal-cookie';
import Navigation from './Navigation';

function validateName(value) {
  let error;
  value = value.trim();
  if (!value) {
    error = 'Required';
  } else if (value.length > 50) {
    error = 'Maximum length (50) exceeded';
  }
  return error;
}

function validateAddress1(value) {
  let error;
  value = value.trim();
  if (!value) {
    error = 'Required';
  } else if (value.length > 100) {
    error = 'Maximum length (100) exceeded';
  }
  return error;
}

function validateAddress2(value) {
  let error;
  value = value.trim();
  if (value.length > 100) {
    error = 'Maximum length (100) exceeded';
  }
  return error;
}

function validateCity(value) {
  let error;
  value = value.trim();
  if (!value) {
    error = 'Required';
  } else if (value.length > 100) {
    error = 'Maximum length (100) exceeded';
  }
  return error;
}

function validateState(value) {
  let error;
  value = value.trim();
  if (!value) {
    error = 'Required';
  }
  return error;
}

function validateZipcode(value) {
  let error;
  value = value.trim();
  if (!value) {
    error = 'Required';
  }  else if (value.length < 5) {
    error = 'Minimum length (5) required'
  } else if (value.length > 9) {
    error = 'Maximum length (9) required'
  }
  return error;
}

function handleSubmit() {
}

function Profile({ onSubmit = handleSubmit }) {
  const cookies = new Cookies();

  return (
    <Container>
      <Navigation auth={ cookies.get('auth') } style={{ width: '100%' }}/>
      <Row className="d-flex align-items-center justify-content-center">
        <Card className="" style={{ width: '40rem' }}>
          <Card.Body>
            <Card.Title className="mb-4">Client Profile Management</Card.Title>
            <Formik
              initialValues={{
                name: '',
                address1: '',
                address2: '',
                city: '',
                state: '',
                zipcode: ''
              }}
              onSubmit={(e) => handleSubmit(e)}
            >
              {({ errors, touched, isValidating }) => (
                <Form>
                  <Row className="mb-2">
                    <Col>
                      <label style={{ width: '100%' }} htmlFor="name" className="d-flex justify-content-between">
                        <span>Full Name</span>
                        <div data-testid="nameError" name="name" style={{ color: 'red' }}>{errors.name}</div>
                      </label>
                      <Field id="name" name="name" validate={validateName} style={{ padding: '0.5em', width: '100%' }} placeholder="John Doe"/>
                    </Col>
                  </Row>
                  <Row className="mb-2">
                    <Col>
                      <label style={{ width: '100%' }} htmlFor="address1" className="d-flex justify-content-between">
                        <span>Primary Address</span>
                        <div data-testid="address1Error" name="address1" style={{ color: 'red' }}>{errors.address1}</div>
                      </label>
                      <Field id="address1" name="address1" validate={validateAddress1} style={{ padding: '0.5em', width: '100%' }} placeholder="123 Main St"/>
                    </Col>
                  </Row>
                  <Row className="mb-2">
                    <Col>
                      <label style={{ width: '100%' }} htmlFor="address2" className="d-flex justify-content-between">
                        <span>Secondary Address (Optional)</span>
                        <div data-testid="address2Error" name="address2" style={{ color: 'red' }}>{errors.address2}</div>
                      </label>
                      <Field id="address2" name="address2" validate={validateAddress2} style={{ padding: '0.5em', width: '100%' }} placeholder="456 Small St"/>
                    </Col>
                  </Row>
                  <Row className="mb-2">
                    <Col>
                      <label style={{ width: '100%' }} htmlFor="city" className="d-flex justify-content-between">
                        <span>City</span>
                        <div data-testid="cityError" name="city" style={{ color: 'red' }}>{errors.city}</div>
                      </label>
                      <Field id="city" name="city" validate={validateCity} style={{ padding: '0.5em', width: '100%' }} placeholder="Anytown"/>
                    </Col>
                    <Col>
                      <label style={{ width: '100%' }} htmlFor="state" className="d-flex justify-content-between">
                        <span>State</span>
                        <div data-testid="stateError" name="state" style={{ color: 'red' }}>{errors.state}</div>
                      </label>
                      <Field
                        as="select"
                        id="state"
                        name="state"
                        validate={validateState}
                        style={{ padding: '0.5em', width: '100%' }}
                      >
                        <option value="" label="Select a state" />
                        <option value="AL">Alabama</option>
                        <option value="AK">Alaska</option>
                        <option value="AZ">Arizona</option>
                        <option value="AR">Arkansas</option>
                        <option value="CA">California</option>
                        <option value="CO">Colorado</option>
                        <option value="CT">Connecticut</option>
                        <option value="DE">Delaware</option>
                        <option value="DC">District Of Columbia</option>
                        <option value="FL">Florida</option>
                        <option value="GA">Georgia</option>
                        <option value="HI">Hawaii</option>
                        <option value="ID">Idaho</option>
                        <option value="IL">Illinois</option>
                        <option value="IN">Indiana</option>
                        <option value="IA">Iowa</option>
                        <option value="KS">Kansas</option>
                        <option value="KY">Kentucky</option>
                        <option value="LA">Louisiana</option>
                        <option value="ME">Maine</option>
                        <option value="MD">Maryland</option>
                        <option value="MA">Massachusetts</option>
                        <option value="MI">Michigan</option>
                        <option value="MN">Minnesota</option>
                        <option value="MS">Mississippi</option>
                        <option value="MO">Missouri</option>
                        <option value="MT">Montana</option>
                        <option value="NE">Nebraska</option>
                        <option value="NV">Nevada</option>
                        <option value="NH">New Hampshire</option>
                        <option value="NJ">New Jersey</option>
                        <option value="NM">New Mexico</option>
                        <option value="NY">New York</option>
                        <option value="NC">North Carolina</option>
                        <option value="ND">North Dakota</option>
                        <option value="OH">Ohio</option>
                        <option value="OK">Oklahoma</option>
                        <option value="OR">Oregon</option>
                        <option value="PA">Pennsylvania</option>
                        <option value="RI">Rhode Island</option>
                        <option value="SC">South Carolina</option>
                        <option value="SD">South Dakota</option>
                        <option value="TN">Tennessee</option>
                        <option value="TX">Texas</option>
                        <option value="UT">Utah</option>
                        <option value="VT">Vermont</option>
                        <option value="VA">Virginia</option>
                        <option value="WA">Washington</option>
                        <option value="WV">West Virginia</option>
                        <option value="WI">Wisconsin</option>
                        <option value="WY">Wyoming</option>
                      </Field>
                    </Col>
                  </Row>
                  <Row className="mb-4">
                    <Col>
                      <label style={{ width: '100%' }} htmlFor="zipcode" className="d-flex justify-content-between">
                        <span>Zipcode</span>
                        <div data-testid="zipcodeError" name="zipcode" style={{ color: 'red' }}>{errors.zipcode}</div>
                      </label>
                      <Field id="zipcode" name="zipcode" validate={validateZipcode} style={{ padding: '0.5em', width: '100%' }} placeholder="770077"/>
                    </Col>
                  </Row>
                  <div className="d-grid gap-2">
                    <Button variant="primary" type="submit">
                      Submit
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </Card.Body>
        </Card>
      </Row>
    </Container>
  );
}

export default Profile;
