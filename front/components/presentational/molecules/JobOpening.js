import React ,{useState , useEffect , useCallback}from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAstronaut } from '@fortawesome/free-solid-svg-icons';
import { Container,Form, Row, Col, DropdownButton, InputGroup, Dropdown, Button } from 'react-bootstrap';
import UserCard from './UserCard';
import axios from 'axios';
import Router from 'next/router';
import dynamic from 'next/dynamic';
import { InputText } from '../atoms/InputboxComponent';

/**
 * @auth 정진호
 * @summary 구인구직 게시판 컴포넌트
 */

const CkeditorOne2 = dynamic(() =>import('../atoms/CkeditorOne2'),{
    ssr : false
});



export const JobWriteCatgoryName=(props)=>{
    return(
        <>
            <h5>
                &nbsp;&nbsp;<FontAwesomeIcon 
                            icon={faUserAstronaut} style={{width:"17.5px"}} /> 
                &nbsp;&nbsp;{props.title}
            </h5>
        </>
    );
}

export const AboutJob=(props)=>{
    return( 
        <>
        <JobWriteCatgoryName title="모집정보"/>
        <Form
          style={props.border}
          noValidate >
         <Form.Group as={Row}>
            <Form.Label column sm={2} 
                            id="">제목</Form.Label>
                 <Col sm={12}>
                <Form.Control type="text" 
                                    placeholder="제목을 입력해주세요."
                                    name="title"
                                    onChange={props.onChange}
                                    defaultValue={props.title}
                                    required maxLength="90"/>
                        <Form.Control.Feedback></Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">필수입력 사항입니다</Form.Control.Feedback>
                </Col>
        </Form.Group>
        <hr></hr>
        <Form.Group as={Row}>
            <Form.Label column sm={2} 
                        id=""
                        >부제목</Form.Label>
            <Col sm={4}>
                <Form.Control type="text"
                              placeholder="OO모집"
                              name="subtitle"
                              onChange={props.onChange}
                              defaultValue={props.subtitle}
                              required maxLength="10"/>
                <Form.Control.Feedback></Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">필수입력 사항입니다</Form.Control.Feedback>
            </Col>
            <Form.Label column sm={2} 
                        id="">모집 부류</Form.Label>
                <Col sm={4}>
            <Form.Control type="text" 
                                placeholder="신입 or 경력직"
                                name="career"
                                onChange={props.onChange}
                                defaultValue={props.career}
                                required maxLength="30"/>
                    <Form.Control.Feedback></Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">필수입력 사항입니다</Form.Control.Feedback>
            </Col>
            
        </Form.Group>
        <Form.Group as={Row}>
            <Form.Label column sm={2} 
                        id="">직종</Form.Label>
            <Col sm={4}>
                <Form.Control type="text" 
                              placeholder="프론트엔드, 백엔드 개발자"
                              name="job_type"
                              onChange={props.onChange}
                              defaultValue={props.job_type}
                              maxLength="50"
                              />                        
            </Col>
            <Form.Label column sm={2} 
                        id="">근무 시간</Form.Label>
            <Col sm={4}>
                <Form.Control type="text" 
                               placeholder="월~금 00:00~00:00"
                               name="job_time"
                               onChange={props.onChange}
                               defaultValue={props.job_time}
                               required maxLength="60"/>
                <Form.Control.Feedback></Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">필수입력 사항입니다</Form.Control.Feedback>
            </Col>            
        </Form.Group>
        <Form.Group as={Row}>
            <Form.Label column sm={2} 
                        id="">근무 부서</Form.Label>
            <Col sm={4}>
                <Form.Control type="text" 
                               placeholder="부서명 "
                               name="job_dept"
                               onChange={props.onChange}
                               defaultValue={props.job_dept}
                               required maxLength="30"/>
                <Form.Control.Feedback></Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">필수입력 사항입니다</Form.Control.Feedback>
            </Col>
            <Form.Label column sm={2} 
                        id="">EMAIL</Form.Label>
            <Col sm={4}>
                <Form.Control type="email" 
                               placeholder="담당자 이메일"
                               name="email"
                               onChange={props.onChange}
                               defaultValue={props.email}
                               required maxLength="50"/>
                <Form.Control.Feedback></Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">필수입력 사항입니다</Form.Control.Feedback>
            </Col>              
        </Form.Group>       
        <Form.Group as={Row}>
            <Form.Label column sm={2} 
                        id="">모집 기간</Form.Label>
            <Col sm={4}>
                <Form.Control type="date"
                               name="period"
                               onChange={props.onChange}
                               defaultValue={props.period}
                               required/>
                <Form.Control.Feedback></Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">필수입력 사항입니다</Form.Control.Feedback>
            </Col>
            <Form.Label column sm={2} 
                        id="">담당자 번호</Form.Label>
            <Col sm={4}>
                <Form.Control type="tel" 
                               placeholder="010-0000-0000"
                               name="phone"
                               onChange={props.onChange}
                               defaultValue={props.phone}
                               required maxLength="15"/>
                <Form.Control.Feedback></Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">필수입력 사항입니다</Form.Control.Feedback>
            </Col>              
        </Form.Group>               
        </Form>
        </>
    );
}


export const JobSkills=(props)=>{
    return(
        <>        
        <JobWriteCatgoryName title="사용기술"/>        
        <Form
          style={props.border}
          noValidate>
            <Form.Group as={Row}>
                    <Form.Label column sm={2} 
                                id="skills" 
                                required>
                                태그
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control type="text" 
                                    placeholder="자바,노드..[,콤마로 구분]"
                                    name="tags"
                                    onChange={props.onChange}
                                    defaultValue={props.tags}
                                    required/>
                        <Form.Control.Feedback></Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid" required>필수입력 사항입니다</Form.Control.Feedback>
                    </Col>              
            </Form.Group>
        </Form>
        </>
    );
}

export const CompanyDetail=(props)=>{
    return(
        <>
            
        <JobWriteCatgoryName title="회사정보" />
                <Form
                    style={props.border}
                    noValidate
                    
                    >
                    <Form.Group as={Row}>
                    <Form.Label column sm={1} 
                                id="people">규모</Form.Label>
                    <Col xs={6}>
                    <DropdownButton
                        as={InputGroup.Prepend}
                        variant="outline-secondary"
                        title={props.dropdownName}
                        id="input-group-dropdown-1">
                    <Dropdown.Item eventKey="1" name="10명 이하" onClick={props.dropdown}>10명 이하</Dropdown.Item>
                    <Dropdown.Item eventKey="2" name="10~50명 미만" onClick={props.dropdown}>10~50명 미만</Dropdown.Item>
                    <Dropdown.Item eventKey="3" name="50~100명 미만" onClick={props.dropdown}>50~100명 미만</Dropdown.Item>
                    <Dropdown.Item eventKey="4" name="100명 이상" onClick={props.dropdown}>100명 이상</Dropdown.Item>
                    </DropdownButton>
                       
                    </Col>           

                    </Form.Group>
                    <hr></hr>
                    <Container>
                        <Row>
                            <Col xs={4}>
                                <Form.Group as={Row}>
                                    <Container>
                                    <Row>
                                        <Col>
                                            <Form.Label  
                                                        id="">로고첨부</Form.Label>
                                            <InputText label="파일 찾기" id="user_image" name="file" accept=".gif, .jpg, .png"
                                                        className="user_image" for="user_image" type="file" name="file" onChange={props.onChangeFile}/><span style={{margin : "23px 0px 0px 23px", color:"rgb(205, 97, 51)"}}>{props.filename ? props.filename+"을 선택하였습니다." : ""+props.logo}</span>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Form.Label  
                                                        id="">이력서 양식</Form.Label>
                                            <InputText label="파일 찾기" id="user_image1" name="file1" accept=".hwp , .xls , xlsx"
                                                        className="user_image" for="user_image1" type="file" name="file1" onChange={props.onChangeFile2}/><span style={{margin : "23px 0px 0px 23px", color:"rgb(205, 97, 51)"}}>{props.filename2 ? props.filename2+"을 선택하였습니다." : ""+props.resume}</span>                
                                        </Col>
                                    </Row>
                                    </Container>
                                </Form.Group>
                            </Col>
                            <Col style={{textAlign:"center"}}><img src={props.logoSrc ? props.logoSrc : ""}></img></Col>

                        </Row>
                    </Container>
                   
                </Form>
        </>
    );
}

export const JobDetail=(props)=>{
    return(
        <>
            <JobWriteCatgoryName title="직무상세"/>        
            <Form
            style={props.border}
            noValidate
            
            >
            <Form.Group as={Row}>
                    <Form.Label column sm={2} 
                                id="" 
                                required>
                                직무상세설명
                    </Form.Label>
                    <Col sm={10}>
                        <CkeditorOne2 data={props.content ? props.content : props.data} onChange={props.onChange}/>
                    </Col>              
            </Form.Group>
        </Form>
        </>
    );
}


export const Manager =(props)=>{
    const [userid,setUserid] = useState("");
    const [username,setUsername] = useState("");
    const [image,setImage] = useState("");
    const [area,setArea] = useState("");
    const [reputation,setReputation] = useState("");
    const [tags,setTags] = useState("");
    const endpoint = process.env.NODE_ENV === 'production'? "?" : "?";
    useEffect(()=>{
        setUserid(localStorage.getItem("userid"));
        setUsername(localStorage.getItem("nick_name"));
        setImage(localStorage.getItem("user_image"));
        axios.get(endpoint, {
            params : {
                userid : localStorage.getItem("userid")
            }
            }).then((Response) => {
                    setArea(Response.data.area);
                    setReputation(Response.data.reputation);
                    setTags(Response.data.tags);
        });
    },[])
    return(
        <>
            <JobWriteCatgoryName title="담당자"/>
            <UserCard userImage={image} userid={userid} name={username} area={area} reputation={reputation} tags={tags} />

        </>
    );
}