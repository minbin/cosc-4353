import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Formik, Form, Field } from 'formik';
import DatePicker from 'react-datepicker';

import Cookies from 'universal-cookie';
import { pricingModule } from './PricingModule.js';

import 'react-datepicker/dist/react-datepicker.css';

import { firestore } from '../firebase';
import { doc, updateDoc, arrayUnion, getDoc } from 'firebase/firestore';

function validateGallonsRequested(value) {
  let error;
  if (!value) {
    error = 'Required';
  } else if (isNaN(value) || value <= 0) {
    error = 'Please enter positive value.';
  }
  return error;
}

function validateAddress(value) {
  let error;
  if (!value) {
    error = 'Required';
  }
  return error;
}

const handleSubmit = async (e, startDate, cookies, order, setOrder, inState, isQuote, setTitleMsg) => {
  const ret = await pricingModule(e, startDate, cookies, inState, isQuote, setTitleMsg);
  setOrder(ret);
}

function Quote({ onSubmit = handleSubmit, ...props }) {
  const cookies = new Cookies();
  const [startDate, setStartDate] = useState(new Date());
  const [isBusy, setBusy] = useState(true && !props.test);
  const [address, setAddress] = useState('Update address in Profile');
  const [inState, setInState] = useState(false);
  const [isQuote, setIsQuote] = useState(true);
  const [titleMsg, setTitleMsg] = useState('');
  const [order, setOrder] = useState({ 'suggested': 'X.XX', 'total': 'X,XXXX.XX'})
  const fetchData = async () => {
    const cookies = new Cookies();
    const db = firestore;
    const clientInformationRef = doc(db, 'ClientInformation', cookies.get('userid'));
    const snapshot = await getDoc(clientInformationRef).catch(e => {console.log(e)})
    const data = snapshot.data();
    await setAddress(data['address1']);
    await setInState(data['state'] === 'TX' ? true : false);
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
            <Card.Title className="mb-4">
              <div className="d-flex  flex-row justify-content-between">
                <div>Fuel Quote Form</div>
                <div>{titleMsg}</div>
              </div>
            </Card.Title>
            {!isBusy && <Formik
              initialValues={{
                gallons: '',
                address: address,
                date: '',
                price: ''
              }}
              onSubmit={(e, actions) => {
                handleSubmit(e, startDate, cookies, order, setOrder, inState, isQuote, setTitleMsg);
              }}
            >
              {({ errors, touched, isValidating }) => (
                <Form>
                  <Row className="mb-1">
                    <Col xs md="4" className="text-right" style={{ paddingTop: '0.5em' }}>
                      <label htmlFor="gallons">Gallons Requested</label>
                    </Col>
                    <Col>
                      <Field id="gallons" name="gallons" validate={(e) => validateGallonsRequested(e)} style={{ padding: '0.5em', width: '100%' }} />
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
                  <Row className="mb-3 font-weight-bold">
                    <Col>Total</Col>
                    <Col className="text-right">${ order.total }</Col>
                  </Row>
                  <div className="d-flex flex-row justify-content-between">
                    <Button className="px-4 py-2" onClick={() => setIsQuote(true)} variant="primary" type="submit"
                     disabled={!touched.gallons || errors.gallons}>
                      Get Quote
                    </Button>
                    <Button className="px-4 py-2" onClick={() => setIsQuote(false)} variant="primary" type="submit"
                     disabled={!touched.gallons || errors.gallons}>
                      Submit
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
