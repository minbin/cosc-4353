import React from 'react'
import { HashRouter } from 'react-router-dom';
import { act } from "react-dom/test-utils"
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Logout from '../components/Logout.js'
import useAuth, { ProvideAuth } from '../components/Auth.js';

describe("Logout component", () => {
  afterEach(jest.resetAllMocks);

  it('Render - Logout', async () => {
    const { container, getByLabelText, debug } =
      render(<ProvideAuth><HashRouter><Logout useAuth={useAuth}/></HashRouter></ProvideAuth>);
  })
});
