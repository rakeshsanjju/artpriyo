

const BASE_URL = "http://192.168.1.8:5000/api/v1"


// AUTH ENDPOINTS
export const endpoints = {
    SENDOTP_API: BASE_URL + "/user/sendotp",
    SIGNUP_API: BASE_URL + "/user/signup",
    LOGIN_API: BASE_URL + "/user/login",
    RESETPASSTOKEN_API: BASE_URL + "/user/reset-password-token",
    RESETPASSWORD_API: BASE_URL + "/user/reset-password",
    SINGLE_USER_API : BASE_URL+"/user/fetch/singleUser",
    UPDATE_USER_API : BASE_URL +"/user/update",
    SEARCH_API : BASE_URL+"/user/search",
    CHANGE_PASSWORD : BASE_URL + "/user/change/password",
    ACCEPT_CONNECTION : BASE_URL + "/user/acceptFriend",
    CONNECT_FRIEND:BASE_URL + "/user/connectFriend",
    DELETE_REQUESTED_CONNECTION:BASE_URL+"/user/delete/request/connection"
}
export const eventEndPoints = {
    GET_ALL_EVENTS:BASE_URL+"/user/fetch/eventTypes",
    FETCH_EVENTS:BASE_URL+"/user/fetch/events",
    FETCH_ONGOING_EVENTS:BASE_URL+"/user/ongoing/events",
    FETCH_CONNECTIONS:BASE_URL+"/user/fetch/connections",
    FETCH_RANDOM_USERS:BASE_URL + "/user/fetch/random/users",
    
}