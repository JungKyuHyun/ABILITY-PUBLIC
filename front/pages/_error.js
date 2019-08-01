import React from 'react';
import ErrorPage from '../components/container/templatses/ErrorPage';
import PropTypes from 'prop-types';

/**
 * @author 정규현
 * @summary 에러페이지 커스텀 처리 + 서버사이드 렌더링
 */

const PageError = ({statusCode}) => {
    
    return (
        <ErrorPage errorNum={statusCode}/>
    );
};

PageError.prototype = {
    statusCode: PropTypes.number,
};

PageError.defaultProps = {
    statusCode: 400,
};

PageError.getInitialProps = async ( context ) => {
    const statusCode = context.res ? context.res.statusCode : context.err ? context.err.statusCode : null;
    return {statusCode}
};

export default PageError;