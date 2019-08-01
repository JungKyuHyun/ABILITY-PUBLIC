/**
 * @author 정규현
 * @summary  init
 */


export const initalState={
    isLoggedIn: false, 
    isLoggingOut: false, 
    isLoggingIn: false, 
    logInErrorReason: '', 
    me: null, 
};

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST'; 
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

export const LOG_IN_MAINTAIN_REQUEST = 'LOG_IN_MAINTAIN_REQUEST';
export const LOG_IN_MAINTAIN_SUCCESS = 'LOG_IN_MAINTAIN_SUCCESS';
export const LOG_IN_MAINTAIN_FAILURE = 'LOG_IN_MAINTAIN_FAILURE';

const reducer = (state = initalState, action) =>{
    switch (action.type){
        case LOG_IN_REQUEST: {
            return {
              ...state,
              isLoggingIn: true,
              logInErrorReason: '',
            };
          }
          case LOG_IN_SUCCESS: {
            return {
              ...state,
              isLoggingIn: false,
              isLoggedIn: true,
              me: action.data,
              isLoading: false,
            };
          }
          case LOG_IN_FAILURE: {
            return {
              ...state,
              isLoggingIn: false,
              isLoggedIn: false,
              logInErrorReason: "일치하는 회원 정보가 없습니다.",
              me: null,
            };
          }
          case LOG_OUT_REQUEST: {
            return {
              ...state,
              isLoggedIn: false,
              me: null,
            };
          }
          case LOG_IN_MAINTAIN_FAILURE: {
            return {
              ...state,
              isLoggingIn: false,
              isLoggedIn: false,
              logInErrorReason: action.error,
              me: null,
            };
          }
          case LOG_IN_MAINTAIN_REQUEST: {
            return {
              ...state,
              isLoggedIn: false,
              me: null,
            };
          }
          case LOG_IN_MAINTAIN_SUCCESS:{
            return {
              ...state,
              me:action.data,
              isLoggedIn: true,
            };
          }
        default:{
            return{
                ...state,
            };
        }
    };
};

export default reducer;