import React, {useState,useEffect,useCallback } from 'react';
import { Container } from 'react-bootstrap';
import ProfileImageUserid from '../../components/presentational/molecules/ProfileImageUserid';
import { InputText } from '../../components/presentational/atoms/InputboxComponent';
import { ButtonComponent } from '../../components/presentational/atoms/ButtonComponent';
import axios from 'axios'; 
import Router from 'next/router';
import dynamic from 'next/dynamic';
import swal from 'sweetalert';
import TitleComponent from '../../components/presentational/atoms/TitleComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
const CkeditorOne2 = dynamic(() =>import('../../components/presentational/atoms/CkeditorOne2'),{
    ssr : false
});
/**
 * 
 * @auth 곽호원 
 * @summary 글쓰기 상세 페이지
 * 
 * @auth 정진호
 * @version selectmenu 반복문처리했음
 */

const buttoncss = {
    textAlign: "right"
}

const cardcss={
    margin : "0px",
    padding : "0px"
}
const Write = () =>{

    const [isuserid,setIsUserid] = useState(0);
    const [isuserimage,setIsUserimage] = useState("");
    const [isnickname,setIsnickname] = useState("");
    const [data,setData] = useState("<p></p>");
    const [tag,setTag] = useState("");
    const [title,setTitle] = useState("");

    useEffect(()=> {
        setIsUserid(localStorage.getItem('userid'));
        setIsUserimage(localStorage.getItem('user_image'));
        setIsnickname(localStorage.getItem('nick_name'));
    },[]);
    
    const ckdata = useCallback((e)=>{
        setData(e.editor.getData());
    },[data]);
    const onChangeTitle = useCallback((e)=>{
        setTitle(e.target.value);
    },[setTitle])
    const onChangeTag = useCallback((e)=>{
        setTag(e.target.value);
    },[tag]);

    const back = useCallback(()=>{
        Router.push('/question/board')
    },[]);

    const backUrl = process.env.NODE_ENV === 'production'? "?" : "?";

     const onSubmit= useCallback(async()=>{
        let result = 0;

        if(title.replace(" ","").length > 0 && data !== "<p></p>" && tag !== " " && !tag.includes("  ")){   
            let Forms = new FormData();
            Forms.append("userid",isuserid);
            Forms.append("title",title);
            Forms.append("content",data);
            Forms.append("tags",tag);
           await axios({
                method :'post',
                baseURL : backUrl,
                url :"/question/insert",
                data : Forms
            }).then((response)=>{
                result = response.data;
                if(result > 0){
                    swal({
                        title: "등록 성공",
                        text: "능력치가 +3 올랐습니다.",
                        icon: "/static/image/Logo2.png",
                    });
                    Router.push("/question/board");
                }else {
                    swal({
                        title: "등록 실패",
                        text: "글쓰기 양식에 맞지 않습니다.",
                        icon: "/static/image/Logo2.png",
                    });
                }
           }).catch((xhr)=>{
                swal({
                    title: "등록 실패",
                    text: "글쓰기 양식에 맞지 않습니다.",
                    icon: "/static/image/Logo2.png",
                });
         });
        }else{
            swal({
                title: "등록 실패",
                text: "글쓰기 양식에 맞지 않습니다.",
                icon: "/static/image/Logo2.png",
              })
        }

    },[data,tag,isuserid,title])

    

        return(
            <>
            {setIsUserid !== 0 ? <Container >
                <br /> 
                <TitleComponent title="질의 응답">
                <FontAwesomeIcon style={{width:"35px",height:"auto"}} icon={faQuestionCircle}/>                          
            </TitleComponent> 
                <br/>
                <div>
                    <ProfileImageUserid user_image={isuserimage} style={cardcss} writer={isnickname} />
                
                        <InputText id="title" content="제목을 입력해주세요" onChange={onChangeTitle}  maxLength="50"/>
                        {title.length > 50 ? swal({title: "제목이 너무 깁니다.",text: "제목은 최대 35자 이내로 작성해주세요.",icon: "/static/image/Logo2.png"}) : "" }
                         <small style={{position:"absolute",left:"85%",top:"215px", color:"grey"}}>({title.length}/50)</small>
                         {tag.length > 50 ? swal({title: "태그가 너무 깁니다.",text: "태그는 최대 30자 이내로 작성해주세요.",icon: "/static/image/Logo2.png"}) : "" }
                        <InputText id="tags" content="Tags" onChange={onChangeTag} maxLength="30"/>
                        <small style={{position:"absolute",left:"85%",top:"285px", color:"grey"}}>({tag.length}/30)</small>
                        <CkeditorOne2 data={data} onChange={ckdata} /> 
                    <hr />
                    <div style={buttoncss}>
                        <ButtonComponent name="목록으로" variant="info" onclick={back}/> &nbsp;&nbsp;
                        <ButtonComponent name="등록" onclick={onSubmit} />
                    </div>
                </div>
                <br/> 
                </Container> : Router.push("/question/board")}
            </>
        )
  }
export default Write;


