import axios from 'axios'
const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY
export const FETCH_USER_LABEL_LIST = "FETCH_USER_LABEL_LIST"
export const FETCH_MAIL_BY_LABEL_ID =  "FETCH_MAIL_BY_LABEL_ID"

export function fetchUserLabelList(userId){
  const request = axios.get(`https://gmail.googleapis.com/gmail/v1/users/${userId}/labels`)
  console.log(request)
  //method: users.labels.list
  return{
    type: FETCH_USER_LABEL_LIST,
    payload: request
  }
}

export function fetchMailByLabelId(userId, labelArray)
  const request = axios.get(`https://gmail.googleapis.com/gmail/v1/users/${userId}/labelIds[${labelArray}]/messages`)
  //method: users.messages.list
  //parsity label: Label_8972486543345914093
  return{
    type: FETCH_MAIL_BY_LABEL_ID,
    payload: request
  }