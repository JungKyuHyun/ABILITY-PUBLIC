import { all, call } from 'redux-saga/effects';

import user from './user';
import post from './post';
import main from './main';

/**
 * @author 정규현
 * @summary saga index
 */
export default function* rootSaga(){
    yield all([
        call(user),
        call(post),
        call(main)
    ]);
}