import React from 'react';
import { act } from "react-dom/test-utils";
import { render, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Quote from '../components/Quote.js';
import Cookies from 'universal-cookie';

import { updateDoc, arrayUnion, getDoc } from 'firebase/firestore';
jest.mock('../firebase');
jest.mock('firebase/firestore');

describe("Quote component", () => {
  afterEach(jest.resetAllMocks);

  Cookies.get = jest.fn().mockImplementation(() => {address:'test'});
  it('Gallons Requested - float input', async () => {
    getDoc.mockResolvedValue({data: function () {return {address1: 'test'}}});
    const { container, getByLabelText, debug } = render(<Quote test={true}/>);
    await act( async () => {
      userEvent.type(getByLabelText(/gallons requested/i), "13.37");
    });
  })

  it('Gallons requested - empty input', async () => {
    getDoc.mockResolvedValue({data: function () {return {address1: 'test'}}});
    const { container, getByLabelText, getByTestId, debug } = render(<Quote test={true}/>);
    const input = getByLabelText(/Gallons Requested/i);
    await act( async () => {
      fireEvent.blur(input);
    });
    await waitFor(() => {
      expect(getByTestId("gallonsError")).not.toBe(null);
      expect(getByTestId("gallonsError")).toHaveTextContent("Required");
    });
  })

  it('Submit', async () => {
    getDoc.mockResolvedValue({data: function () {return {address1: 'test'}}});
    updateDoc.mockResolvedValueOnce({data: function () {return true}});
    const handleSubmit = jest.fn();
    const { container, getByText, getByLabelText, debug } = render(<Quote onSubmit={handleSubmit} test={true}/>);

    await act( async () => {
      fireEvent.change(getByLabelText(/gallons requested/i), {target: {value:13.37}});
    });

    await act( async () => {
      userEvent.click(getByText(/submit/i));
    });

    expect(handleSubmit);
  })


  it('Test datepicker', async () => {
    getDoc.mockResolvedValue({data: function () {return {address1: 'test'}}});
    const handleSubmit = jest.fn();
    const { container, getByText, getByLabelText, getById, debug } = render(<Quote onSubmit={handleSubmit} test={true}/>);

    const date = getByLabelText(/Delivery Date/i);

    await act( async () => {
      fireEvent.mouseDown(date);
      fireEvent.change(date, { target: { value: "10-25-2020" } });
    });
  })
});
