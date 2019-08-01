import React, { useState,useCallback,useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import ProfileImageUserid from '../../components/presentational/molecules/ProfileImageUserid';
import { ButtonComponent } from '../../components/presentational/atoms/ButtonComponent';
import axios from 'axios';
import Router from 'next/router';
import dynamic from 'next/dynamic';
import TitleComponent from '../../components/presentational/atoms/TitleComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLaptopCode } from '@fortawesome/free-solid-svg-icons';
import { InputLabelText, InputLabelDefault } from '../../components/presentational/atoms/ProjectInput';

/**
 * @auth 신선하
 * @summary 글쓰기 수정 페이지(퀘스찬 보드 가져옴)
 */

const CkeditorOne2 = dynamic(() =>import('../../components/presentational/atoms/CkeditorOne2'),{
    ssr : false
});

const cardcss = {
    margin: "0px",
    padding: "0px"
};

const Modify = ()=> {
    const [seq, setSeq] = useState(0);
    const [title, setTitle] = useState("");
    const [tags, setTags] = useState("");
    const [data, setData] = useState('<p></p>');
    const [content, setContent] = useState("");
    const [nick_name, setNick_name] = useState("");
    const [user_image, setUser_image] = useState("");
    const [file_path, setFile_path] = useState("");

    const backUrl = process.env.NODE_ENV === 'production'? "?" : "?";

    useEffect(()=> {
        setSeq(Router.query['seq']);
        setNick_name(localStorage.getItem("nick_name"));
        setUser_image(localStorage.getItem("user_image"));
        

        const endPoint = backUrl;
        axios.get(endPoint, {
            params: {
                seq: Router.query['seq']
            }
        })
        .then((res)=> {
            setTitle(res.data.title);
            setTags(res.data.tags);
            setTitle(res.data.title);
            setContent(res.data.content);            
            setFile_path(res.data.file_path);
            setData(res.data.content);
        });
    },[]);

    const onChangeCk=useCallback((e)=>{
        setData(e.editor.getData());
    },[data]);

    const onChangetitle=useCallback((e)=>{
        setTitle(e.target.value)
    },[title]);

    const onChangetags=useCallback((e)=>{
        setTags(e.target.value);
    },[tags]);

    const onChangeFile_path=useCallback((e)=>{
        setFile_path(e.target.value);
    },[file_path]);

    const onClickSubmit = useCallback(() => {
  
        const regex = /^[ㄱ-ㅎ가-힣a-zA-Z0-9,-\s]+$/;
        if((tags.substr.length -1)==!regex){
            tags.substr.length.replace(tags.substr.length -1, "")
        }

        if(title !== "" && data !== ""){
            let Forms = new FormData();
            Forms.append("seq",seq);
            Forms.append("title",title);
            Forms.append("content",data);
            Forms.append("tags",tags);
            Forms.append("file_path",file_path);
             axios({
                method :'put',
                baseURL : backUrl,
                data : Forms
                
            }).then((res)=>{
                if (res.data > 0) {
                    Router.push('/project/detail?seq='+seq);
                } else {
                    alert("수정 실패");
                }
            });
        }else{
            alert("공백은 작성 불가능합니다.");
            return;
         }
    },[seq,title,data,tags,file_path]);
    
    return (
    <>
    <Container>                        
            <form action="" method="post">        
                <TitleComponent title="프로젝트 자랑">
                    <FontAwesomeIcon 
                        style={{width:"35px", height:"auto"}} 
                        icon={faLaptopCode}/>
                </TitleComponent>
            <hr/><br/>
            <Row>                
            <div className="col-11">
                <InputLabelDefault 
                    label="제목"
                    id="title" 
                    value={title}
                    onChange={onChangetitle}
                    maxLength="66" 
                    />                
                <InputLabelText
                    label="유튜브 비디오ID"
                    text="https://www.youtube.com/watch?v="
                    id="youtubeId"
                    value={file_path}
                    onChange={onChangeFile_path} 
                    maxLength="30"
                    />                
                <InputLabelDefault 
                    label="태그"
                    id="tags"
                    value={tags}
                    onChange={onChangetags} 
                    maxLength="60"
                    />
                <CkeditorOne2 
                    id="content" 
                    data={data} 
                    onChange={onChangeCk} 
                    maxLength="1000"
                    />
                    <hr />
                <ProfileImageUserid 
                    style={cardcss} 
                    user_image={user_image} 
                    writer={nick_name} 
                    /><br/>                    
            </div>                    
            <div className="col-11" style={{textAlign:'right'}}><br/>
                <ButtonComponent 
                    name="취소" 
                    variant="secondary" 
                    css={{marginRight:"7px"}}
                    />
                <ButtonComponent 
                    name="수정"                             
                    onclick={onClickSubmit} 
                    />                        
            </div>
        </Row>                
        </form>                      
    </Container>    
    </>
    );    
}
export default Modify;