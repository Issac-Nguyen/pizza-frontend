import React from 'react'
import {render, cleanup} from '@testing-library/react'
import {Cart} from './cart'

describe('Cart', () => {
    afterEach(cleanup);

    it('should take a snapshot', () => {
       const { asFragment } = render(<Cart book={[]}/>)
       
       expect(asFragment(<Cart book={[]}/>)).toMatchSnapshot()
    })
    

    it('should have icon', () => {
        const { container  } = render(<Cart book={[]}/>)
        
        expect(container.querySelector('i')).toBeInTheDocument();
        expect(container.querySelector('i')).toHaveClass('las la-shopping-cart');
        // expect(container.querySelector('Icon')).toHaveClass('las la-shopping-cart');
     })

     it('should take snapshot with length', () => {
        const { asFragment } = render(<Cart book={[{}]}/>)
        expect(asFragment(<Cart book={[{}]}/>)).toMatchSnapshot()
     })
})
