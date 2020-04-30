import React from 'react'
import {render, cleanup} from '@testing-library/react'
import {PizzaItem as Pizza} from './pizza'

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

  describe('Pizza', () => {
    afterEach(cleanup);

    it('should take a snapshot', () => {
        const pizza = {id: 1, url: 'http://google.com', name:"pizza 1", price:10}
        const { asFragment } = render(<Pizza {...pizza}/>);
        
        expect(asFragment(<Pizza {...pizza}/>)).toMatchSnapshot()
     })

     it('should have name pizza 1', () => {
        const pizza = {id: 1, url: 'http://google.com', name:"pizza 1", price:10}
        const { container } = render(<Pizza {...pizza}/>);
        expect(container.querySelector('.item')).toHaveTextContent('pizza 1')
     })

})