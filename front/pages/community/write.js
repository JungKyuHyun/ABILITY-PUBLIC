import React, { useState,useEffect,useCallback } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ProfileImageUserid from '../../components/presentational/molecules/ProfileImageUserid';
import { InputText } from '../../components/presentational/atoms/InputboxComponent';
import { ButtonComponent } from '../../components/presentational/atoms/ButtonComponent'; 
import axios from 'axios';
import Router from 'next/router';
import dynamic from 'next/dynamic';
import TitleComponent from '../../components/presentational/atoms/TitleComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrow } from '@fortawesome/free-solid-svg-icons';
import swal from 'sweetalert';

const CkeditorOne2 = dynamic(() =>import('../../components/presentational/atoms/CkeditorOne2'),{
    ssr : false
});

/**
 * @auth 정규현
 * @summary 글쓰기 상세 페이지 
 */

const buttoncss = {
    textAlign: "right"
};

const cardcss={
    margin : "0px",
    padding : "0px"
};

const Write = () =>{
    const [userid,setUserid] = useState(0);
    const [userImage,setIsUserimage] = useState("");
    const [nickname, setNickname] = useState("");
    const [title, setTitle] = useState("");
    const [tags, setTags] = useState("");
    const [content, setContent] = useState("<p></p>");
    const [isLoding, setIsLoding] = useState(false);

    useEffect(()=>{
        setUserid(localStorage.getItem('userid'));
        setIsUserimage(localStorage.getItem('user_image'));
        setNickname(localStorage.getItem('nick_name'));
    },[])

    const onChangeTitle = useCallback((e)=>{
        setTitle(e.target.value);
    },[title]);

    const onChangeTags = useCallback((e) => {
        setTags(e.target.value);
    },[tags]);

    const onChangeCK = useCallback((e) =>{
        setContent(e.editor.getData());
    },[content]);
    
    const backUrl = process.env.NODE_ENV === 'production'? "?" : "?";


    const onSubmit = useCallback((e)=> {
        setIsLoding(true);
        e.preventDefault();
        if(!localStorage.getItem('userid')){
            setIsLoding(false);
            swal({
                text: "글쓰기 권한이 없습니다.",
                title: "권한 없음",
                timer: "10000",
                icon: "/static/image/Logo2.png"
             });
            Router.push("/user/login");
            return;
        } 

        if(title == null || title == "" || title == undefined || !title.trim().length>0){
            setIsLoding(false);
            swal({
                text: "제목을 입력해주세요.",
                title: "필수 입력 사항",
                timer: "10000",
                icon: "/static/image/Logo2.png"
             });
            return;
        }
        if(content == null || content == "" || content == undefined) {
            setIsLoding(false);
            swal({
                text: "답변을 입력해주세요.",
                title: "필수 입력 사항",
                timer: "10000",
                icon: "/static/image/Logo2.png"
             });
            return;
        }
        const regex = /^[ㄱ-ㅎ가-힣a-zA-Z0-9,-\s]+$/;
        if(!regex.exec(tags) && tags!=null && tags!=""){
            setIsLoding(false);
            swal({
                text: "태그는 [한글], [영문], [-]만 가능하며 콤마(,)로 구분됩니다.",
                title: "태그 오류",
                timer: "10000",
                icon: "/static/image/Logo2.png"
             });
            return;
        }
        
        let result = 0;

        let Forms = new FormData();
        Forms.append("userid",userid);
        Forms.append("title",title);
        Forms.append("content",content);
        Forms.append("tags",tags);
        axios({
            method :'post',
            baseURL : backUrl,
            data : Forms
        }).then((response)=>{
            setIsLoding(false);
            result = response.data;
            if(result > 0){
                result = response.data;
                swal({
                    title: "등록 성공",
                    text: "능력치가 +3 올랐습니다.",
                    icon: "/static/image/Logo2.png",
                });
                Router.push("/community/board");
            }else {
                    swal({
                        title: "등록 실패",
                        text: "글쓰기 양식에 맞지 않습니다.",
                        icon: "/static/image/Logo2.png",
                    });
                    Router.push("/community/board");
                }
       }).catch((xhr)=>{
            setIsLoding(false);
     });
    },[userid,title,content,tags]);

    return(
        <>
            <Container>
            <TitleComponent title="자유 게시판">
                <FontAwesomeIcon style={{width:"35px",height:"auto"}} icon={faCrow}/>                          
            </TitleComponent> 
                <Row>
                    <Col>
                        <ProfileImageUserid user_image={userImage} style={cardcss} writer={nickname} />
                        <InputText id="title" content="제목을 입력해주세요" onChange={onChangeTitle} maxLength="50"/>
                        <small style={{position:"absolute",left:"85%",top:"95px", color:"grey"}}>({title.length}/50)</small>
                        <InputText id="tags" content="태그를 입력해 주세요 (ex. mysql,java,뷰)" onChange={onChangeTags} maxLength="50"/>
                        <small style={{position:"absolute",left:"85%",top:"165px", color:"grey"}}>({tags.length}/50)</small>
                        <CkeditorOne2 onChange={onChangeCK} data="<p></p>" />
                        <hr />
                        <div style={buttoncss}>
                            <ButtonComponent name="취소" variant='info' onclick={()=>Router.push("/community/board")}/> &nbsp;&nbsp;
                            <ButtonComponent name="등록" onclick={onSubmit} disabled={isLoding}/>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Write;