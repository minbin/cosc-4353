import React from 'react'
import { HashRouter } from 'react-router-dom';
import { act } from "react-dom/test-utils"
import { render, waitFor, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import History from '../components/History.js'

import { getDoc } from 'firebase/firestore';
jest.mock('../firebase');
jest.mock('firebase/firestore');

describe("History component", () => {
  afterEach(jest.resetAllMocks);

  it('Render - history', async () => {
    const history = [{'gallons':'10', 'address':'123 main', 'startDate': {'seconds': '1000000'}, 'suggested':'10', 'total':'10'}]
    getDoc.mockResolvedValueOnce({data: function () {return {history: history}}});
//    const { container, getByLabelText, debug } = render(<HashRouter><History /></HashRouter>);
    await act( async () => {
      render(<HashRouter><History /></HashRouter>)
    });
  })
});
