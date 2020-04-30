import React from 'react'
import { createStore } from 'redux'
import { render, fireEvent, cleanup } from '../__test__/test-utils'
import '@testing-library/jest-dom/extend-expect'
import reducer, { defaultState} from '../reducers'
import History from './history'

Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // deprecated
      removeListener: jest.fn(), // deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });

describe('history-connected', () => {

    afterEach(cleanup)
    it('can render with redux with login false', () => {
        const { container, getByText } = render(<History />, {login: false})
        expect(getByText(/you need to login/i)).toBeInTheDocument();
    })

    it('can render with redux with login true', () => {
        const store = createStore(reducer, {login: true})
        const { container, getByText } = render(<History />, {
                    store,
                  })
        expect(getByText(/you don't have/i)).toBeInTheDocument();
    })
})
