import {combineReducers} from 'redux';
import user from './user';
import post from './post';
import main from './main';

/**
 * @author 정규현
 * @summary 리듀서를 하나의 스토어로 조합
 */

const rootReducer =  combineReducers({
    user,
    post,
    main,
});

export default rootReducer;