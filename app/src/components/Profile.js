import React, { useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Formik, Form, Field } from 'formik';

import Cookies from 'universal-cookie';

function validateName(value) {
  let error;
  if (!value) {
    error = 'Required';
  } else if (value.length > 50) {
    error = 'Maximum length (50) exceeded';
  }
  return error;
}

function validateAddress1(value) {
  let error;
  if (!value) {
    error = 'Required';
  } else if (value.length > 100) {
    error = 'Maximum length (100) exceeded';
  }
  return error;
}

function validateAddress2(value) {
  let error;
  if (!value) {
  } else if (value.length > 100) {
    error = 'Maximum length (100) exceeded';
  }
  return error;
}

function validateCity(value) {
  let error;
  if (!value) {
    error = 'Required';
  } else if (value.length > 100) {
    error = 'Maximum length (100) exceeded';
  }
  return error;
}

function validateState(value) {
  let error;
  if (!value) {
    error = 'Required';
  }
  return error;
}

function validateZipcode(value) {
  let error;
  if (!value) {
    error = 'Required';
  }  else if (value.length < 5) {
    error = 'Minimum length (5) required'
  } else if (value.length > 9) {
    error = 'Maximum length (9) required'
  }
  return error;
}

function handleSubmit(e, cookies, setProfile) {
  let prof = {}
  prof['address1'] = e.address1;
  prof['address2'] = e.address2;
  prof['city'] = e.city;
  prof['name'] = e.name;
  prof['state'] = e.state;
  prof['zipcode'] = e.zipcode;
  prof['init'] = true;
  setProfile(prof);
  cookies.remove('profile');
  cookies.set('profile', prof);
}


function Profile({ onSubmit = handleSubmit }) {
  const cookies = new Cookies();
  /* dummy input */
  let params = cookies.get('profile');
  if (!params) {
    params = {}
    params['init'] = false;
  }
  if (!params['init']) {
    params['address1'] = '123 Main St';
    params['address2'] = '456 Small St';
    params['city'] = 'Houston';
    params['name'] = 'John Doe';
    params['state'] ='TX';
    params['zipcode'] = '77077';
    params['init'] = true;
  }
  const [profile, setProfile] = useState(params);

  const states = [
    { value: "AL", label: "Alabama" },
    { value: "AK", label: "Alaska" },
    { value: "AZ", label: "Arizona" },
    { value: "AR", label: "Arkansas" },
    { value: "CA", label: "California" },
    { value: "CO", label: "Colorado" },
    { value: "CT", label: "Connecticut" },
    { value: "DE", label: "Delaware" },
    { value: "DC", label: "District of Columbia" },
    { value: "FL", label: "Florida" },
    { value: "GA", label: "Georgia" },
    { value: "HI", label: "Hawaii" },
    { value: "ID", label: "Idaho" },
    { value: "IL", label: "Illinois" },
    { value: "IN", label: "Indiana" },
    { value: "IA", label: "Iowa" },
    { value: "KS", label: "Kansas" },
    { value: "KY", label: "Kentucky" },
    { value: "LA", label: "Louisiana" },
    { value: "ME", label: "Maine" },
    { value: "MD", label: "Maryland" },
    { value: "MA", label: "Massachusetts" },
    { value: "MI", label: "Michigan" },
    { value: "MN", label: "Minnesota" },
    { value: "MS", label: "Mississippi" },
    { value: "MO", label: "Missouri" },
    { value: "MT", label: "Montana" },
    { value: "NE", label: "Nebraska" },
    { value: "NV", label: "Nevada" },
    { value: "NH", label: "New Hampshire" },
    { value: "NJ", label: "New Jersey" },
    { value: "NM", label: "New Mexico" },
    { value: "NY", label: "New York" },
    { value: "NC", label: "North Carolian" },
    { value: "ND", label: "North Dakota" },
    { value: "OH", label: "Ohio" },
    { value: "OK", label: "Oklahoma" },
    { value: "OR", label: "Oregon" },
    { value: "PA", label: "Pennsylvania" },
    { value: "RI", label: "Rhode Island" },
    { value: "SC", label: "South Carolian" },
    { value: "SD", label: "South Dakota" },
    { value: "TN", label: "Tennessee" },
    { value: "TX", label: "Texas" },
    { value: "UT", label: "Utah" },
    { value: "VT", label: "Vermont" },
    { value: "VA", label: "Virginia" },
    { value: "WA", label: "Washington" },
    { value: "WI", label: "Wisconsin" },
    { value: "WY", label: "Wyoming" }
  ]

  return (
    <Container>
      <Row className="d-flex align-items-center justify-content-center m-4">
        <Card className="" style={{ width: '40rem' }}>
          <Card.Body>
            <Card.Title className="mb-4">Client Profile Management</Card.Title>
            <Formik
              initialValues={ profile }
              onSubmit={(e) => handleSubmit(e, cookies, setProfile)}
            >
              {({ errors, touched, isValidating }) => (
                <Form>
                  <Row className="mb-2">
                    <Col>
                      <label style={{ width: '100%' }} htmlFor="name" className="d-flex justify-content-between">
                        <span>Full Name</span>
                        <div data-testid="nameError" name="name" style={{ color: 'red' }}>{errors.name}</div>
                      </label>
                      <Field id="name" name="name" validate={validateName} style={{ padding: '0.5em', width: '100%' }} placeholder={ profile['name'] }/>
                    </Col>
                  </Row>
                  <Row className="mb-2">
                    <Col>
                      <label style={{ width: '100%' }} htmlFor="address1" className="d-flex justify-content-between">
                        <span>Primary Address</span>
                        <div data-testid="address1Error" name="address1" style={{ color: 'red' }}>{errors.address1}</div>
                      </label>
                      <Field id="address1" name="address1" validate={validateAddress1} style={{ padding: '0.5em', width: '100%' }} placeholder={ profile['address1'] }/>
                    </Col>
                  </Row>
                  <Row className="mb-2">
                    <Col>
                      <label style={{ width: '100%' }} htmlFor="address2" className="d-flex justify-content-between">
                        <span>Secondary Address (Optional)</span>
                        <div data-testid="address2Error" name="address2" style={{ color: 'red' }}>{errors.address2}</div>
                      </label>
                      <Field id="address2" name="address2" validate={validateAddress2} style={{ padding: '0.5em', width: '100%' }} placeholder={ profile['address2'] }/>
                    </Col>
                  </Row>
                  <Row className="mb-2">
                    <Col>
                      <label style={{ width: '100%' }} htmlFor="city" className="d-flex justify-content-between">
                        <span>City</span>
                        <div data-testid="cityError" name="city" style={{ color: 'red' }}>{errors.city}</div>
                      </label>
                      <Field id="city" name="city" validate={validateCity} style={{ padding: '0.5em', width: '100%' }} placeholder={ profile['city'] }/>
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
                        {states.map((s) => <option value={s.value} key={s.value}>{s.label}</option>)}
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
