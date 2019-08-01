/**
 * @author 정규현
 * @summary 리덕스 
 */

 export const initalState = {
    mainPosts:[],
    imagePaths: [], 
    imageTitle: [],
    imageDesc: [],
    imageUrl: [],
    imageRegisting: false,
};

export const UPLOAD_IMAGES_REQUEST = 'UPLOAD_IMAGES_REQUEST';
export const UPLOAD_IMAGES_SUCCESS = 'UPLOAD_IMAGES_SUCCESS';
export const UPLOAD_IMAGES_FAILURE = 'UPLOAD_IMAGES_FAILURE';
export const REMOVE_IMAGE = 'REMOVE_IMAGE';

export const UPLOAD_BANNER_REGISTER_REQUEST = 'UPLOAD_BANNER_REGISTER_REQUEST';
export const UPLOAD_BANNER_REGISTER_SUCCESS = 'UPLOAD_BANNER_REGISTER_SUCCESS';
export const UPLOAD_BANNER_REGISTER_FAILURE = 'UPLOAD_BANNER_REGISTER_FAILURE';


const reducer = (state=initalState, action) =>{
    switch(action.type){
        case UPLOAD_IMAGES_REQUEST: {
            return {
              ...state,
            };
          }
          case UPLOAD_IMAGES_SUCCESS: {
            return {
              ...state,
              imagePaths: [...state.imagePaths, ...action.data],
            };
          }
          case UPLOAD_IMAGES_FAILURE: {
            return {
              ...state,
            };
          }
          case REMOVE_IMAGE: {
            return {
              ...state,
              imagePaths: state.imagePaths.filter((v, i) => i !== action.index),
            };
          }
          case UPLOAD_BANNER_REGISTER_REQUEST: {
            return {
              ...state,
              imagePaths: [...state.imagePaths],
              imageTitle: [...state.imageTitle],
              imageDesc: [...state.imageDesc],
              imageUrl: [...state.imageUrl],
              imageRegisting: true,
            };
          }
          case UPLOAD_BANNER_REGISTER_SUCCESS: {
            return {
              ...state,
              imagePaths: [],
              imageRegisting: false,
            };
          }
          case UPLOAD_BANNER_REGISTER_FAILURE: {
            return {
              ...state,
            };
          }
          default: {
            return {
              ...state,
            };
          }
      
    }
};
export default reducer;