import React, {useCallback, useEffect, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import {Badge} from 'react-bootstrap';

/**
 * @author 정규현
 * @summary 추천/비추천 
 */

const backUrl = process.env.NODE_ENV === 'production'? "?" : "?";


const RecommendComment = (props) => {
    const [likecount, setLikecount] = useState(0);
   
    const setRecommandMain = useCallback((num)=>{
         if(!localStorage.getItem('userid')){
            swal({
                text: "추천/비추천 기능은 로그인 후 이용이 가능합니다..",
                title: num == 1?"추천 실패":"비추천 실패",
                timer: "10000",
                icon: "/static/image/Logo2.png"
                });
                return;
        }
        axios.get(backUrl,
        {
            params:{
                seq:props.commentid,
                userid:localStorage.getItem('userid'),
                counta:num
            }
        })
        .then((res)=>{
            if(res.data =="success"){
                swal({
                    text: num == 1?"댓글을 추천 했습니다.":"댓글을 비추천 했습니다.",
                    timer: "5000",
                    icon: "/static/image/Logo2.png",
                });
                setLikecount(num == 1? likecount+1 : likecount-1);
            }else if(res.data=="plus"){
                swal({
                    text: num == 1?"댓글을 추천 했습니다.":"댓글을 비추천 했습니다.",
                    timer: "5000",
                    icon: "/static/image/Logo2.png",
                });
                setLikecount(likecount-1);
            }else if(res.data=="minus"){
                swal("비추천 내역이 삭제 되었습니다.");
                setLikecount(likecount+1);
            }else{
                swal({
                    text: "이미 투표한 댓글입니다. 투표 내역을 삭제 하시겠습니까?",
                    title: num == 1?"추천 실패":"비추천 실패",
                    icon: "/static/image/Logo2.png",
                    buttons: true
                    })
                    .then((cancelok)=>{
                    if(cancelok){
                        setRecommandMain(0);
                    }
                    })
            }
        })
        .catch((res)=>{
            console.log(res);
        })
    },[likecount]);

    useEffect(()=>{
        setLikecount(props.count);
        setReplyid(props.commentid);
        setUserid(props.userid);
    },[]);

    const onClickUp = useCallback(() =>{
        setRecommandMain(1);
    },[likecount]);

    const onClickDown = useCallback(()=>{
        setRecommandMain(-1);
    },[likecount]);


    return (
        <>
            <span onClick={onClickUp}>
                <Badge variant="primary" style={{marginRight:"0.5rem",backgroundColor:"#5F4B8B"}}>
                    <FontAwesomeIcon style={{width:"10px",height:"auto"}} icon={faThumbsUp}/>
                </Badge>
            </span>
                {likecount}
            
        </>
    );
};

export default RecommendComment;