export const GET_PROFILE_DETAIL = "GET_PROFILE_DETAIL";
export const GET_USER_DETAIL = "GET_USER_DETAIL";
export const GET_USER_DETAIL_SUCCESS = "GET_USER_DETAIL_SUCCESS";
export const GET_USER_DETAIL_FAIL = "GET_USER_DETAIL_FAIL";
export const AUTH_SIGN_IN = "AUTH_SIGN_IN";
export const AUTH_SET_LOGGEDIN = "AUTH_SET_LOGGEDIN";
export function getProfileDetials() {
  return {
    type: GET_PROFILE_DETAIL
  };
}
export function getUserDetials() {
  return {
    type: GET_USER_DETAIL
  };
}

export function signIn(data) {
  return { type: AUTH_SIGN_IN, data };
}

export function setLoggedIn(isLoggedIn) {
  return {
    type: AUTH_SET_LOGGEDIN,
    isLoggedIn
  };
}