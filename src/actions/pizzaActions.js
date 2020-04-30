import {ITEMACTIONS} from './ActionTypes';

export const allItemsAction = () => (
    {
     type: ITEMACTIONS.ALLPIZZA
    }
)

   export const itemAction = (id) => (
    {
     type: ITEMACTIONS.ALLPIZZA,
     payload: id
    }
   )