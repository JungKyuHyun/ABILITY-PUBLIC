import React, { useCallback, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {Button, Form, Row, Col, Badge} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCubes } from '@fortawesome/free-solid-svg-icons';
import { UPLOAD_IMAGES_REQUEST, REMOVE_IMAGE, UPLOAD_BANNER_REGISTER_REQUEST } from '../../../reducers/post';

/**
 * @author 정규현 
 * @summary 배너 등록 페이지 
 */
const isEmpty = (value) =>{
    if( value == "" || value == null || value == undefined || ( value != null && typeof value == "object" && !Object.keys(value).length ) ){
		return true
	}else{
		return false
	}
};

const bannerCardCss = {
    marginBottom:"0.45rem"
};

const bannerInputCss = {
    borderRadius:"10px",
    width:"30rem",
    border:"1px solid #5F4B8B",
    padding:"1px 8px 1px 8px"
}

const BannerRegister = () =>{
    const [errorMsg, setErrorMsg] = useState('');

    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [url, setUrl] = useState('');
    const [client, setClient] = useState('');
    const [errorMsg2, setErrorMsg2] = useState('');

    const imageInput = useRef();
    const dispatch = useDispatch();
    const {imagePaths} = useSelector(state=> state.post);
    
    const onSubmitForm = useCallback((e) => {
        e.preventDefault();
      }, []);

      const onClickImageUpload = useCallback(()=>{
        setErrorMsg('');
        imageInput.current.click();
      },[imageInput.current, errorMsg]);

      const onRemoveImage = useCallback((index) => () =>{
        dispatch({
            type:REMOVE_IMAGE,
            index,
        });
      },[]);

      const onChangeImages = useCallback((e)=>{
        
        if(e.target.files.length>3){
            setErrorMsg('3개 이하의 파일만 선택 가능합니다.');
            return;
        }else if(e.target.files.length===0){
            setErrorMsg('1개 이상의 파일을 선택해 주세요.');
            return;
        }else if(imagePaths.length===3){
            setErrorMsg('최대 3개의 파일만 등록할 수 있습니다.');
            return;
        }else{
            const imageFormData = new FormData();

            [].forEach.call(e.target.files, (f)=>{
                imageFormData.append('image', f);
            });
            dispatch ({
                type: UPLOAD_IMAGES_REQUEST,
                data: imageFormData
            })
        };

      },[errorMsg,imagePaths]);

      const onClickBannerReal = useCallback(() =>{
        if(isEmpty(title)){
            setErrorMsg2('배너 이름을 입력해 주세요');
            return;
        }else if(isEmpty(desc)){
            setErrorMsg2('배너 설명을 입력해 주세요');
            return;
        }else if(isEmpty(url)){
            setErrorMsg2("연결 주소을 입력해 주세요");
            return;
        }else if(isEmpty(client)){
            setErrorMsg2('고객 이름을 입력해 주세요');
            return;
        }else{
            setErrorMsg2('');
            setTitle('');
            setDesc('');
            setUrl('');
            setClient('');
            dispatch({
                type: UPLOAD_BANNER_REGISTER_REQUEST,
                data:{
                    title, desc, url, client, imagePaths
                }
            });
        }
       
      },[title, desc, url, client,imagePaths,errorMsg2]);
      
    const onChangeTitle = useCallback((e) =>{
        setTitle(e.target.value);
    },[title]);

    const onChangeDesc = useCallback((e) =>{
        setDesc(e.target.value);
    },[desc]);

    const onChangeUrl = useCallback((e) =>{
        setUrl(e.target.value);
    },[url]);

    const onChangeClient = useCallback((e) =>{
        setClient(e.target.value);
    },[client]);

    return (
        <>
        <Row style={{width:"100%",margin:"30px 0 15px 0"}}>
            <Col sm={12} md={{ span: 8, offset: 3 }}>
            <div style={{border:"1px solid #5F4B8B",padding:"1rem 2rem 1rem 2rem", borderRadius:"10px"}}>
                <div className="text-center" style={{paddingBottom:"1rem"}}>
                    <h5>
                        <FontAwesomeIcon icon={faCubes} style={{width:"20px",height:"20px"}}/>&nbsp;
                        배너 등록시 유의 사항
                    </h5>
                </div>
                <div style={bannerCardCss}>
                    1. 현재 등록 가능한 배너 : 메인 대배너1, 메인 대배너2, 메인 대배너3
                </div>
                <div style={bannerCardCss}>
                    2. 메인 대배너 규격 : 1,140px * 400px (최대 2.5MB)
                </div>
                <div style={bannerCardCss}>
                    3. 메인 대배너 확장자 : jpg, png, gif
                </div>
                <div style={bannerCardCss}>
                    4. 최대 3개의 파일을 한 번에 선택해서 등록할 수 있습니다.
                </div>
                
            </div>
            </Col>
        </Row>
        <Row>
            <Form style={{ margin: '10px 0 20px',width:"99%"}} encType="multipart/form-data" onSubmit={onSubmitForm}>
            <Col sm={12} md={{ span: 8, offset: 3 }} style={{marginBottom:"5rem"}}>
                <div className="text-center" style={{color:"red",marginBottom:"0.3rem"}}><b>{errorMsg}</b></div>
                <div>
                    <input type="file" multiple hidden ref={imageInput} onChange={onChangeImages} accept=".gif, .jpg, .png"/>
                    <Button block onClick={onClickImageUpload}>배너 등록하기</Button>
                </div>
            </Col>
                <div>
                    {imagePaths.map((v,index) => (
                    <div key={v} style={{display:'inline-block',padding:"0 2rem 0 2rem"}}>
                        <hr/>
                        <div style={{marginBottom:"0.5rem"}}>
                            <b>[배너 {index+1} 미리보기]</b>&nbsp;&nbsp;
                            <span onClick={onRemoveImage(index)} style={{cursor: "pointer",marginRight:"0.5rem"}}>
                                <Badge variant="warning">배너 삭제</Badge>
                            </span>
                            <span onClick={onClickBannerReal} style={{cursor: "pointer"}}>
                                <Badge variant="primary">사이트 반영</Badge>
                            </span>
                        </div>
                        <div className="text-center" style={{marginBottom:"0.5rem"}}>
                            <img src={v} style={{ width: '570px', hight:"200px" }} alt={v} />
                        </div>
                            <div style={{marginTop:"1rem",marginBottom:"0.5rem"}}>
                                &nbsp;* 배너 이름 :&nbsp; 
                                <input type="text" style={bannerInputCss} onChange={onChangeTitle} maxLength="250"/>
                            </div>
                            <div style={{marginBottom:"0.5rem"}}>
                                &nbsp;* 배너 설명 :&nbsp; 
                                <input type="text" style={bannerInputCss} onChange={onChangeDesc} maxLength="250"/>
                            </div>
                            <div style={{marginBottom:"0.5rem"}}>
                                &nbsp;* 연결 주소 :&nbsp; 
                                <input type="text" style={bannerInputCss} onChange={onChangeUrl} maxLength="250"/>
                            </div>
                            <div style={{marginBottom:"0.5rem"}}>
                                &nbsp;* 고객 이름 :&nbsp; 
                                <input type="text" style={bannerInputCss} onChange={onChangeClient} maxLength="250"/>
                            </div>
                            <div className="text-center" style={{color:"red",marginBottom:"0.3rem"}}><b>{errorMsg2}</b></div>
                    </div>
                    ))}
                </div>
            </Form>
        </Row>
      
        </>
    );
}



export default BannerRegister;