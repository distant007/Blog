import { combineReducers } from 'redux'

import { listReducer } from './list/listReducer'
import { articleReducer } from './article/articleReducer'
import { singInReducer } from './singIn/singInReducer'
export const rootReducer = combineReducers({
  listReducer,
  articleReducer,
  singInReducer,
})
