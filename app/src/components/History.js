import React from 'react';
import { Container, Table } from 'react-bootstrap';

function History() {
  return (
    <Container>
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
          <tr>
            <td>1</td>
            <td>n/a</td>
            <td>n/a</td>
            <td>n/a</td>
            <td>n/a</td>
            <td>n/a</td>
          </tr>
          <tr>
            <td>2</td>
            <td>n/a</td>
            <td>n/a</td>
            <td>n/a</td>
            <td>n/a</td>
            <td>n/a</td>
          </tr>
          <tr>
            <td>3</td>
            <td>n/a</td>
            <td>n/a</td>
            <td>n/a</td>
            <td>n/a</td>
            <td>n/a</td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
}

export default History;
