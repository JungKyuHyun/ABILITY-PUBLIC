const express = require('express');
const next = require('next');
const morgan = require('morgan');
const cookiParser = require('cookie-parser');
const expressSession = require('express-session');
const dotenv = require('dotenv');
const path = require('path');

/**
 * @author 정규현
 * @summary 프론트 서버 init // public 배포용으로 변경
 */

const dev = process.env.NODE_ENV !== 'production';
const prod = process.env.NODE_ENV === 'production';

const app = next({dev});
const hadle = app.getRequestHandler();
dotenv.config();

app.prepare().then(()=>{
    const server = express();

    server.use(morgan('dev'));
    server.use('/', express.static(path.join(__dirname, 'public')));
    server.use(express.json());
    server.use(express.urlencoded({extended:true}));
    server.use(cookiParser(process.env.COOKIE_SECRET));
    server.use(expressSession({
        resave:false,
        saveUninitialized:false,
        secret: '',
        cookie:{
            httpOnly:true,
            secure:false,
        }
    }));

    server.get('*', (req, res) =>{
        return hadle(req, res);
    });

    server.listen(prod ? process.env.PORT : ?, () => {
        console.log(`next+express running on port ${process.env.PORT}`);
    });
});