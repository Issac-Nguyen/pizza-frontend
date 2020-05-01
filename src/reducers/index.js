import { uuid } from 'uuidv4';
import {USERACTIONS, ORDERACTIONS, ITEMACTIONS} from '../actions/ActionTypes';
export const defaultState = {
    user: '',
    book: [],
    order: [],
    showCart: false,
    login: false,
    showAuthenForm: false,
    showCurrency: 'usd'
}
export default (state = defaultState, action) => {
    switch (action.type) {
     case ORDERACTIONS.BOOK:
         const bookIdItem= uuid();
      return {
       ...state,
       book: state.book.concat({bookId: bookIdItem, ...action.payload})
      }
    case USERACTIONS.SHOW_CART:
        return {
            ...state,
            showCart: true
        }
    case USERACTIONS.CLOSE_CART:
            return {
                ...state,
                showCart: false
            }
    case USERACTIONS.CLEAR_CART:
            return {
                ...state,
                book: []
            }
    case USERACTIONS.ADD_ORDER:
        console.log(state.order)
            return {
                ...state,
                order: state.order.concat([action.payload])
            }
    case ORDERACTIONS.REMOVEBOOK:
        const id = action.payload;
        let bookId;
        for(let i = 0; i < state.book.length; i++) {
            const bookItem = state.book[i];
            if(bookItem.id == id) {
                bookId = bookItem.bookId;
                break;
            }
        }

        return {
            ...state,
            book: state.book.filter(i => i.bookId != bookId)
        }
    case ORDERACTIONS.REMOVEITEMBOOK:
        return {
            ...state,
            book: state.book.filter(i => i.id !== action.payload)
        }
    case USERACTIONS.REGISTER:
        var {email} = action.payload;
            return {
                ...state,
                user: email,
                login: true
            }
    case USERACTIONS.LOGIN:
        var {email} = action.payload;
            return {
                ...state,
                user: email,
                login: true
            }
    case USERACTIONS.LOGOUT:
        return {
            ...state,
            user: '',
            login: false
        }
    case USERACTIONS.SHOW_AUTHEN_FORM:
            return {
                ...state,
                showAuthenForm: true
            }
    case USERACTIONS.CLOSE_AUTHEN_FORM:
            return {
                ...state,
                showAuthenForm: false
            }
    case USERACTIONS.CHANGE_CURRENCY:
            return {
                ...state,
                showCurrency: action.payload
            }
    default:
      return state
    }
}
    