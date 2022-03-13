import React from 'react'
import { act } from "react-dom/test-utils"
import { render, waitFor, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Profile from '../components/Profile.js'

describe("Profile component", () => {
  afterEach(jest.resetAllMocks);

  it('Full Name - string input', async () => {
    const { container, getByLabelText, debug } = render(<Profile />);
    await act( async () => {
      userEvent.type(getByLabelText(/full name/i), 'John Doe');
    });
  })

  it('Full Name - empty input', async () => {
    const { container, getByLabelText, getByTestId, debug } = render(<Profile />);
    const input = getByLabelText(/full name/i);
    await act( async () => {
      fireEvent.blur(input);
    });
    await waitFor(() => {
      expect(getByTestId("nameError")).not.toBe(null);
    });
  })

  it('Full Name - exceed string input', async () => {
    const { container, getByLabelText, getByTestId, debug } = render(<Profile />);
    const input = getByLabelText(/full name/i);
    await act( async () => {
      fireEvent.change(input, {target: {value:"abcdefghijklmnopqrstuvwxyqabcdefghijklmnopqrstuvwxyqabcdefghijklmnopqrstuvwxyqabcdefghijklmnopqrstuvwxyq"}});
    });
    await waitFor(() => {
      expect(getByTestId("nameError")).not.toBe(null);
    });
  })

  it('Address 1 - string input', async () => {
    const { container, getByLabelText, debug } = render(<Profile />);
    await act( async () => {
      userEvent.type(getByLabelText(/primary/i), '123 Main St');
    });
  })

  it('Address 1 - empty input', async () => {
    const { container, getByLabelText, getByTestId, debug } = render(<Profile />);
    const input = getByLabelText(/primary/i);
    await act( async () => {
      fireEvent.blur(input);
    });
    await waitFor(() => {
      expect(getByTestId("address1Error")).not.toBe(null);
    });
  })

  it('Address 1 - exceed string input', async () => {
    const { container, getByLabelText, getByTestId, debug } = render(<Profile />);
    const input = getByLabelText(/primary/i);
    await act( async () => {
      fireEvent.change(input, {target: {value:"abcdefghijklmnopqrstuvwxyqabcdefghijklmnopqrstuvwxyqabcdefghijklmnopqrstuvwxyqabcdefghijklmnopqrstuvwxyq"}});
    });
    await waitFor(() => {
      expect(getByTestId("address1Error")).not.toBe(null);
    });
  })

  it('Address 2 - string input', async () => {
    const { container, getByLabelText, debug } = render(<Profile />);
    await act( async () => {
      userEvent.type(getByLabelText(/secondary/i), '456 Small St');
    });
  })

  it('Address 2 - empty input', async () => {
    const { container, getByLabelText, getByTestId, debug } = render(<Profile />);
    const input = getByLabelText(/secondary/i);
    await act( async () => {
      fireEvent.blur(input);
    });
  })

  it('Address 2 - exceed string input', async () => {
    const { container, getByLabelText, getByTestId, debug } = render(<Profile />);
    const input = getByLabelText(/secondary/i);
    await act( async () => {
      fireEvent.change(input, {target: {value:"abcdefghijklmnopqrstuvwxyqabcdefghijklmnopqrstuvwxyqabcdefghijklmnopqrstuvwxyqabcdefghijklmnopqrstuvwxyq"}});
    });
    await waitFor(() => {
      expect(getByTestId("address2Error")).not.toBe(null);
    });
  })

  it('City - string input', async () => {
    const { container, getByLabelText, debug } = render(<Profile />);
    await act( async () => {
      userEvent.type(getByLabelText(/city/i), 'Anytown');
    });
  })

  it('City - empty input', async () => {
    const { container, getByLabelText, getByTestId, debug } = render(<Profile />);
    const input = getByLabelText(/city/i);
    await act( async () => {
      fireEvent.blur(input);
    });
    await waitFor(() => {
      expect(getByTestId("cityError")).not.toBe(null);
    });
  })

  it('City - exceed string input', async () => {
    const { container, getByLabelText, getByTestId, debug } = render(<Profile />);
    const input = getByLabelText(/city/i);
    await act( async () => {
      fireEvent.change(input, {target: {value:"abcdefghijklmnopqrstuvwxyqabcdefghijklmnopqrstuvwxyqabcdefghijklmnopqrstuvwxyqabcdefghijklmnopqrstuvwxyq"}});
    });
    await waitFor(() => {
      expect(getByTestId("cityError")).not.toBe(null);
    });
  })

  it('Zipcode - string input', async () => {
    const { container, getByLabelText, debug } = render(<Profile />);
    const input = getByLabelText(/zipcode/i)
    await act( async () => {
      fireEvent.change(input, {target: {value:"77077"}});
    });
  })

  it('Zipcode - too short', async () => {
    const { container, getByLabelText, getByTestId, debug } = render(<Profile />);
    const input = getByLabelText(/zipcode/i);
    await act( async () => {
      fireEvent.change(input, {target: {value:"770"}});
    });
    await waitFor(() => {
      expect(getByTestId("zipcodeError")).not.toBe(null);
    });
  })

  it('Zipcode - too long', async () => {
    const { container, getByLabelText, getByTestId, debug } = render(<Profile />);
    const input = getByLabelText(/zipcode/i);
    await act( async () => {
      fireEvent.change(input, {target: {value:"77007780098"}});
    });
    await waitFor(() => {
      expect(getByTestId("zipcodeError")).not.toBe(null);
    });
  })

  it('Submit', async () => {
    const handleSubmit = jest.fn();
    const { container, getByText, getByLabelText, debug } = render(<Profile onSubmit={handleSubmit}/>);

    await act( async () => {
      fireEvent.change(getByLabelText(/full/i), {target: {value:"John Doe"}});
      fireEvent.change(getByLabelText(/primary/i), {target: {value:"123 Main St"}});
      fireEvent.change(getByLabelText(/secondary/i), {target: {value:"456 Small St"}});
      fireEvent.change(getByLabelText(/city/i), {target: {value:"Anytown"}});
      fireEvent.change(getByLabelText(/state/i), {target: {value:"TX"}});
      fireEvent.change(getByLabelText(/zipcode/i), {target: {value:"77077"}});
    });

    await act( async () => {
      userEvent.click(getByText(/submit/i));
    });

    expect(handleSubmit);
  })
})
