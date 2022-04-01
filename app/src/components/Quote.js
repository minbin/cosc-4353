import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Formik, Form, Field } from 'formik';
import DatePicker from 'react-datepicker';

import Cookies from 'universal-cookie';
import { pricingModule } from './PricingModule.js';

import 'react-datepicker/dist/react-datepicker.css';

import { firestore } from '../firebase';
import { doc, updateDoc, arrayUnion, getDoc } from 'firebase/firestore';

function validateGallonsRequested(value, setOrder) {
  let error;
  value = value.trim();
  if (!value) {
    error = 'Required';
  } else if (isNaN(value) || value <= 0) {
    error = 'Please enter positive value.';
  } else {
    setOrder(pricingModule({ 'gallons': value }));
  }
  return error;
}

function validateAddress(value) {
  let error;
  value = value.trim();
  if (!value) {
    error = 'Required';
  }
  return error;
}

const handleSubmit = async (e, startDate, cookies, setOrder) => {
  const ret = pricingModule(e);
  setOrder(ret);
  const db = firestore;
  const fuelQuoteRef = doc(db, 'FuelQuote', cookies.get('userid'));
  await updateDoc(fuelQuoteRef, {
    history: arrayUnion({
      'gallons': e.gallons,
      'address': e.address,
      'startDate': startDate,
      'suggested': ret.suggested,
      'total': ret.total
    })
  });
}

function Quote({ onSubmit = handleSubmit, ...props }) {
  const cookies = new Cookies();
  const [startDate, setStartDate] = useState(new Date());
  const [isBusy, setBusy] = useState(true && !props.test);
  const [address, setAddress] = useState('Update address in Profile');
  const [order, setOrder] = useState({ 'suggested': 'X.XX', 'subtotal': 'X,XXXX.XX', 'shipping': 'XXX.XX', 'tax': 'XXX.XX', 'total': 'X,XXXX.XX'})
  const fetchData = async () => {
    const cookies = new Cookies();
    const db = firestore;
    const clientInformationRef = doc(db, 'ClientInformation', cookies.get('userid'));
    const snapshot = await getDoc(clientInformationRef).catch(e => {console.log(e)})
    const data = snapshot.data()['address1'];
    await setAddress(data);
    await setBusy(false);
  };
  useEffect(() => {
    fetchData()
  }, []);

  return (
    <Container>
      <Row className="d-flex align-items-center justify-content-center">
        <Card className="" style={{ width: '40rem' }}>
          <Card.Body>
            <Card.Title className="mb-4">Fuel Quote Form</Card.Title>
            {!isBusy && <Formik
              initialValues={{
                gallons: '',
                address: address,
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
                      <Field id="gallons" name="gallons" validate={(e) => validateGallonsRequested(e, setOrder)} style={{ padding: '0.5em', width: '100%' }} />
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
                      <Field id="address" name="address" validate={(e) => validateAddress(e)} style={{ padding: '0.5em', width: '100%' }} placeholder={address} disabled />
                      <div data-testid="addressError" name="address" style={{ color: 'red' }}>
                        &nbsp;
                        {errors.address}
                      </div>
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
            </Formik>}
          </Card.Body>
        </Card>
      </Row>
    </Container>
  );
}

export default Quote;
