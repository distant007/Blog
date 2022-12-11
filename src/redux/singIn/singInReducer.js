/* eslint-disable indent */
import { USER, ERRORSING } from '../typesAсtions'
const initialState = {
  user: null,
  error: null,
}
export const singInReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER:
      return {
        ...state,
        user: action.payload,
        error: null,
      }
    case ERRORSING:
      return {
        ...state,
        error: action.payload,
      }
    default:
      return state
  }
}
