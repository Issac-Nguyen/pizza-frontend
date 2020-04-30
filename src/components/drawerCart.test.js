import React from 'react'
import {render, cleanup, act, waitForElementToBeRemoved, getByText, fireEvent, waitForDomChange} from '@testing-library/react'
import {DrawerCart} from './drawerCart'

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

  describe('drawerCart', () => {
    afterEach(cleanup);

    it('should take a snapshot without bookitem', async () => {
        const mockCloseCart = jest.fn();
       const { asFragment } = render(<DrawerCart bookItems={[]} showCart={true} closeCart={mockCloseCart}/>, <div style={{width: '1000px'}}></div>)
       expect(asFragment(<DrawerCart bookItems={[]}/>)).toMatchSnapshot()
    })

    it('should take a snapshot with bookItem has length', () => {
        const pizza = {id: 1, url: 'http://google.com', name:"pizza 1", number:2, price:10}
        const { asFragment } = render(<DrawerCart bookItems={[pizza]} showCart={true}/>)
        
        expect(asFragment(<DrawerCart bookItems={[pizza]} showCart={true}/>)).toMatchSnapshot()
     })
  })