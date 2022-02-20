import React, { useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Formik, Form, Field } from 'formik';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
 
function validateGallonsRequested(value) {
  let error;
  if (!value) {
    error = 'Required';
  } else if (isNaN(value)) {
    error = 'Please enter a numeric value.';
  }
  return error;
}

function Quote() {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <Container className="d-flex align-items-center" style={{ height: '75vh' }}>
      <Row className="mx-auto">
        <Card className="" style={{ width: '40rem' }}>
          <Card.Body>
            <Card.Title className="mb-4">Fuel Quote Form</Card.Title>
            <Formik 
              initialValues={{ 
                gallons: '',
                address: '', 
                date: '',
                price: ''
              }}
              onSubmit={values => {
                console.log(values);
              }}
            >
              {({ errors, touched, isValidating }) => (
                <Form>
                  <Row className="mb-1">
                    <Col xs md="4" className="text-right" style={{ paddingTop: '0.5em' }}>
                      Gallons Requested
                    </Col>
                    <Col>
                      <Field name="gallons" validate={validateGallonsRequested} style={{ padding: '0.5em', width: '100%' }} placeholder="Gallons Requested" />
                      {errors.gallons && touched.gallons && <div style={{ color: 'red' }}>{errors.gallons}</div>}
                      {(!errors.gallons || !touched.gallons) && <div>&nbsp;</div>}
                    </Col>
                  </Row>
                  <Row className="mb-1">
                    <Col xs md="4" className="text-right" style={{ paddingTop: '0.5em' }}>
                      Delivery Address
                    </Col>
                    <Col>
                      <Field name="address" style={{ padding: '0.5em', width: '100%' }} placeholder="Imported from profile" disabled />
                      <div>&nbsp;</div>
                    </Col>
                  </Row>
                  <Row className="mb-1">
                    <Col xs md="4" className="text-right" style={{ paddingTop: '0.5em' }}>
                      Delivery Date
                    </Col>
                    <Col>
                      <>
                      <style>
                        {`.react-datepicker-wrapper input {
                          width: 100%;
                          padding: 0.5em
                      }`}
                      </style>
                        <DatePicker 
                          selected={startDate} 
                          onChange={(date) => setStartDate(date)}
                          wrapperClassName='date_picker full-width'
                        />
                      </>
                    </Col>
                  </Row>
                  <hr></hr>
                  <Row>
                    <Col>Suggested Price / Gallon</Col>
                    <Col className="text-right">$X.XX</Col>
                  </Row>
                  <Row>
                    <Col>Subtotal</Col>
                    <Col className="text-right">$X,XXXX.XX</Col>
                  </Row>
                  <Row>
                    <Col>Shipping</Col>
                    <Col className="text-right">$XXX.XX</Col>
                  </Row>
                  <Row>
                    <Col>Estimated tax</Col>
                    <Col className="text-right">$XXX.XX</Col>
                  </Row>
                  <Row className="mb-3 font-weight-bold">
                    <Col>Total</Col>
                    <Col className="text-right">$X,XXXX.XX</Col>
                  </Row>
                  <div className="d-grid gap-2">
                    <Button variant="primary" type="submit">
                      Check out
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

export default Quote;
