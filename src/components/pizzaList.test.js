import React from 'react'
import {render, cleanup} from '@testing-library/react'
import PizzaList from './pizzaList'

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

jest.mock('./pizza', () => () => (
    <div>pizza</div>
))

describe('PizzaList', () => {
    afterEach(cleanup);

    it('should take a snapshot with pizza has no length', () => {
        const { asFragment } = render(<PizzaList />);
        
        expect(asFragment(<PizzaList />)).toMatchSnapshot()
     })

     it('should take a snapshot with pizza has length', () => {
        const { asFragment } = render(<PizzaList pizzas={[{id: 1}]}/>);
        
        expect(asFragment(<PizzaList />)).toMatchSnapshot()
     })

     it('should have item pizza when pizza has length', () => {
        const { container } = render(<PizzaList pizzas={[{id: 1}]}/>);
        expect(container.querySelector('.pizza-area')).toHaveTextContent('pizza')
     })
})