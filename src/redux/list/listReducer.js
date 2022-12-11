/* eslint-disable indent */
import { ERROR, LIST, OFFSET } from '../typesAсtions'
const initialState = {
  list: [],
  count: 0,
  offset: 0,
  error: null,
}
export const listReducer = (state = initialState, action) => {
  switch (action.type) {
    case LIST:
      return {
        ...state,
        list: [...action.payload],
        count: action.count,
      }
    case OFFSET:
      return {
        ...state,
        offset: action.payload,
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
