import axios from "axios";

export const FETCH_USER_LABEL_LIST = "FETCH_USER_LABEL_LIST";
export const FETCH_MAIL_BY_LABEL_ID = "FETCH_MAIL_BY_LABEL_ID";
export const FETCH_SPEECH = "FETCH_SPEECH";

export function fetchUserLabelList(userId) {
  const request = axios.get(
    `https://gmail.googleapis.com/gmail/v1/users/${userId}/labels`
  );
  console.log(request);

  return {
    type: FETCH_USER_LABEL_LIST,
    payload: request,
  };
}

export function fetchMailByLabelId(userId, labelArray) {
  const request = axios.get(
    `https://gmail.googleapis.com/gmail/v1/users/${userId}/labelIds[${labelArray}]/messages`
  );

  return {
    type: FETCH_MAIL_BY_LABEL_ID,
    payload: request,
  };
}

export function fetchSpeech(text) {
  return {
    type: FETCH_SPEECH,
    payload: text,
  };
}
