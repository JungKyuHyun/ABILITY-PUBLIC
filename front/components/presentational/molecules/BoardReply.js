import React, {useState, useCallback, useEffect} from 'react';
import {Card ,InputGroup,FormControl,Col,Row,Form} from 'react-bootstrap';
import {UserImageComponent2} from "../atoms/UserImageComponent";
import {AbilityComponent} from '../atoms/AbilityComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReply } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import axios from 'axios';
import TimeAgo from 'react-timeago';
import ko from 'react-timeago/lib/language-strings/ko';
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter';
import swal from 'sweetalert';
import RecommendComment from './RecommandComment';
import dynamic from 'next/dynamic';
import { ButtonComponent } from '../atoms/ButtonComponent';
import Highlight from 'react-highlight';
const formatter = buildFormatter(ko);
const CkeditorOne2 = dynamic(() =>import('../atoms/CkeditorOne2'),{
    ssr : false
});

/**
 * @author 정규현
 * @summary props 값: content: 답변 본문, img: 답변이 프로필 이미지, nickname:답변이 닉네임,ability:답변이 능력치,date:답변쓴 시간
 *          ,userid = 답변이 userid
 */

const imgCss={
    padding:'0',
    borderRadius:"50%",
    width:"30px",
    height:"30px",
    marginRight:"0.5rem"
};

const BoardReply = (props) => {
    const [comment ,setComment] = useState("");
    const [commentList, setCommentList] = useState([]);
    const [commentReset, setCommentReset] =useState(0);
    const [beforeReply, setBeforeReply] = useState("");
    const [isModify, setIsModify] = useState(false);

useEffect(()=>{
    getComment();
},[commentReset]);

useEffect(()=>{
    setBeforeReply(props.content);
},[]);

const backUrl = process.env.NODE_ENV === 'production'? "?" : "?";

const getComment = useCallback(()=>{
    axios.get(backUrl+"/community/detail/comment",{
        params:{
            replyid:props.replyid
        }
    })
    .then((res)=>{
        setCommentList(res.data);
    })
    .catch((res)=>{
        console.log(res);
    })
},[commentList]);

const onChangeComment = useCallback((e) =>{
    setComment(e.target.value);
},[comment]);

const onKeyPressComment = useCallback((e)=>{
    
    if(e.charCode == 13){
        if(localStorage.getItem('userid') == null || localStorage.getItem('userid') == ""){
            swal("로그인한 사용자만 댓글을 작성할 수 있습니다.");
            return;
        }else if(comment.trim().length<3){
            swal("(공백 제외) 3글자 이상 댓글을 작성해야 합니다.");
            return;
        }
        axios.get(backUrl,{
            params:{
                replyid:props.replyid,
                userid:localStorage.getItem('userid'),
                comment:comment
            }
        })
        .then(()=>{
            setComment("");
            getComment();
        })
        .catch((res)=>{
            console.log(res);
        })
    }
    
},[comment]);


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
                    swal("댓글이 삭제 되었습니다.");
                    setCommentReset(commentid);
                }else{
                    swal("[Error0577] 댓글 삭제 실패");
                }
            })
            .catch((res)=>{
                console.log("오류발생",res);
            })
        }
     })
},[commentReset]);

const onClickReplyModify= useCallback((id, content)=>{
    swal({
        text: `기존 댓글: ${content}`,
        title: "댓글 수정(250글자 이내)",
        content: "input",
        icon: "/static/image/Logo2.png",
        buttons:["취소","수정"],
      })
      .then((value) => {
        if(value.length<3){
            swal("댓글은 3글자 이상 입력 가능합니다.");
        }else if(value.length>250){
            swal("댓글은 250글자 이하 입력 가능합니다.");
        }else{
            axios.get(backUrl,
            {
                params:{
                    commentid:id,
                    content:value
                }
            })
            .then((res)=>{
                swal("수정 성공");
                setCommentReset(value);
            })
            .catch((res)=>{
                console.log("실패",res);
            })
        }
      })
      .catch(()=>{
          return;
      });

},[commentReset]);

const onClickModify = useCallback(() =>{
    setIsModify(true);
},[isModify]);

const onChangeCkeditor = useCallback((e)=>{
    setBeforeReply(e.editor.getData());
    
},[beforeReply]);

const onClickModifyOk = useCallback(()=>{
    setIsModify(false);
   
    axios.post(backUrl,
    {
        seq:props.replyid,
        content:beforeReply
    })
    .catch((res)=>{
        console.log("실패",res);
    })
},[isModify,beforeReply]);

const onClickModifyCancel = useCallback(()=>{
    setIsModify(false);
},[isModify]);

const onClickReplyDelete = useCallback(()=>{
    swal({
        text: "삭제한 게시물은 절대 복구할 수 없습니다. 게시물을 정말 삭제하시겠습니까?",
        title: "삭제 경고",
        icon: "/static/image/Logo2.png",
        buttons: true
     })
     .then((deleteok)=>{
        if(deleteok){
            let Forms = new FormData();
            Forms.append("seq",props.replyid);
             axios({
                method :'put',
                baseURL : backUrl,
                data : Forms
            }).then((res)=>{
                if(res.data=="success"){
                    swal("게시물이 삭제 되었습니다.");
                    props.benchmark(1);
                }else{
                    swal("[Error0577] 답변 게시물 실패");
                }
            })
            .catch((res)=>{
                console.log("오류발생",res);
                    })
                }
            })
        },[]);

const GetCommentList = useCallback(() =>{
    if(commentList){
        const DefineCommentList = commentList.map((DefineComment)=>
                <div key={DefineComment.id}>
                <Row style={{marginBottom:"0.3rem"}}>
                     <Col md={10}>
                        <div style={{marginLeft:"3rem"}}>&nbsp;
                      {DefineComment.comment_content}
                            &nbsp;&nbsp;&nbsp;
                            <i> - <small> 
                                <Link href={{pathname:"/developer/page",query:{userid:DefineComment.userid}}}>
                                    <a>{DefineComment.nick_name}</a>
                                </Link>    
                                </small>
                            </i>&nbsp;&nbsp;
                            <small>
                                <AbilityComponent val={DefineComment.reputation}/>
                            </small>&nbsp;&nbsp;
                            <i>
                                <small>({DefineComment.date_created} 작성)</small>
                            </i>
                        </div>
                    </Col>
                    <Col md={2}>
                        <div style={{marginRight:"0.3rem",marginBottom:"0.3rem"}}>
                            <RecommendComment commentid={DefineComment.id} userid={DefineComment.userid} count={DefineComment.counta}/>
                        </div> 
                {  props.userid == localStorage.getItem("userid")?    
                    <>           
                    <span style={{color:"#F79F1F",marginRight:"0.3rem"}} onClick={()=>onClickReplyCommentDelete(DefineComment.id)}>
                            <small style={{cursor:"pointer"}}><b>[삭제]</b></small>
                        </span>  
                        <span style={{color:"#0652DD"}} onClick={()=>onClickReplyModify(DefineComment.id, DefineComment.comment_content)}>
                            <small style={{cursor:"pointer"}}><b>[수정]</b></small>
                        </span> 
                    </>
                    : ""
                    }

                    </Col>
                </Row>
                <hr style={{width:"95%"}}/>
                </div>    
        );
        return(
            <>
                <hr style={{width:"95%"}}/>
                    {DefineCommentList}
            </>
        );
    }else{
        return(
           ""
        );
    };
},[commentList]);

    return (
        <Card>
            <Card.Header className="text-muted text-right" style={{padding:"0 1rem!important"}}>
                <UserImageComponent2 imagepath={props.img} css={imgCss}/>
                    <Link href={{pathname:"/developer/page",query:{userid:props.userid}}}>
                        <a>{props.nickname}</a>
                    </Link> &nbsp; 
                <AbilityComponent val={props.ability}/> 
                <i style={{marginRight:"0.5rem",marginLeft:"0.5rem"}}>
                    <TimeAgo date={props.date} formatter={formatter} />
                </i>
           { props.userid == localStorage.getItem("userid")   ?
               <>
                    <span style={{color:"#F79F1F",marginRight:"0.3rem"}} onClick={onClickReplyDelete}>
                        <b>[삭제]</b>
                    </span> 
                {!isModify ?     
                    <span style={{color:"#0652DD"}} onClick={onClickModify}>
                        <b>[수정]</b>
                    </span>  
                :
                " "
                }  </>: "" }
            </Card.Header>
            {isModify 
                    ?
                    <>
                        <CkeditorOne2 onChange={onChangeCkeditor} data={beforeReply}/>
                        <div className="text-right" style={{marginRight:"0.5rem"}}>
                          <ButtonComponent name="취소" css={{marginTop:"0.3rem",marginRight:"0.3rem"}} onclick={onClickModifyCancel} variant="info"/>
                          <ButtonComponent name="답변 수정" css={{marginTop:"0.3rem"}} onclick={onClickModifyOk}/>
                        </div>
                    </>
                    :" " }
            <Card.Body>
                <Card.Text style={{minHeight:"5rem",paddingTop:"0.5rem"}}>
                    <Highlight innerHTML={true}>
                        {beforeReply}
                    </Highlight>
                </Card.Text>
                    <GetCommentList editorable="true"/>
                <br/>
                <Form.Group>
                    <InputGroup className="mb-3" >
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon1">
                                <FontAwesomeIcon icon={faReply}/>    
                            </InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            placeholder={localStorage.getItem('userid') == null?"댓글은 로그인 후 이용 가능합니다.":"댓글을 입력하세요"}
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            onChange={onChangeComment}
                            onKeyPress={onKeyPressComment}
                            value={comment}
                            maxLength="250"
                            readOnly={localStorage.getItem('userid') == null?true:false}
                        />
                    </InputGroup>
                </Form.Group>
            </Card.Body>
        </Card>
    );
};
 
export default BoardReply;