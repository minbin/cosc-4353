import React, { useEffect, useState } from 'react';
import { Container, Table } from 'react-bootstrap';

import Cookies from 'universal-cookie';

import { firestore } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

function History() {
  const [orders, setOrders] = useState([]);
  const fetchData = async () => {
    const cookies = new Cookies();
    const db = firestore;
    const fuelQuoteRef = doc(db, 'FuelQuote', cookies.get('userid'));
    const snapshot = await getDoc(fuelQuoteRef).catch(e => {console.log(e)})
    const data = snapshot.data();
    setOrders(data);
  };
  useEffect(() => {
    fetchData()
  }, []);
  return (
    <Container style={{ height: '70vh' }}>
      <h3>Fuel Quote History</h3>
      <Table bordered hover responsive style={{ marginTop: '2em' }}>
        <thead>
          <tr>
            <th>#</th>
            <th>Gallons Requested</th>
            <th>Delivery Address</th>
            <th>Delivery Date</th>
            <th>Price Per Gallon</th>
            <th>Total Amount</th>
          </tr>
        </thead>
        <tbody>
          {orders['history'] && orders['history'].map((order, index) =>
            <tr key={index}>
              <td>{index}</td>
              <td>{'gallons' in order && order['gallons']}</td>
              <td>{order['address']}</td>
              <td>{'startDate' in order && new Date(order['startDate']['seconds'] * 1000).toISOString().substr(0,19)}</td>
              <td>{'suggested' in order && order['suggested']}</td>
              <td>{'total' in order && order['total']}</td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
}

export default History;
