import { all, call, takeLatest, fork, put, takeEvery, delay } from 'redux-saga/effects';
import { LOG_IN_SUCCESS, LOG_IN_FAILURE, LOG_IN_REQUEST, LOG_IN_MAINTAIN_REQUEST, LOG_IN_MAINTAIN_FAILURE,LOG_IN_MAINTAIN_SUCCESS } from '../reducers/user';
import axios from 'axios';
import Router from 'next/router';

/**
 * @author 정규현
 * @summary 리덕스 사가를 활용한 로그인
 */

const backUrl = process.env.NODE_ENV === 'production'? "?" : "?";

function loginAPI(loginData){
   return axios.post(backUrl,
    {
        email:loginData.inputEmail,
        password:loginData.inputPassword
    },{
        withCredentials:true,
    })
    .catch((res)=>{console.log(res)});
}

function* login(action){
    try{
        const result = yield call(loginAPI, action.data); 
        
        if(result.data.token !== null && result.data.token !== "null"){
            yield put({
                type:LOG_IN_SUCCESS,
                data: result.data
            });
            localStorage.setItem("userid",result.data.user['userid']);
            localStorage.setItem("email",result.data.user['email']);
            localStorage.setItem("nick_name",result.data.user['nick_name']);
            localStorage.setItem("user_image",result.data.user['user_image']);
            localStorage.setItem("reputation",result.data.user['reputation']);
            localStorage.setItem("role_name",result.data.user['role_name']);
            localStorage.setItem("token",result.data.token);
            localStorage.setItem("isLogin",true);
            Router.push('/');
        }else{
            yield put({
                type:LOG_IN_FAILURE,
                logInErrorReason:"일치하는 회원정보가 없습니다."
            });
        }
       
    }catch(e){
        console.error(e);
        yield put({
            type:LOG_IN_FAILURE,
            logInErrorReason:"일치하는 회원정보가 없습니다."
        });
    }
}

function* watchLogin(){
    yield takeLatest(LOG_IN_REQUEST, login);
}

function loginMaintainToken(){
    if ( localStorage.getItem('token')=== "null" || localStorage.getItem('token')  === null ){
        return;
    } 
    return axios.get(backUrl,
     {params:{
         token:localStorage.getItem('token'),
        }
     })
     .catch((res)=>{console.log(res)});
 }

function* loginMaintainAPI(){
    const result = yield call(loginMaintainToken);
    if(result.data === "success"){
        return {
            token:localStorage.getItem('token'),
            user:{
                userid:localStorage.getItem('userid'),
                role_name:localStorage.getItem('role_name'),
                nick_name:localStorage.getItem('nick_name'),
                isLogin:localStorage.getItem('isLogin'),
                email:localStorage.getItem('email'),
                user_image:localStorage.getItem('user_image'),
                reputation:localStorage.getItem('reputation'),
            }
        }
    }else{
        Router.push('/user/login');
    }
}

function* loginMaintain(){
    try {
        const result = yield call(loginMaintainAPI); 
        if(result === undefined || result===null || result === "null"){
            return;
        }
        yield put({
            type:LOG_IN_MAINTAIN_SUCCESS,
            data:result,
        })
    } catch (e) {
        console.error(e);
        yield put({
            type:LOG_IN_MAINTAIN_FAILURE,
        })
    }
}

function* watchLoginCheck(){
    yield takeLatest(LOG_IN_MAINTAIN_REQUEST, loginMaintain)
}
export default function* userSaga(){
    yield all([
        fork(watchLogin),
        fork(watchLoginCheck),
    ]);
}