import React from 'react'
import { HashRouter } from 'react-router-dom';
import { act } from "react-dom/test-utils"
import { render, waitFor, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import History from '../components/History.js'

describe("History component", () => {
  afterEach(jest.resetAllMocks);

  it('Render - history', async () => {
    const { container, getByLabelText, debug } = render(<HashRouter><History /></HashRouter>);
  })
});
