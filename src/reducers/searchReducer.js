import {
  FETCH_MAIL_BY_LABEL_ID,
  FETCH_USER_LABEL_LIST,
  FETCH_SPEECH,
} from "../actions";

const textSpeechReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_SPEECH:
      const data = action.payload;

      return [data, ...state];

    default:
      return state;
  }
};

export default textSpeechReducer;
