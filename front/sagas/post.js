import { all, fork, takeLatest, put, call } from 'redux-saga/effects';
import axios from 'axios';
import {UPLOAD_IMAGES_REQUEST,UPLOAD_IMAGES_SUCCESS,UPLOAD_IMAGES_FAILURE,UPLOAD_BANNER_REGISTER_FAILURE,
            UPLOAD_BANNER_REGISTER_REQUEST,UPLOAD_BANNER_REGISTER_SUCCESS} from '../reducers/post';

/**
 * @author 정규현
 * @summary 업로드 및 게시물 관련 saga
 */

const backUrl = process.env.NODE_ENV === 'production'? "?" : "?";

function uploadImagesAPI(formData) {
    return axios.post(backUrl, formData, {
      withCredentials: true,
    });
  }
  
  function* uploadImages(action) {
    try {
      const result = yield call(uploadImagesAPI, action.data);
      
      yield put({
        type: UPLOAD_IMAGES_SUCCESS,
        data: result.data,
      });
    } catch (e) {
      console.error(e);
      yield put({
        type: UPLOAD_IMAGES_FAILURE,
        error: e,
      });
    }
  }
  
  function* watchUploadImages() {
    yield takeLatest(UPLOAD_IMAGES_REQUEST, uploadImages);
  }

  function imagesRegisterAPI(registerData) {
    return axios.post(backUrl,{
        title:registerData.title,
        desc:registerData.desc,
        url:registerData.url,
        client:registerData.client,
        filepath:registerData.imagePaths,
    }, {
      withCredentials: true,
    });
  }
  
  function* imagesRegister(action) {
    try {
      const result = yield call(imagesRegisterAPI, action.data);
      yield put({
        type: UPLOAD_BANNER_REGISTER_SUCCESS,
        data: result.data,
      });
    } catch (e) {
      console.error(e);
      yield put({
        type: UPLOAD_BANNER_REGISTER_FAILURE,
        error: e,
      });
    }
  }
  
  function* watchRegisterImages() {
    yield takeLatest(UPLOAD_BANNER_REGISTER_REQUEST, imagesRegister);
  }
  
export default function* postSaga(){
    yield all([
        fork(watchUploadImages),
        fork(watchRegisterImages)
    ]);
}