import React, { useState,useEffect,useCallback } from 'react';
import { Container, Row } from 'react-bootstrap';
import { ButtonComponent } from '../../components/presentational/atoms/ButtonComponent';
import axios from 'axios';
import Router from 'next/router';
import dynamic from 'next/dynamic';
import TitleComponent from '../../components/presentational/atoms/TitleComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLaptopCode } from '@fortawesome/free-solid-svg-icons';
import { InputLabelDefault, InputLabelText, InputLabelTextarea } from '../../components/presentational/atoms/ProjectInput';
import ProfileImageUserid from '../../components/presentational/molecules/ProfileImageUserid';
import swal from 'sweetalert';

const CkeditorOne2 = dynamic(() =>import('../../components/presentational/atoms/CkeditorOne2'),{
    ssr : false
});

/**
 * @auth 신선하
 * @summary 글쓰기 상세 페이지
 */

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
    const [content, setContent] = useState("");
    const [file_path, setFile_path] = useState("");

    useEffect(()=>{
        setUserid(localStorage.getItem('userid'));
        setIsUserimage(localStorage.getItem('user_image'));
        setNickname(localStorage.getItem('nick_name'));
    },[])

    const onChangeTitle = useCallback((e)=>{
        setTitle(e.target.value);
    },[title]);

    const onChangeFile_path = useCallback((e) => {
        setFile_path(e.target.value);
    },[file_path]);

    const onChangeTags = useCallback((e) => {
        setTags(e.target.value);
    },[tags]);    

    const onChangeCK = useCallback((e) =>{
        setContent(e.editor.getData());
    },[content]);

    const onSubmit = useCallback((e)=> {
        e.preventDefault();
        if(!localStorage.getItem('userid')){
            swal({
                text: "글쓰기 권한이 없습니다.",
                title: "권한 없음",
                timer: "10000",
                icon: "/static/image/Logo2.png"
             });
            Router.push("/user/login");
            return;
        };
        const contentEndPoint = process.env.NODE_ENV === 'production'? "?" : "?";
  
        if(title == null || title == "" || title == undefined || !title.trim().length>0){
            swal({
                text: "제목을 입력해주세요.",
                title: "필수 입력 사항",
                timer: "10000",
                icon: "/static/image/Logo2.png"
             });
            return;
        }

        if(file_path == null || file_path == "" || file_path == undefined || !file_path.trim().length>0){
            swal({
                text: "비디오id를 입력해주세요.",
                title: "필수 입력 사항",
                timer: "10000",
                icon: "/static/image/Logo2.png"
             });
            return;
        }

        if(content == null || content == "" || content == undefined) {
            swal({
                text: "내용을 입력해주세요.",
                title: "필수 입력 사항",
                timer: "10000",
                icon: "/static/image/Logo2.png"
             });
            return;
        }
        const regex = /^[ㄱ-ㅎ가-힣a-zA-Z0-9,-\s]+$/;
        if(!regex.exec(tags) && tags!=null && tags!=""){
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
        Forms.append("file_path",file_path);
         axios({
            method :'post',
            baseURL : contentEndPoint,
            data : Forms
        }).then((res)=>{
            result = res.data;
            if(result > 0){
                swal({
                    title: "등록 성공",
                    text: "능력치가 +3 올랐습니다.",
                    icon: "/static/image/Logo2.png",
                });
                Router.push("/project/board");
            }else {
                alert("등록실패");
                Router.push("/project/board");
            }
        }).catch((res)=> {console.log(res)});
    },[userid,title,content,tags,file_path]);

    return(
        <>
        <Container>
        <TitleComponent title="영상 올리기">
            <FontAwesomeIcon 
                style={{width:"35px",height:"auto"}} 
                icon={faLaptopCode}
                />
        </TitleComponent>        
        <hr/><br/>
        <Row>
        <div className="col-11">
            <ProfileImageUserid 
                user_image={userImage} 
                style={cardcss} 
                writer={nickname} 
                /><br/>
            <InputLabelDefault 
                label="제목"
                id="title"
                placeholder="제목을 입력해주세요"
                onChange={onChangeTitle}  
                maxLength="66"
                />
            <InputLabelText
                label="유튜브 비디오ID"
                text="https://www.youtube.com/watch?v="
                id="file_path"
                placeholder="유튜브 비디오ID를 입력해주세요"
                onChange={onChangeFile_path}    
                maxLength="30"
                />            
            <InputLabelDefault 
                label="태그 "
                id="tag"
                placeholder="태그를 입력해주세요"
                onChange={onChangeTags}  
                maxLength="60"
                />
            <div style={{marginBottom:'8px'}}>
            상세설명
            </div>
            <CkeditorOne2 
                onChange={onChangeCK} 
                data="<p></p>"             
                />
            <br/><hr />
            </div>            
            <div className="col-11" style={{textAlign:'right'}}><br/>
            <ButtonComponent 
                name="취소" 
                variant="secondary" 
                css={{marginRight:"7px"}}
                onclick={()=>Router.push("/project/board")}
                />
            <ButtonComponent 
                name="등록"                             
                onclick={onSubmit} 
                />                        
            </div>
        </Row>
        </Container>
        </>
    );
}

export default Write;