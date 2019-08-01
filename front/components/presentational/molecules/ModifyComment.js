import React, {useState, useCallback, useEffect} from 'react';
import axios from 'axios';
import {AbilityComponent} from '../atoms/AbilityComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReply,faThumbsUp,faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import {Badge} from 'react-bootstrap';

/**
 * @author 정규현 
 * @param {*} props 
 */

const inputCss = {
    borderRadius:"10px",
    border:"1px solid #5F4B8B",
    padding:"0.3rem",
    marginRight:"0.5rem"
};

const ModifyComment = (props) =>{
    const [isModify, setIsModify] = useState(false);
    const [modifyComment, setModifyComment] = useState("");

    useEffect(()=>{
        setModifyComment(props.modifyComment);
    },[])

    const onClickReplyModifyOk = useCallback((e)=>{
        setIsModify(false);
    },[isModify]);


    const onChangeModifyComment = useCallback((e) =>{
        setModifyComment(e.target.value);
    },[modifyComment]);

    
    const backUrl = process.env.NODE_ENV === 'production'? "?" : "?";

    const onClickReplyCommentDelete = useCallback((commentid)=>{
        swal({
            text: "삭제한 댓글은 절대 복구할 수 없습니다. 댓글을 정말 삭제하시겠습니까?",
            title: "삭제 경고",
            icon: "/static/image/Logo2.png",
            buttons: true
         })
         .then((deleteok)=>{
            if(deleteok){
                axios.get(backUrl,
                {
                    params:{
                        seq:commentid
                    }
                })
                .then((res)=>{
                    if(res.data=="success"){
                        swal("답변이 삭제 되었습니다.");
                        setCommentReset(commentid);
                    }else{
                        swal("[Error0577] 답변 삭제 실패");
                    }
                })
                .catch((res)=>{
                    console.log("오류발생",res);
                })
            }
         })
    },[]);

    return(
        <>
            {props.isModify
            ?
            <>
                <input style={inputCss} type={"string"}
                        value={props.data.comment_content}
                        onChange={onChangeModifyComment}
                />
                
                <span style={{color:"#F79F1F",marginRight:"0.3rem"}} onClick={onClickModifyCancel}>
                    <small><b>[취소]</b></small>
                </span>  
                <span style={{color:"#0652DD"}} onClick={onClickReplyModifyOk}>
                    <small><b>[수정 완료]</b></small>
                </span> 
            </>
            :
            
            <>
            <Col md={10}>
                        <div style={{marginLeft:"3rem"}}>&nbsp;
                         {props.data.comment_content}
                         
                            &nbsp;&nbsp;&nbsp;
                            <i> - <small> 
                                <Link href={{pathname:"/developer/page",query:{userid:props.data.userid}}}>
                                    <a>{props.data.nick_name}</a>
                                </Link>    
                                </small>
                            </i>&nbsp;&nbsp;
                            <small>
                                <AbilityComponent val={props.data.reputation}/>
                            </small>&nbsp;&nbsp;
                            <i>
                                <small>({props.data.date_created} 작성)</small>
                            </i>
                        </div>
                    </Col>
                    <Col md={2}>
                        <div style={{marginRight:"0.3rem",marginBottom:"0.3rem"}}>
                            <span onClick={onClickCommentPlus}>
                                <Badge variant="primary" style={{marginRight:"0.5rem",backgroundColor:"#5F4B8B"}}>
                                    <FontAwesomeIcon style={{width:"10px",height:"auto"}} icon={faThumbsUp}/>
                                </Badge>
                            </span>
                                {props.data.counta}
                            <span onClick={onClickCommentMinus}>
                                <Badge variant="secondary" style={{marginLeft:"0.5rem"}}>
                                    <FontAwesomeIcon style={{width:"10px",height:"auto"}} icon={faThumbsDown}/>    
                                </Badge>
                            </span>
                        </div> 
                        <span style={{color:"#F79F1F",marginRight:"0.3rem"}} onClick={()=>onClickReplyCommentDelete(props.data.id)}>
                            <small><b>[삭제]</b></small>
                        </span>  
                        <span style={{color:"#0652DD"}} onClick={()=>setIsModify(true)}>
                            <small><b>[수정]</b></small>
                        </span> 

                    </Col>
                </>
            }
        </>
    );
};

export default ModifyComment;