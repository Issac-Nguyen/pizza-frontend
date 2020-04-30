import React from 'react'
import {render, cleanup} from '@testing-library/react'
import {Order} from './order'

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

describe('Order', () => {
    afterEach(cleanup);
 
    it('should take a snapshot with order has no length', () => {
       const { asFragment } = render(<Order order={[]}/>)
       
       expect(asFragment(<Order order={[]}/>)).toMatchSnapshot()
    })

    it('should take a snapshot with order has length', () => {
        const order = {created_at: 1588061743099, customer_address: "Ô 18 Lô 903 Hòn Rớ, Phước Đồng",
            customer_name: "Nguyen Huu Phat",
            customer_phone: "0777955777",
            email: "",
            fee: 4.66,
            order_items: [
                {
                currency: "$",
                id: 4,
                name: "pizza 4",
                pizza_id: 4,
                price: 10,
                url: "https://image.shutterstock.com/image-photo/concept-promotional-flyer-poster-restaurants-260nw-1060535249.jpg"
                },
                {
                    currency: "$",
                    id: 6,
                    name: "pizza 4",
                    pizza_id: 4,
                    price: 10,
                    url: "https://image.shutterstock.com/image-photo/concept-promotional-flyer-poster-restaurants-260nw-1060535249.jpg"
                    }
            ],
            schedule: true,
            sendimmediate: true,
            total: "24.66"};

        const { asFragment } = render(<Order order={[order]}/>)
        
        expect(asFragment(<Order order={order}/>)).toMatchSnapshot()
     })

     it('should show no order if no order in props', () => {
        const { getByText } = render(<Order order={[]}/>)
        
        expect(getByText(/you don't have any order today/i)).toBeInTheDocument()
     })

     it('should show your orders with order has length', () => {
        const order = {created_at: 1588061743099, customer_address: "Ô 18 Lô 903 Hòn Rớ, Phước Đồng",
            customer_name: "Nguyen Huu Phat",
            customer_phone: "0777955777",
            email: "",
            fee: 4.66,
            order_items: [
                {
                currency: "$",
                id: 4,
                name: "pizza 4",
                pizza_id: 4,
                price: 10,
                url: "https://image.shutterstock.com/image-photo/concept-promotional-flyer-poster-restaurants-260nw-1060535249.jpg"
                },
                {
                    currency: "$",
                    id: 6,
                    name: "pizza 4",
                    pizza_id: 4,
                    price: 10,
                    url: "https://image.shutterstock.com/image-photo/concept-promotional-flyer-poster-restaurants-260nw-1060535249.jpg"
                    }
            ],
            schedule: true,
            sendimmediate: true,
            total: "24.66"};

        const { getByText } = render(<Order order={[order]}/>)
        
        expect(getByText(/your orders/i)).toBeInTheDocument()
     })

     it('should show collapse with order has length', () => {
        const order = {created_at: 1588061743099, customer_address: "Ô 18 Lô 903 Hòn Rớ, Phước Đồng",
            customer_name: "Nguyen Huu Phat",
            customer_phone: "0777955777",
            email: "",
            fee: 4.66,
            order_items: [
                {
                currency: "$",
                id: 4,
                name: "pizza 4",
                pizza_id: 4,
                price: 10,
                url: "https://image.shutterstock.com/image-photo/concept-promotional-flyer-poster-restaurants-260nw-1060535249.jpg"
                },
                {
                    currency: "$",
                    id: 6,
                    name: "pizza 4",
                    pizza_id: 4,
                    price: 10,
                    url: "https://image.shutterstock.com/image-photo/concept-promotional-flyer-poster-restaurants-260nw-1060535249.jpg"
                    }
            ],
            schedule: true,
            sendimmediate: true,
            total: "24.66"};

        const { getByRole } = render(<Order order={[order]}/>)
        
        expect(getByRole('button')).toBeInTheDocument()
        expect(getByRole('button')).toHaveAttribute('aria-expanded')
     })
})
