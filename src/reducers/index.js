import { combineReducers } from 'redux'
import advList from './adverticementReducer'

const mainReducer = combineReducers({advList})

export default mainReducer