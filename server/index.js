const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const dotenv = require('dotenv');

const userAPIRouter = require('./routes/user');
const postAPIRouter = require('./routes/post');
const companyAPIRouter = require('./routes/company');

/**
 * @author 정규현
 * @summary 익스 프레스 및 기본 설정들(미들웨어)
 */

 dotenv.config();
const app = express();

passportConfig();

app.use(morgan('dev'));
app.use('/',express.static('uploads'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({
    origin:true,
    credentials:true,
}));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(expressSession({
    resave:false,
    saveUninitialized:false,
    secret:process.env.COOKIE_SECRET,
    cookie:{
        httpOnly:true,
        secure:false, //https를 쓸때 true
    },
    name:'masterjung'
}));


app.use('/api/user', userAPIRouter);
app.use('/api/post', postAPIRouter);
app.use('/api/company', companyAPIRouter);


app.listen(process.env.NODE_ENV === 'production' ? process.env.PORT : 9208, ()=>{
    console.log(`server is running on ${process.env.PORT}`);
});