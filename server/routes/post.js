const express = require('express');
const path = require('path');
const multer = require('multer');
const AWS = require('aws-sdk');
const multerS3 = require('multer-s3');


const router = express.Router();
const mysql = require('mysql');
const dbconfig = require('../config/config').development;
const connection = mysql.createConnection(dbconfig);
const ip = require('ip');
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
            cb(null, `original/${+new Date()}${path.basename(file.originalname)}`);
        },
    }),
    limits:{fileSize: 20*1024*1024}, 
 });

router.post('/', upload.array('image'), (req, res) =>{
    res.json(req.files.map(v=>v.location));
});

router.post('/', (req, res)=>{
    const sql = "insert into banner(title,banner_desc,connect_url,client,file_path) values ?";

    const values = [
        [req.body.title, req.body.desc, req.body.url,req.body.client, req.body.filepath]
    ];
    connection.query(sql,[values] ,(err, result)=>{
        if(err){
            console.log('my sql error : ' + err);
            res.send(err);
        }else {
            console.log('mysql is connected successfully'+ result.affectedRows);
        };

        res.send(result);
    });
});

router.post('/', (req, res)=>{
    const sql = "insert into banner_click(banner_id, ip) values ?";
    const values = [
        [req.body.id, ip.address()]
    ];
    
    connection.query(sql,[values] ,(err, result)=>{
        if(err){
            console.log('my sql error : ' + err);
            res.send(err);
        }else {
            console.log('mysql is connected successfully'+ result.affectedRows);
        };

        res.send(result);
    });
});