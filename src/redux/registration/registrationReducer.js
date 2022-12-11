/* eslint-disable indent */
import { RES, ERROR } from '../typesAсtions'
const initialState = {
  res: null,
  error: null,
}
export const registrationReducer = (state = initialState, action) => {
  switch (action.type) {
    case RES:
      return {
        ...state,
        res: action.payload,
      }
    case ERROR:
      return {
        ...state,
        error: action.payload,
      }
    default:
      return state
  }
}
