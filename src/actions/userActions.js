import {USERACTIONS} from './ActionTypes';
export const register = (userInfo) => (
    {
     type: USERACTIONS.REGISTER,
     payload: userInfo
    }
)

export const login = (loginInfo) => (
    {
     type: USERACTIONS.LOGIN,
     payload: loginInfo
    }
)

export const logout = () => (
    {
        type: USERACTIONS.LOGOUT
    }
)

export const showCart = () => (
    {
        type: USERACTIONS.SHOW_CART
    }
)

export const closeCart = () => (
    {
        type: USERACTIONS.CLOSE_CART
    }
)

export const showAuthenForm = () => (
    {
        type: USERACTIONS.SHOW_AUTHEN_FORM
    }
)

export const closeAuthenForm = () => (
    {
        type: USERACTIONS.CLOSE_AUTHEN_FORM
    }
)

export const clearCart = () => (
    {
        type: USERACTIONS.CLEAR_CART
    }
)

export const addOrder = (order) => (
    {
        type: USERACTIONS.ADD_ORDER,
        payload: order
    }
)

export const changeCurrency = curr => (
    {
        type: USERACTIONS.CHANGE_CURRENCY,
        payload: curr
    }
)