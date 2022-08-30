import {combineReducers} from "redux"
import searchReducer from "./searchReducer"

const rootReducer = combineReducers({
  emailState: searchReducer,
})

export default rootReducer