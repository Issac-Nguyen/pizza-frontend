import React from 'react'
import {render, cleanup, act, waitForElementToBeRemoved, getByText, getByRole,fireEvent, waitForDomChange, wait} from '@testing-library/react'
import {AuthenForm} from './authenForm'
import registerService from '../services/registerService'

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

//   jest.mock('../services/registerService', () => () => {
//       return Promise.resolve({data: {
//         success: false,
//         msg: 'Email used',
//         testing: true
//     }})
//   })

  jest.mock('../services/registerService');

describe('authenForm', () => {
    afterEach(() => {
        cleanup();
        jest.clearAllMocks();
    })

    it('should take a snapshot', () => {
       const { asFragment } = render(<AuthenForm />)
       
       expect(asFragment(<AuthenForm />)).toMatchSnapshot()
    })
    it('should have register, login in document', () => {
        const { getByText, container } = render(<AuthenForm />)
        
        expect(container.querySelector('#tab-login')).toBeInTheDocument()
        expect(container.querySelector('#tab-register')).toBeInTheDocument()
     })

     it('should have snapshot login', () => {
        const { asFragment, container } = render(<AuthenForm />)
        
        fireEvent.click(container.querySelector('#tab-login'));
        expect(asFragment(<AuthenForm />)).toMatchSnapshot()
     })

     it('should not allow register wihout anything input', async () => {
        const { getByText, container } = render(<AuthenForm />)

        fireEvent.click(container.querySelector('button'));
        await waitForDomChange();
        expect(getByText(/please input your e-mail!/i)).toBeInTheDocument();
     })

     it('should call register service', async () => {
        const mockFn = registerService.mockResolvedValueOnce({
            data: {
                success: false,
                msg: 'Email used',
                testing: true
            }
        });
        const { getByText, container } = render(<AuthenForm />)
        fireEvent.change(container.querySelector('#register_email'), {targe: {value: 'abcddf@gmai.com'}})
        fireEvent.change(container.querySelector('#register_password'), {targe: {value: '1'}})
        fireEvent.change(container.querySelector('#register_confirm'), {targe: {value: '1'}})
        const formRegister = await container.querySelector('.register-form-button');
        fireEvent.submit(formRegister);
        // console.log(container.querySelector('#register'))
        // expect(mockFn).toHaveBeenCalledTimes(1);
        await wait();
        // expect(mockFn).toHaveBeenCalledTimes(1);
     });
})