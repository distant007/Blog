/* eslint-disable indent */
import { ARTICLE, CREATE, ERRCREATE, EDIT } from '../typesAсtions'
const initialState = {
  article: null,
  status: null,
  err: null,
  edit: null,
}
export const articleReducer = (state = initialState, action) => {
  switch (action.type) {
    case ARTICLE:
      return {
        ...state,
        article: action.payload,
      }
    case CREATE:
      return {
        ...state,
        status: action.payload,
      }
    case ERRCREATE:
      return {
        ...state,
        err: action.payload,
      }
    case EDIT:
      return {
        ...state,
        edit: action.payload,
      }
    default:
      return state
  }
}
