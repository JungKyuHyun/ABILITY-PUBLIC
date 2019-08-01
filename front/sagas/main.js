import {all, fork, takeLatest, put, call} from 'redux-saga/effects';
import axios from 'axios';
import { MAIN_DATA_FAILURE, MAIN_DATA_SUCCESS, MAIN_DATA_REQUEST } from '../reducers/main';

/**
 * @author 정규현
 * @summary 메인 페이지 saga
 * @version 퍼블릭 배포용으로 변경
 */

const backUrl = process.env.NODE_ENV === 'production'? "?" : "?";

function getMainDataAPI(){
    return axios.post(backUrl+"/home");
}

function* getMainPageData() {
    try {
        const result = yield call(getMainDataAPI);
        yield put({
            type: MAIN_DATA_SUCCESS,
            data: result.data,
        });
    } catch (error) {
        console.error(error);
        yield put({
            type:MAIN_DATA_FAILURE,
            error: error,
        });
    }
}

 function* watchGetMainPageData(){
     yield takeLatest(MAIN_DATA_REQUEST, getMainPageData);
 };

 export default function* mainSaga(){
     yield all([
         fork(watchGetMainPageData)
        ])
 }