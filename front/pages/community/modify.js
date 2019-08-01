import React, {useState,useCallback,useEffect } from 'react';
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

const CkeditorOne2 = dynamic(() =>import('../../components/presentational/atoms/CkeditorOne2'),{
    ssr : false
});
/**
 * @auth 정규현 
 * @summary 글쓰기 수정 페이지(퀘스찬 보드 가져옴)
 */

const buttoncss = {
    textAlign: "right"
};

const cardcss = {
    margin: "0px",
    padding: "0px"
};

const backUrl = process.env.NODE_ENV === 'production'? "?" : "?";

const Modify = ()=> {
    const [seq, setSeq] = useState(0);
    const [title, setTitle] = useState("");
    const [tags, setTags] = useState("");
    const [data, setData] = useState('<p></p>');
    const [nick_name, setNick_name] = useState("");
    const [user_image, setUser_image] = useState("");
    const [isLoding, setIsLoding] = useState(false);

    useEffect(()=> {
        
        setSeq(Router.query['seq']);
        setNick_name(localStorage.getItem("nick_name"));
        setUser_image(localStorage.getItem("user_image"));

        const endPoint = backUrl+"/community/modify";
        axios.get(endPoint, {
            params: {
                seq: Router.query['seq']
            }
        })
        .then((res)=> {
            setTitle(res.data.title);
            setTags(res.data.tags);
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

    const onClickSubmit = useCallback(() => {
        setIsLoding(true);
        if(title !== "" && data !== ""){
            let Forms = new FormData();
            Forms.append("seq",seq);
            Forms.append("title",title);
            Forms.append("content",data);
            Forms.append("tags",tags);
            axios({
                method :'put',
                baseURL : backUrl,
                data : Forms
            }).then((response)=>{
                setIsLoding(false);
                let result = response.data;
                if(result > 0){
                    result = response.data;
                    Router.push('/community/detail?seq='+seq);
                }else {
                    swal({
                        title: "수정 실패",
                        text: "글쓰기 양식에 맞지 않습니다.",
                        icon: "/static/image/Logo2.png",
                    });
                    Router.push('/community/detail?seq='+seq);
                    }
           }).catch((xhr)=>{
                setIsLoding(false);
         });
        }else{
            setIsLoding(false);
            swal({
                title: "수정 실패",
                text: "공백은 작성이 불가능합니다.",
                icon: "/static/image/Logo2.png",
            });
            return;
         }
    },[seq,title,data,tags]);
    
        return (
            <>
            <Container >
            <TitleComponent title="자유 게시판">
                <FontAwesomeIcon style={{width:"35px",height:"auto"}} icon={faCrow}/>                          
            </TitleComponent> 
                    <Row>
                        <Col>
                            <ProfileImageUserid style={cardcss} user_image={user_image} writer={nick_name} />
                            <InputText id="title" value={title} onChange={onChangetitle} />
                            <InputText id="tags" value={tags} onChange={onChangetags}/>
                            <CkeditorOne2 id="content" data={data} onChange={onChangeCk} />
                            <hr />
                            <div style={buttoncss}>
                            <ButtonComponent variant='info' name="뒤로가기" onclick={()=>{Router.push('/community/detail?seq='+seq)}}/> &nbsp;&nbsp;
                            <ButtonComponent name="수정" onclick={onClickSubmit} disabled={isLoding}/>
                            </div>
                        </Col>
                    </Row>
                <br />
            </Container>
            </>
        );
    
}
export default Modify;


