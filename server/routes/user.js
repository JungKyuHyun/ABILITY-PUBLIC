const express = require('express');
const passport = require('passport');

const path = require('path');
const multer = require('multer');
const AWS = require('aws-sdk');
const multerS3 = require('multer-s3');


const router = express.Router();
const mysql = require('mysql');
const dbconfig = require('../config/config').development;
const connection = mysql.createConnection(dbconfig);
module.exports = router;

/**
 * @author 정규현
 * @summary upload등을 처리하기 위한 라우터 
 */

 
AWS.config.update({
    region: 'ap-northeast-2',
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  });


 const upload = multer({
    storage: multerS3({
        s3:new AWS.S3(),
        bucket:'react-ability',
        key(req, file, cb){
            cb(null, `profile/${+new Date()}${path.basename(file.originalname)}`);
        },
    }),
    limits:{fileSize: 20*1024*1024}, 
 });

router.post('/', upload.array('image'), (req, res) =>{
    res.json(req.files.map(v=>v.location));
});

router.post('/', (req, res)=>{
    const sql = `update user 
                    set user_image=? 
                    where userid=?`;
    const data = [req.body.file, req.body.userid];
    connection.query(sql, data, (err, result)=>{
        if(err){
            console.log('my sql error : ' + err);
            res.send(err);
        }else {
            console.log('mysql is connected successfully'+ result.affectedRows);
        };

        res.send(result);
    });
});

