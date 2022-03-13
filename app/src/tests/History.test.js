import React from 'react'
import { act } from "react-dom/test-utils"
import { render, waitFor, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Quote from '../components/Quote.js'

describe("History component", () => {
  afterEach(jest.resetAllMocks);

  it('Gallons Requested - float input', async () => {
jest.mock('universal-cookie', ()=>({get: () => 'fr'}));
    const { container, getByLabelText, debug } = render(<History />);
  })
});
