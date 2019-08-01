import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';
import AppLayout from '../components/AppLayout';
import {createStore, compose, applyMiddleware} from 'redux';
import reducer from '../reducers';
import rootSaga from '../sagas';
import {Provider} from 'react-redux';
import createSagaMiddleware from '@redux-saga/core';

/**
 * @author 정규현
 * @summary 공통부분 및 리덕스 스토어 적용, 미들웨어 적용
 */

const Ability = ({Component, store, pageProps})=> {
   
    return (
        <>
        <Provider store={store}>
            <Head>
            <title>ABILITY</title>
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
                    integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
                    crossOrigin="anonymous"
                    />
            <meta
                name="viewport"
                content="initial-scale=1.0, width=device-width"
                key="viewport"
            />
            <link rel="shortcut icon" type="image/x-icon" href="/static/favicon.ico" />
            <link href="https://fonts.googleapis.com/css?family=Noto+Sans+KR:300,400,500,700,900&display=swap" rel="stylesheet"></link>
            <link rel="stylesheet" href="https://highlightjs.org/static/demo/styles/a11y-dark.css" />
            
            </Head>
            
            <AppLayout>
                <Component {...pageProps}/>
            </AppLayout>   
        </Provider>
        </>
    );
};

Ability.propTypes = {
    Component:PropTypes.elementType.isRequired,
    store:PropTypes.object.isRequired,
    pageProps: PropTypes.object.isRequired,
};

Ability.getInitialProps = async (context) =>{
    const {ctx, Component} = context;
    let pageProps = {};
   
    if(Component.getInitialProps){
        pageProps = await Component.getInitialProps(ctx) || {};
    }
    
    return {pageProps};
 
};

const configureStore = (initialState, options) => {
    const sagaMiddleware = createSagaMiddleware();
    const middlewares = [sagaMiddleware];
    const enhancer = process.env.NODE_ENV === 'production'
      ? compose(applyMiddleware(...middlewares))
      : compose(
        applyMiddleware(...middlewares),
        !options.isServer && typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
      );
    const store = createStore(reducer, initialState, enhancer);
    store.sagaTask = sagaMiddleware.run(rootSaga);
    return store;
  };
  
  export default withRedux(configureStore)(withReduxSaga(Ability));