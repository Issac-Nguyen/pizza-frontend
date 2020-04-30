import React from 'react'
import {render, cleanup} from '@testing-library/react'
import Icon from './Icon'

describe('Icon', () => {
    afterEach(cleanup);
 
    it('should take a snapshot', () => {
       const { asFragment } = render(<Icon name="test"/>)
       
       expect(asFragment(<Icon name="test"/>)).toMatchSnapshot()
    })

    it('should have icon', () => {
        const { container  } = render(<Icon name="test"/>)
        
        expect(container.querySelector('i')).toBeInTheDocument();
        expect(container.querySelector('i')).toHaveClass('las test');
     })
})
