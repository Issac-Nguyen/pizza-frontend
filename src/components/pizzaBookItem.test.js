import React from 'react'
import {render, cleanup} from '@testing-library/react'
import {PizzaBookItem} from './drawerCart'

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

describe('PizzaBookItem', () => {
    afterEach(cleanup)
    it('should take a snapshot', () => {
        const pizza = {id: 1, url: 'http://google.com', name:"pizza 1", number: 1, price:10}
        const { asFragment } = render(<PizzaBookItem {...pizza}/>);
        
        expect(asFragment(<PizzaBookItem {...pizza}/>)).toMatchSnapshot()
     })

     it('should have name pizza 1 and price 10', () => {
        const pizza = {id: 1, url: 'http://google.com', name:"pizza 1", number:1, price:10}
        const { container } = render(<PizzaBookItem {...pizza}/>);
        expect(container.querySelector('.name-list')).toHaveTextContent('pizza 1')
        expect(container.querySelector('.price-list')).toHaveTextContent('$10')
     })

     it('should have name pizza 1 and price 20', () => {
        const pizza = {id: 1, url: 'http://google.com', name:"pizza 1", number:2, price:10}
        const { container } = render(<PizzaBookItem {...pizza}/>);
        expect(container.querySelector('.name-list')).toHaveTextContent('pizza 1')
        expect(container.querySelector('.price-list')).toHaveTextContent('$20')
     })
})