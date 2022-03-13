import React, { useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Formik, Form, Field } from 'formik';
import DatePicker from 'react-datepicker';

import Cookies from 'universal-cookie';
import Navigation from './Navigation';
import { pricingModule } from './PricingModule.js';

import 'react-datepicker/dist/react-datepicker.css';

function validateGallonsRequested(value, setOrder) {
  let error;
  value = value.trim();
  if (!value) {
    error = 'Required';
  } else if (isNaN(value)) {
    error = 'Please enter a numeric value.';
  } else {
    setOrder(pricingModule({ 'gallons': value }));
  }
  return error;
}

function handleSubmit(e, startDate, cookies, setOrder) {
  let ret = pricingModule(e);
  setOrder(ret);
  let history = cookies.get('history');
  if (!history) {
    history = []
  }
  history.push([e.gallons, cookies.get('address1'), startDate, ret.suggested, ret.total])
  cookies.set('history', history);
}

function Quote({ onSubmit = handleSubmit }) {
  const cookies = new Cookies();
  const [startDate, setStartDate] = useState(new Date());
  const [order, setOrder] = useState({ 'suggested': 'X.XX', 'subtotal': 'X,XXXX.XX', 'shipping': 'XXX.XX', 'tax': 'XXX.XX', 'total': 'X,XXXX.XX'})

  return (
    <Container>
      <Navigation auth={ cookies.get('auth') } style={{ width: '100%' }}/>
      <Row className="d-flex align-items-center justify-content-center">
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
              onSubmit={(e) => handleSubmit(e, startDate, cookies, setOrder)}
            >
              {({ errors, touched, isValidating }) => (
                <Form>
                  <Row className="mb-1">
                    <Col xs md="4" className="text-right" style={{ paddingTop: '0.5em' }}>
                      <label htmlFor="gallons">Gallons Requested</label>
                    </Col>
                    <Col>
                      <Field id="gallons" name="gallons" validate={(e) => validateGallonsRequested(e, setOrder)} style={{ padding: '0.5em', width: '100%' }} placeholder="Gallons Requested" />
                      <div data-testid="gallonsError" name="gallons" style={{ color: 'red' }}>
                        &nbsp;
                        {errors.gallons}
                      </div>
                    </Col>
                  </Row>
                  <Row className="mb-1">
                    <Col xs md="4" className="text-right" style={{ paddingTop: '0.5em' }}>
                      <label htmlFor="address">Delivery Address</label>
                    </Col>
                    <Col>
                      <Field id="address" name="address" style={{ padding: '0.5em', width: '100%' }} placeholder={cookies.get('address1')} disabled />
                      <div>&nbsp;</div>
                    </Col>
                  </Row>
                  <Row className="mb-1">
                    <Col xs md="4" className="text-right" style={{ paddingTop: '0.5em' }}>
                      <label htmlFor="deliveryDate">Delivery Date</label>
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
                          id="deliveryDate" name="deliveryDate"
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
                    <Col className="text-right">${ order.suggested }</Col>
                  </Row>
                  <Row>
                    <Col>Subtotal</Col>
                    <Col className="text-right">${ order.subtotal }</Col>
                  </Row>
                  <Row>
                    <Col>Shipping</Col>
                    <Col className="text-right">${ order.shipping }</Col>
                  </Row>
                  <Row>
                    <Col>Estimated tax</Col>
                    <Col className="text-right">${ order.tax }</Col>
                  </Row>
                  <Row className="mb-3 font-weight-bold">
                    <Col>Total</Col>
                    <Col className="text-right">${ order.total }</Col>
                  </Row>
                  <div className="d-grid gap-2">
                    <Button variant="primary" type="submit">
                      Check Out
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
