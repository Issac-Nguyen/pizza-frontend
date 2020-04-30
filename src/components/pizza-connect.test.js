import React from 'react'
import { createStore } from 'redux'
import { render, fireEvent, cleanup } from '../__test__/test-utils'
import '@testing-library/jest-dom/extend-expect'
import Pizza from './pizza'
import reducer, { defaultState} from '../reducers'
import {bookAction} from '../actions/orderActions'

describe('pizza-connected', () => {

    afterEach(cleanup)
    it('can render with redux with defaults', () => {
        const pizza = {id: 1, url: 'http://google.com', name:"pizza 1", price:10}
        const { container } = render(<Pizza {...pizza}/>)
        // expect(screen.getByTestId('count-value')).toHaveTextContent('1')
    })
    it('can render with redux with custom store', () => {
        const pizza = {id: 1, url: 'http://google.com', name:"pizza 1", price:10, currency: '$'}
        const store = createStore(reducer, {...defaultState})
        store.dispatch = jest.fn();
        const { container } = render(<Pizza {...pizza}/>, {
            store,
          });
        const btnAddBook = container.querySelector('.add-cart')
        fireEvent.click(btnAddBook);
        expect(store.dispatch).toHaveBeenCalledTimes(1);
        expect(store.dispatch).toHaveBeenCalledWith(
            bookAction(pizza)
            )
      })
})
