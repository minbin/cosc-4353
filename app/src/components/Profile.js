import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Formik, Form, Field } from 'formik';
 
function validateName(value) {
  let error;
  if (!value) {
    error = 'Required';
  } else if (value.length > 50) {
    error = 'Character length exceeded. Maximum 50 characters.';
  }
  return error;
}

function validateAddress1(value) {
  let error;
  if (!value) {
    error = 'Required';
  } else if (value.length > 100) {
    error = 'Character length exceeded. Maximum 100 characters.';
  }
  return error;
}

function validateAddress2(value) {
  let error;
  if (value.length > 100) {
    error = 'Character length exceeded. Maximum 100 characters.';
  }
  return error;
}

function validateCity(value) {
  let error;
  if (!value) {
    error = 'Required';
  } else if (value.length > 100) {
    error = 'Character length exceeded. Maximum 100 characters.';
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
    error = 'Character length not met. Minimum 5 characters.'
  } else if (value.length > 9) {
    error = 'Character length exceeded. Maximum 9 characters.'
  }
  return error;
}

function Profile() {
  return (
    <Container className="d-flex align-items-center" style={{ height: '75vh' }}>
      <Row className="mx-auto">
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
              onSubmit={values => {
                console.log(values);
              }}
            >
              {({ errors, touched, isValidating }) => (
                <Form>
                  <Row className="mb-1">
                    <Col>
                      <Field name="name" validate={validateName} style={{ padding: '0.5em', width: '100%' }} placeholder="Full name"/>
                      {errors.name && touched.name && <div style={{ color: 'red' }}>{errors.name}</div>}
                      {(!errors.name || !touched.name) && <div>&nbsp;</div>}
                    </Col>
                  </Row>
                  <Row className="mb-1">
                    <Col>
                      <Field name="address1" validate={validateAddress1} style={{ padding: '0.5em', width: '100%' }} placeholder="Primary address"/>
                      {errors.address1 && touched.address1 && <div style={{ color: 'red' }}>{errors.address1}</div>}
                      {(!errors.address1 || !touched.address1) && <div>&nbsp;</div>}
                    </Col>
                  </Row>
                  <Row className="mb-1">
                    <Col>
                      <Field name="address2" validate={validateAddress2} style={{ padding: '0.5em', width: '100%' }} placeholder="Secondary address (Optional)"/>
                      {errors.address2 && touched.address2 && <div style={{ color: 'red' }}>{errors.address2}</div>}
                      {(!errors.address2 || !touched.address2) && <div>&nbsp;</div>}
                    </Col>
                  </Row>
                  <Row className="mb-1">
                    <Col>
                      <Field name="city" validate={validateCity} style={{ padding: '0.5em', width: '100%' }} placeholder="City"/>
                      {errors.city && touched.city && <div style={{ color: 'red' }}>{errors.city}</div>}
                      {(!errors.city || !touched.city) && <div>&nbsp;</div>}
                    </Col>
                  </Row>
                  <Row className="mb-1">
                    <Col>
                      <Field 
                        as="select"
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
                      {errors.state && touched.state && <div style={{ color: 'red' }}>{errors.state}</div>}
                      {(!errors.state || !touched.state) && <div>&nbsp;</div>}
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col>
                      <Field name="zipcode" validate={validateZipcode} style={{ padding: '0.5em', width: '100%' }} placeholder="Zipcode"/>
                      {errors.zipcode && touched.zipcode && <div style={{ color: 'red' }}>{errors.zipcode}</div>}
                      {(!errors.zipcode || !touched.zipcode) && <div>&nbsp;</div>}
                    </Col>
                  </Row>
                  <div className="d-grid gap-2">
                    <Button variant="primary" type="submit">
                      Save
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
