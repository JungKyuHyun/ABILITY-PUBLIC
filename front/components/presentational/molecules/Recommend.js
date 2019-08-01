import React, {useCallback, useEffect, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp,faCaretDown,faStar, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';


/**
 * @author  곽호원
 * @summary 추천수 컴포넌트 
 * @see 정규현 커스텀 2번 컴포넌트 만듬
 * @see 정규현 Recommend3 생성 // 이벤트 처리 
 * */
const backUrl = process.env.NODE_ENV === 'production'? "?" : "?";
const Recommend = (props) => {
    return (
        <>
        <div className="text-center" style={{verticalAlign:"middle"}}>
        <span onClick={props.onClickUp}>
            <FontAwesomeIcon style={{fontSize: "30px",color:"#c6badf"}} icon={faCaretUp}/>
        </span>
            <div style={{fontSize: "20px",color:"#5F4B8B"}}>{props.count}</div>
        <span onClick={props.onClickDown}>
            <FontAwesomeIcon style={{fontSize:"30px",color:"#c6badf"}} icon={faCaretDown}/>
        </span>
    </div>
    </>
    );
};

export const Recommend2 = (props) => {
    return (
        <>
        <div className="text-center" style={{verticalAlign:"middle"}}>
                <div style={{fontSize: "20px",color:"#5F4B8B"}}>{props.count}</div>
                
            <span name="plus" onClick={props.onClickUp}>
                <FontAwesomeIcon style={{fontSize: "24px",color:"#c6badf"}} icon={faThumbsUp}/>
            </span>
            
                <br/><br/> 
        </div>
        </>
    );
};

export const Recommend3 = (props) => {
    const [likecount, setLikecount] = useState(0);
   
    useEffect(()=>{
        setLikecount(props.count);
        setReplyid(props.replyid);
        setUserid(props.userid);
    },[]);

   

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
                seq:props.replyid,
                userid:localStorage.getItem('userid'),
                counta:num
            }
        })
        .then((res)=>{
            if(res.data =="success"){
                swal({
                    text: num == 1?"답변을 추천 했습니다.":"답변을 추천을 취소 했습니다.",
                    title: num == 1?"능력 +1":"능력 -1",
                    timer: "5000",
                    icon: "/static/image/Logo2.png",
                });
                setLikecount(num == 1? likecount+1 : likecount-1);
            }else if(res.data=="plus"){
                swal({
                    text: num == 1?"답변을 추천 했습니다.":"답변을 추천을 취소 했습니다.",
                    title: num == 1?"능력 +1":"능력 -1",
                    timer: "5000",
                    icon: "/static/image/Logo2.png",
                });
                setLikecount(likecount-1);
            }else if(res.data=="minus"){
                swal("비추천 내역이 삭제 되었습니다.");
                setLikecount(likecount+1);
            }else{
                swal({
                    text: "이미 투표한 답변입니다. 투표 내역을 삭제 하시겠습니까?",
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



    const onClickUp = useCallback(() =>{
        setRecommandMain(1);
    },[likecount]);

 
    return (
        <>
        <div className="text-center" style={{verticalAlign:"middle"}}>
            <div style={{fontSize: "16px",color:"#8a2be2"}} onChange={onChangeRecommend}> &nbsp;
            <span onClick={onClickUp}>
                <FontAwesomeIcon style={{fontSize: "16px",color:"#c6badf"}} icon={faThumbsUp}/>
            </span>
            &nbsp;&nbsp;{likecount}
            </div>
        </div>
        </>
    );
};

export const Recommend4 = (props) => {
    const [likecount, setLikecount] = useState(0);

   
    useEffect(()=>{
        setLikecount(props.count);
        setReplyid(props.replyid);
        setUserid(props.userid);
    },[]);

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
                seq:props.replyid,
                userid:localStorage.getItem('userid'),
                counta:num
            }
        })
        .then((res)=>{
            if(res.data =="success"){
                swal({
                    text: num == 1?"답변을 추천 했습니다.":"답변을 추천을 취소 했습니다.",
                    title: num == 1?"능력 +1":"능력 -1",
                    timer: "5000",
                    icon: "/static/image/Logo2.png",
                });
                setLikecount(num == 1? likecount+1 : likecount-1);
            }else if(res.data=="plus"){
                swal({
                    text: num == 1?"답변을 추천 했습니다.":"답변을 추천을 취소 했습니다.",
                    title: num == 1?"능력 +1":"능력 -1",
                    timer: "5000",
                    icon: "/static/image/Logo2.png",
                });
                setLikecount(likecount-1);
            }else if(res.data=="minus"){
                swal("비추천 내역이 삭제 되었습니다.");
                setLikecount(likecount+1);
            }else{
                swal({
                    text: "이미 투표한 답변입니다. 투표 내역을 삭제 하시겠습니까?",
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



    const onClickUp = useCallback(() =>{
        setRecommandMain(1);
    },[likecount]);


    return (
        <div className="text-center" style={{verticalAlign:"middle"}}>
            <div style={{fontSize: "16px",color:"#8a2be2"}} onChange={onChangeRecommend}> &nbsp;
            <span onClick={onClickUp}>
                <FontAwesomeIcon style={{fontSize: "16px",color:"#c6badf"}} icon={faThumbsUp}/>
            </span>
            &nbsp;&nbsp;{likecount}
            </div>
        </div>  
   );
};

export const Recommend5 = (props) => {
    const [likecount, setLikecount] = useState(0);
 
   
    useEffect(()=>{
        setLikecount(props.count);
        setReplyid(props.replyid);
        setUserid(props.userid);
    },[]);

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
                seq:props.replyid,
                userid:localStorage.getItem('userid'),
                counta:num
            }
        })
        .then((res)=>{
            if(res.data =="success"){
                swal({
                    text: num == 1?"답변을 추천 했습니다.":"답변을 비추천 했습니다.",
                    title: num == 1?"능력 +2":"능력 +1",
                    timer: "5000",
                    icon: "/static/image/Logo2.png",
                });
                setLikecount(num == 1? likecount+1 : likecount-1);
            }else if(res.data=="plus"){
                swal("추천 내역이 삭제 되었습니다.");
                setLikecount(likecount-1);
            }else if(res.data=="minus"){
                swal("비추천 내역이 삭제 되었습니다.");
                setLikecount(likecount+1);
            }else{
                swal({
                    text: "이미 투표한 답변입니다. 투표 내역을 삭제 하시겠습니까?",
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



    const onClickUp = useCallback(() =>{
        setRecommandMain(1);
    },[likecount]);

    const onClickDown = useCallback(()=>{
        setRecommandMain(-1);
    },[likecount]);

    const onChangeRecommend = (e)=>{
    }

    return (
        <div className="text-center" style={{verticalAlign:"middle"}}>
            
            <span onClick={onClickUp}>
                <FontAwesomeIcon style={{fontSize: "30px",color:"#c6badf"}} icon={faCaretUp}/>
            </span>
                <div style={{fontSize: "20px",color:"#5F4B8B"}} onChange={onChangeRecommend}>{likecount}</div>
            <span onClick={onClickDown}>
                <FontAwesomeIcon style={{fontSize:"30px",color:"#c6badf"}} icon={faCaretDown}/>
            </span>
        </div>
   );
};

export default Recommend;

