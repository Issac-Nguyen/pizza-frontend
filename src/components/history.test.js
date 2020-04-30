import React from 'react'
import {render, cleanup, act, waitForElementToBeRemoved, getByText, fireEvent} from '@testing-library/react'
import {History} from './history'
import getHistoryService from '../services/getHistoryService'

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

  

  // jest.mock('../services/getHistoryService', () => () => Promise.resolve({data: {success: true, data: [{created_at: 1588052042433,
  //   currency: "$",
  //   customer_address: "Ô 18 Lô 903 Hòn Rớ, Phước Đồng",
  //   customer_name: "Nguyen Huu Phat",
  //   customer_phone: "0777955777",
  //   email: "jupitern8@gmail.com",
  //   fee: 2.11,
  //   id: 82,
  //   name: "pizza 3",
  //   order_id: "dd48919a-6982-4f",
  //   pizza_id: 3,
  //   price: 10,
  //   schedule: "immediately",
  //   total: 32.11,
  //   url: "https://image.shutterstock.com/image-photo/concept-promotional-flyer-poster-restaurants-260nw-1060535249.jpg"}]}}))

  jest.mock('../services/getHistoryService');

describe('History', () => {
    afterEach(() => {
      jest.clearAllMocks();
      cleanup();
    });

    it('should take a snapshot with login', async () => {
      const result = {data: {success: true, testing: true, data: [{created_at: 1588052042433,
         currency: "$",
         customer_address: "Ô 18 Lô 903 Hòn Rớ, Phước Đồng",
         customer_name: "Nguyen Huu Phat",
         customer_phone: "0777955777",
         email: "jupitern8@gmail.com",
         fee: 2.11,
         id: 82,
         name: "pizza 3",
         order_id: "dd48919a-6982-4f",
         pizza_id: 3,
         price: 10,
         schedule: "immediately",
         total: 32.11,
         url: "https://image.shutterstock.com/image-photo/concept-promotional-flyer-poster-restaurants-260nw-1060535249.jpg"}]}};
       const mockFn = getHistoryService.mockResolvedValueOnce(result);
                const {asFragment, getByText, container} = (render(<History login={true}/>));
           await waitForElementToBeRemoved(() => container.querySelector('.ant-spin'));
           fireEvent.click(container.querySelector('.day-header'))
           expect(asFragment(<History login={true}/>)).toMatchSnapshot()
       
    })
    
    it('should take a snapshot without login', () => {
        const { asFragment } = render(<History login={false}/>)
        expect(asFragment(<History login={false}/>)).toMatchSnapshot()
     })
 
     
})