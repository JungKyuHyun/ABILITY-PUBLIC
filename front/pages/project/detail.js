import React, {useCallback, useState, useEffect} from 'react';
import {Col,Row, Container} from 'react-bootstrap';
import dynamic from 'next/dynamic';
import { TitleAndButtonComponent } from '../../components/presentational/atoms/TitleComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLaptopCode } from '@fortawesome/free-solid-svg-icons';
import {ButtonComponent} from '../../components/presentational/atoms/ButtonComponent';
import Router from 'next/router'; 
import axios from 'axios';
import swal from 'sweetalert';
import ReplyList from '../../components/presentational/molecules/ReplyList';
import { ProjectDetail, ProjectTitle2, Content } from '../../components/presentational/molecules/ProjectDetails';



/**
 * @autho 신선하
 * @summary 비디오 게시판 상세보기 페이지
 */

const CkeditorOne2 = dynamic(() =>import('../../components/presentational/atoms/CkeditorOne2'),{
    ssr : false
});

const Detail = () => {
    const [seq, setSeq] = useState(0);
    const [content, setContent] = useState("");
    const [boardid, setBoardid] = useState(0);
    const [likecount, setLikecount] = useState(0);
    const [nickname, setNickname] = useState("");
    const [replycount, setReplycount] = useState(0);
    const [reputation, setReputation] = useState(0);
    const [tags, setTags] = useState("");
    const [title, setTitle] = useState("");
    const [userImage, setUserImage] = useState("");
    const [userid, setUserid] = useState(0);
    const [viewCount, setViewCount] = useState(0);
    const [dateCreated, setDateCreated] = useState(0);
    const [replyList, setReplyList] = useState([]);
    const [totalReply, setTotalReply] =useState(0);
    const [reply, setReply] = useState("<p></p>");
    const [currentUserId, setCurrentUserId] = useState(0);
    const [file_path, setFile_path] = useState(0);
    
    const backUrl = process.env.NODE_ENV === 'production'? "?" : "?";

    useEffect(()=>{
        setSeq(Router.query["seq"]);
        axios.get(
            backUrl+"/project/detail",
            {
                params:{
                    seq: Router.query["seq"]
                }
            }
        )
        .then((res)=>{
            setBoardid(res.data.id);
            setContent(res.data.content);
            setLikecount(res.data.likecount);
            setNickname(res.data.nick_name);
            setReplycount(res.data.replycount);
            setReputation(res.data.reputation);
            setTags(res.data.tags);
            setFile_path(res.data.file_path);
            setTitle(res.data.title);
            setUserImage(res.data.user_image);
            setUserid(res.data.userid);
            setViewCount(res.data.view_count);
            setDateCreated(res.data.date_created);
            setCurrentUserId(localStorage.getItem("userid"));
        })
        .catch((res)=>{
            console.log(res);
        })
    },[]);

    useEffect(()=>{
        axios.get(backUrl,
        {
          params:{
            seq:Router.query["seq"]
          }
        })
        .then((res)=>{
            setTotalReply(res.data.length);
            setReplyList(res.data);
        })
        .catch((res)=>{
            console.log(res);
        })
    },[totalReply]);

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
        axios.get(backUrl+"/project/detail/recommand",
        {
            params:{
                seq:Router.query["seq"],
                userid:localStorage.getItem('userid'),
                counta:num
            }
        })
        .then((res)=>{
            if(res.data =="success"){
                swal({
                    text: num == 1?"글을 추천 했습니다.":"글을 비추천 했습니다.",
                    title: num == 1?"능력 +1":"능력 -1",
                    timer: "5000",
                    icon: "/static/image/Logo2.png",
                });
                setLikecount(num == 1? likecount+1 : likecount-1);
            }else if(res.data=="plus"){
                swal({
                    text: num == 1?"글을 추천 했습니다.":"글 추천을 취소 했습니다.",
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
                    text: "이미 투표한 글입니다. 투표 내역을 삭제 하시겠습니까?",
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
    
    const onClickDelte = useCallback(()=>{
        swal({
            text: "삭제한 게시물은 절대 복구할 수 없습니다. 게시물을 정말 삭제하시겠습니까?",
            title: "삭제 경고",
            icon: "/static/image/Logo2.png",
            buttons: true
         })
         .then((deleteok)=>{
            if(deleteok){
                axios.get(backUrl+"/project/detail/delete",
                {
                    params:{
                        seq:Router.query["seq"]
                    }
                })
                .then((res)=>{
                    if(res.data=="success"){
                        swal({
                            title: "삭제 완료",
                            text: "능력치가 -3 떨어졌습니다",
                            icon: "/static/image/Logo2.png",
                        });
                    }else{
                        swal("[Error0577] 게시물이 삭제 실패");
                    }
                    
                    Router.push("/project/board");
                })
                .catch((res)=>{
                    console.log("오류발생",res);
                })
            }
         })
    },[]);

    const onClickUp = useCallback(() =>{
        setRecommandMain(1);
    },[likecount]);

    const onClickDown = useCallback(()=>{
        setRecommandMain(-1);
    },[likecount]);

    const onChangeCkeditor = useCallback((e)=>{
        setReply(e.editor.getData());
    },[reply]);

    const handleBench = (data) =>{
        setTotalReply(totalReply-data);
    };

    const onClickReplyRegister = useCallback(() =>{
        if(reply.trim().replace(/[&nbsp;]|[\s]/gi,"") !== "<></>" && currentUserId !=0){
            axios.get(
                backUrl+'/project/detail/replyok',
                {
                    params:{
                        userid:currentUserId,
                        reply:reply,
                        seq:seq
                    }
                },
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    }
                }
            )
            .then((res)=>{
                setTotalReply(totalReply+1);
                setReply(<p></p>);
            })
            .catch((res)=>{
                console.log(res);
            })
        }else{
            swal({
                text: "답변 내용을 입력해 주세요.",
                title: "답변 등록 실패",
                timer: "10000",
                icon: "/static/image/Logo2.png"
             });
        }
    },[reply,currentUserId,seq]);

    return (
        <>
        <Container>
            <TitleAndButtonComponent 
                title="프로젝트 게시판" 
                name="영상 올리기" 
                path='/project/write'>
                <FontAwesomeIcon 
                    style={{width:"35px",height:"auto"}} 
                    icon={faLaptopCode}/>                          
            </TitleAndButtonComponent> 

            <ProjectTitle2 
                title={title} 
                onclick3={onClickDelte} 
                tags={tags} 
                boardid={seq} 
                seq={seq} 
                viewcount={viewCount}
                userid={userid}
                currentUserId={currentUserId}
                />

            <hr style={{marginTop:"0.5rem"}}/>
            
            <ProjectDetail 
                content={content} 
                nickname={nickname} 
                userid={userid} 
                ability={reputation} 
                imagepath={userImage}
                file_path={file_path}
                date={dateCreated} 
                count={likecount}
                onClickUp={onClickUp} 
                onClickDown={onClickDown} 
                
                /><br/>
            <ReplyList 
                replyList={replyList} 
                totalReply={totalReply} 
                benchmark={handleBench}
                />
            
            <Row style={{marginBottom:"4rem"}}>
                <Col md={11} style={{paddingRight:"0"}}>
                    <div style={{backgroundColor:"rgba(0,0,0,.03)",
                                 padding:"0.75rem 1.25rem",
                                 border:"1px solid #c6badf"}}>
                    {currentUserId==0 || currentUserId==null ?
                    "로그인 후 답변 기능을 사용할 수 있습니다.":
                    "명쾌한 답변으로 질문자의 능력을 향상 시켜주세요!"}
                    </div>
                    {currentUserId==0 || currentUserId==null ? "":
                        (<>
                            <CkeditorOne2 
                                onChange={onChangeCkeditor} 
                                data={reply}
                                />
                            <div className="text-right" 
                                 style={{marginTop:"0.8rem",
                                        marginBottom:"1rem", 
                                        marginRight:"0.4rem"}}>
                                <ButtonComponent 
                                    variant="info" 
                                    name="목록가기" 
                                    onclick={()=>Router.push("/project/board")} 
                                    />&nbsp;&nbsp;&nbsp;
                                <ButtonComponent 
                                    name="등록하기" 
                                    onclick={onClickReplyRegister}
                                    />
                            </div>
                        </>
                        )}
                </Col>  
            </Row>
        </Container>
        </>
    );
};

export default Detail;