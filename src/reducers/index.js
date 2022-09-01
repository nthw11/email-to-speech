import { combineReducers } from "redux";
import textSpeechReducer from "./searchReducer";

const rootReducer = combineReducers({
  speech: textSpeechReducer,
});

export default rootReducer;
