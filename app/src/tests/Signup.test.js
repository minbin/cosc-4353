import React from 'react';
import { HashRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import { render, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Signup from '../components/Signup.js';
import useAuth, { ProvideAuth } from '../components/Auth.js';

import { collection, query, addDoc, setDoc, getDocs } from 'firebase/firestore';
jest.mock('../firebase');
jest.mock('firebase/firestore');

describe("Signup component", () => {
  afterEach(jest.resetAllMocks);

  it('Username - string input', async () => {
    const { container, getByLabelText, debug } =
      render(<ProvideAuth><HashRouter><Signup useAuth={useAuth}/></HashRouter></ProvideAuth>);
    await act( async () => {
      fireEvent.change(getByLabelText(/username/i), {target: {value:'admin'}});
    });
  })

  it('Username - empty input', async () => {
    const { container, getByLabelText, getByTestId, debug } =
      render(<ProvideAuth><HashRouter><Signup useAuth={useAuth}/></HashRouter></ProvideAuth>);
    const input = getByLabelText(/Username/i);
    await act( async () => {
      fireEvent.blur(input);
    });
    await waitFor(() => {
      expect(getByTestId("usernameError")).not.toBe(null);
      expect(getByTestId("usernameError")).toHaveTextContent("Required");
    });
  })

  it('Password - string input', async () => {
    const { container, getByLabelText, debug } =
      render(<ProvideAuth><HashRouter><Signup useAuth={useAuth}/></HashRouter></ProvideAuth>);
    await act( async () => {
      fireEvent.change(getByLabelText(/Password/i), {target: {value:'admin'}});
    });
  })

  it('Password - empty input', async () => {
    const { container, getByLabelText, getByTestId, debug } =
      render(<ProvideAuth><HashRouter><Signup useAuth={useAuth}/></HashRouter></ProvideAuth>);
    const input = getByLabelText(/Password/i);
    await act( async () => {
      fireEvent.blur(input);
    });
    await waitFor(() => {
      expect(getByTestId("passwordError")).not.toBe(null);
      expect(getByTestId("passwordError")).toHaveTextContent("Required");
    });
  })

  it('Submit - user created', async () => {
    collection.mockResolvedValue('test');
    query.mockResolvedValue(true);
    getDocs.mockResolvedValue({docs: []});
    addDoc.mockResolvedValue({id: 'MOCK_TEST'});
    const handleSubmit = jest.fn();
    const { container, getByText, getByLabelText, debug } =
      render(<ProvideAuth><HashRouter><Signup onSubmit={handleSubmit} useAuth={useAuth}/></HashRouter></ProvideAuth>);

    await act( async () => {
      fireEvent.change(getByLabelText(/Username/i), {target: {value:'admin'}});
      fireEvent.change(getByLabelText(/Password/i), {target: {value:'admin'}});
    });

    await act( async () => {
      userEvent.click(getByText(/submit/i));
    });

    expect(handleSubmit);
  })

  it('Submit - user already exists', async () => {
    collection.mockResolvedValue('test');
    query.mockResolvedValue(true);
    getDocs.mockResolvedValue({docs: [1]});
    addDoc.mockResolvedValue({id: 'test'});
    const handleSubmit = jest.fn();
    const { container, getByText, getByLabelText, debug } =
      render(<ProvideAuth><HashRouter><Signup onSubmit={handleSubmit} useAuth={useAuth}/></HashRouter></ProvideAuth>);

    await act( async () => {
      fireEvent.change(getByLabelText(/Username/i), {target: {value:'admin'}});
      fireEvent.change(getByLabelText(/Password/i), {target: {value:'admin'}});
    });

    await act( async () => {
      userEvent.click(getByText(/submit/i));
    });

    expect(handleSubmit);
  })

  it('Submit - incorrect', async () => {
    getDocs.mockResolvedValue({docs: [1]});
    addDoc.mockResolvedValueOnce({id: 'test'});
    setDoc.mockResolvedValueOnce({id: 'test'});
    const handleSubmit = jest.fn();
    const { container, getByText, getByLabelText, debug } =
      render(<ProvideAuth><HashRouter><Signup onSubmit={handleSubmit} useAuth={useAuth}/></HashRouter></ProvideAuth>);

    await act( async () => {
      fireEvent.change(getByLabelText(/Username/i), {target: {value:'test'}});
      fireEvent.change(getByLabelText(/Password/i), {target: {value:'test'}});
    });

    await act( async () => {
      userEvent.click(getByText(/submit/i));
    });

    expect(handleSubmit);
  })
});
