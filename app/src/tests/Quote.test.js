import React from 'react'
import { act } from "react-dom/test-utils"
import { render, waitFor, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Quote from '../components/Quote.js'

describe("Quote component", () => {
  afterEach(jest.resetAllMocks);

  it('Gallons Requested - float input', async () => {
    const { container, getByLabelText, debug } = render(<Quote />);
    await act( async () => {
      userEvent.type(getByLabelText(/gallons requested/i), "13.37");
    });
  })

  it('Gallons requested - empty input', async () => {
    const { container, getByLabelText, getByTestId, debug } = render(<Quote />);
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
    const handleSubmit = jest.fn();
    const { container, getByText, getByLabelText, debug } = render(<Quote onSubmit={handleSubmit}/>);

    await act( async () => {
      fireEvent.change(getByLabelText(/gallons requested/i), {target: {value:13.37}});
    });

    await act( async () => {
      userEvent.click(getByText(/check out/i));
    });

    expect(handleSubmit);
  })


  it('Test datepicker', async () => {
    const handleSubmit = jest.fn();
    const { container, getByText, getByLabelText, getById, debug } = render(<Quote onSubmit={handleSubmit}/>);

    const date = getByLabelText(/Delivery Date/i);

    await act( async () => {
      fireEvent.mouseDown(date);
      fireEvent.change(date, { target: { value: "10-25-2020" } });
    });
  })
});
