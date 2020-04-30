import React from 'react'
import {render, cleanup} from '@testing-library/react'
import MustLogin from './mustLogin'

describe('mustLogin', () => {
    afterEach(cleanup);
 
    it('should take a snapshot', () => {
       const { asFragment } = render(<MustLogin />)
       
       expect(asFragment(<MustLogin />)).toMatchSnapshot()
    })

    it('should have h1', () => {
        const { getByText } = render(<MustLogin />)
        
        expect(getByText(/you need/i)).toBeInTheDocument();
     })
})
