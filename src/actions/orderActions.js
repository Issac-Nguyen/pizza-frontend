import {ORDERACTIONS} from './ActionTypes';
export const bookAction = (itemInfo) => (
    {
     type: ORDERACTIONS.BOOK,
     payload: itemInfo
    }
)

export const removeBookAction = (id) => (
    {
        type: ORDERACTIONS.REMOVEBOOK,
        payload: id
    }
)

export const orderAction = (orderInfo) => (
    {
     type: ORDERACTIONS.ORDER,
     payload: orderInfo
    }
)

export const paymentAction = (paymentInfo) => (
    {
     type: ORDERACTIONS.PAYMENT,
     payload: paymentInfo
    }
)