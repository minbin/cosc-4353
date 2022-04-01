import React from 'react'
import { HashRouter } from 'react-router-dom';
import { act } from "react-dom/test-utils"
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Login from '../components/Login.js'
import useAuth, { ProvideAuth } from '../components/Auth.js';

import { getDocs } from 'firebase/firestore';
import bcrypt from 'bcryptjs';
jest.mock('../firebase');
jest.mock('firebase/firestore');
jest.mock('bcryptjs');

describe("Login component", () => {
  afterEach(jest.resetAllMocks);

  it('Username - string input', async () => {
    const { container, getByLabelText, debug } =
      render(<ProvideAuth><HashRouter><Login useAuth={useAuth}/></HashRouter></ProvideAuth>);
    await act( async () => {
      userEvent.type(screen.getByLabelText(/username/i), 'admin');
    });
  })

  it('Username - empty input', async () => {
    const { container, getByLabelText, debug } =
      render(<ProvideAuth><HashRouter><Login useAuth={useAuth}/></HashRouter></ProvideAuth>);
    await act( async () => {
      userEvent.type(screen.getByLabelText(/username/i), " ");
    });
  })

  it('Login', async () => {
    const { container, getByLabelText, debug } =
      render(<ProvideAuth><HashRouter><Login useAuth={useAuth}/></HashRouter></ProvideAuth>);
    await act( async () => {
      userEvent.type(screen.getByLabelText(/username/i), "admin");
      userEvent.type(screen.getByLabelText(/password/i), "admin");
    });
  })

  it('Submit - correct', async () => {
    getDocs.mockResolvedValueOnce([{data: function () {return {'password': 'admin'}}}]);
    const handleSubmit = jest.fn();
    const { container, getByText, getByLabelText, debug } =
      render(<ProvideAuth><HashRouter><Login onSubmit={handleSubmit} useAuth={useAuth}/></HashRouter></ProvideAuth>);

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
    const handleSubmit = jest.fn();
    const { container, getByText, getByLabelText, debug } =
      render(<ProvideAuth><HashRouter><Login onSubmit={handleSubmit} useAuth={useAuth}/></HashRouter></ProvideAuth>);

    await act( async () => {
      fireEvent.change(getByLabelText(/Username/i), {target: {value:'test'}});
      fireEvent.change(getByLabelText(/Password/i), {target: {value:'test'}});
    });

  })

});
