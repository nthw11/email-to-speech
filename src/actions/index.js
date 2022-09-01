import { getDefaultNormalizer } from "@testing-library/react";
import axios from "axios";
const IBM_API_KEY = process.env.REACT_APP_IBM_API_KEY;
const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
const VOICERSS_KEY = process.env.REACT_APP_VOICERSS_API_KEY;
export const FETCH_USER_LABEL_LIST = "FETCH_USER_LABEL_LIST";
export const FETCH_MAIL_BY_LABEL_ID = "FETCH_MAIL_BY_LABEL_ID";
export const FETCH_SPEECH = "FETCH_SPEECH";

export function fetchUserLabelList(userId) {
  const request = axios.get(
    `https://gmail.googleapis.com/gmail/v1/users/${userId}/labels`
  );
  console.log(request);
  //method: users.labels.list
  return {
    type: FETCH_USER_LABEL_LIST,
    payload: request,
  };
}

export function fetchMailByLabelId(userId, labelArray) {
  const request = axios.get(
    `https://gmail.googleapis.com/gmail/v1/users/${userId}/labelIds[${labelArray}]/messages`
  );
  //method: users.messages.list
  //parsity label: Label_8972486543345914093
  return {
    type: FETCH_MAIL_BY_LABEL_ID,
    payload: request,
  };
}
//const text = "today is the day"`http://api.voicerss.org/?key=8f08ac91aab9431ca49494c68335ba45&hl=en-us&v=Amy&c=ogg&src=todayistheday`;

export function fetchSpeech(text) {
  return {
    type: FETCH_SPEECH,
    payload: text,
  };
}
