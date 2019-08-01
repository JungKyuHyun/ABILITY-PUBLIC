import React, {useCallback, useState,useEffect} from 'react';
import {Navbar,Form,Row,Col,Badge,Nav, Container} from 'react-bootstrap';
import Link from 'next/link';
import PropeTypes from 'prop-types';
import SideBar from '../components/container/organisms/SideBar';
import {useDispatch, useSelector} from 'react-redux';
import {UserImageComponent2} from  '../components/presentational/atoms/UserImageComponent';
import {AbilityComponent} from './presentational/atoms/AbilityComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleUp,faComments, faHome, faQuestionCircle, faCrow, faUsers, faIdBadge, faLaptopCode, faUserShield } from '@fortawesome/free-solid-svg-icons';
import { LOG_OUT_REQUEST, LOG_IN_MAINTAIN_REQUEST } from '../reducers/user';
import {AllSearchComponent}  from './presentational/atoms/SearchbarComponent';
import { Footer } from './container/organisms/Footer';

  /**
   * @auth 정진호
   * @summary 사이드바 컴포넌트 ++ 라우터처리
   * @see 정규현 리펙토링 진행/ 코드 단순화 및 레이아웃 구성, 기존 클래스형에서 function으로 변경 / 훅 생성 
   */

  const imgCss={
      padding:'0',
      borderRadius:"50%",
      width:"3rem",
      height:"3rem",
      marginRight:"0.5rem"
  };

  const backUrl = process.env.NODE_ENV === 'production'? "?" : "?";

const ConnectSpringSignUp = ()=>{
    const screenW = screen.availWidth;  // 스크린 가로사이즈
    const screenH = screen.availHeight; // 스크린 세로사이즈
    const posL=( screenW-430 ) / 2;   // 띄울창의 가로 포지션 
    const posT=( screenH-796 ) / 2;   // 띄울창의 세로 포지션 
    window.open(backUrl,"ABILITY SIGN UP","width=430, height=796,top="+posT+",left="+posL+", toolbar=no,menubar=no,scrollbars=no,resizable=no,location=no");
};

const AppLayout = (props) => {
    const [searchValue, setSearchValue] = useState('');
    const onChangeMainSearchBox = useCallback((e) =>{

        setSearchValue(e.target.value);
    },[searchValue]);
 
    const dispatch = useDispatch();
    const {me} = useSelector(state=>state.user);

    useEffect(()=>{

        if(localStorage.getItem('isLogin')!==null){
            dispatch({
                type:LOG_IN_MAINTAIN_REQUEST,
            });
        }

    },[]);
    const onClickLogout= useCallback(()=>{
        localStorage.clear();
        dispatch({
            type:LOG_OUT_REQUEST,
        })
    },[]);
    const [placeHolder, setPlaceHolder] = useState('검색어를 입력하세요');
    const onKeyPressSearch = useCallback((e)=>{
        if(searchValue.trim().replace(' ','').length===0){
          setSearchValue('');
          setPlaceHolder('검색할 내용이 없습니다!');
          return;
        }
      },[searchValue,placeHolder])
    
      const onClickSearchButton = useCallback(()=>{
        if(searchValue.trim().replace(' ','').length===0){
            setSearchValue('');
          setPlaceHolder('검색할 내용이 없습니다!');
          return;
        }
        setSearchValue('');
      },[searchValue]);
      
    return (
    <>
        
        <Navbar bg="light" variant="light" style={{maxHeight:"62px",position:"fixed",width:"100%",boxShadow:"1px 2px rgba(0,0,0,0.1)",borderTop:"6px solid #5f4b8b",zIndex:"4"}}>
        <Container >
            <Link href="/">
                <a id="fulllogo"><Navbar.Brand><img src="/static/image/Logo.png" alt="LOGO" style={{height:"34px",verticalAlign:"middle",marginLeft:"2rem"}}></img></Navbar.Brand></a>
            </Link>
            <Link href="/">
                <a id="smalllogo" style={{display:"none"}}><Navbar.Brand><img src="/static/favicon.ico" alt="LOGO" style={{width:"40px",height:"34px",verticalAlign:"middle",marginLeft:"10px"}}></img></Navbar.Brand></a>
            </Link>
                <Form inline style={{width:"40%", marginLeft:"0.5rem"}}>
                    <AllSearchComponent content={placeHolder} className="mr-auto" value={searchValue}  onKeyPress={onKeyPressSearch} onChange={onChangeMainSearchBox} onClick={onClickSearchButton} path="/search/search" word={searchValue}/>
                </Form>
            <Navbar.Collapse className="justify-content-end" id="loginbox">
            </Navbar.Collapse>
              {!me
              ? 
                <div style={{minWidth:"96.45px"}}><Navbar.Text >
                    <Link href="/user/login"><a>로그인</a></Link>
                </Navbar.Text>&nbsp;&nbsp;
                <Navbar.Text>
                    <span onClick={ConnectSpringSignUp} style={{cursor:"pointer"}}><a>회원가입</a></span>
                </Navbar.Text></div>
              :
            <>
                <UserImageComponent2 id="main_userimg" css={imgCss} imagepath={me['user']['user_image']}/>  
                <div id="main_login_form">
                    <Link href={{pathname: "/developer/page" , query:{userid: me['user']['userid']} }} as={"/developer/page/"+me['user']['userid']}>
                        <a>
                            <h6 id="h6id" style={{margin:"0"}}>{me["user"]["nick_name"]}&nbsp;         
                            </h6>
                        </a> 
                    </Link>
                    
                    <AbilityComponent id="main_userreputation" val={me["user"]["reputation"]}/>&nbsp;&nbsp;
                 
                    <span onClick={onClickLogout}>
                        <Badge variant="secondary">로그아웃</Badge>
                    </span>
                </div>
            </>
            }

            </Container>
        </Navbar>

        <Container style={{paddingTop:"65px"}}>
        <Navbar bg="light" expand="lg" id="topnav" style={{textAlign:"center",display:"none"}}>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Link href="/" >
                        <a id="link"><FontAwesomeIcon icon={faHome} style={{width:"auto",height:"14px"}}/>&nbsp;Home</a>
                        </Link>
                        <Link href="/question/board" >
                                <a id="link"><FontAwesomeIcon icon={faQuestionCircle} style={{width:"auto",height:"14px"}}/>&nbsp;질의 응답
                                </a>
                        </Link>
                        <Link href="/community/board" >
                                <a id="link"><FontAwesomeIcon icon={faCrow} style={{width:"auto",height:"14px"}}/>&nbsp;자유 게시판</a>
                        </Link>
                        <Link href="/developer/board" >
                                <a id="link"><FontAwesomeIcon icon={faUsers} style={{width:"auto",height:"14px"}}/>&nbsp;개발자들</a>
                        </Link>
                        <Link href="/job/board" >
                                <a id="link"><FontAwesomeIcon icon={faIdBadge} style={{width:"auto",height:"14px"}}/>&nbsp;개발자 모집</a>
                        </Link>
                        <Link href="/project/board" >
                                <a id="link"><FontAwesomeIcon icon={faLaptopCode} style={{width:"auto",height:"14px"}}/>&nbsp;프로젝트 자랑</a>
                        </Link>
                        <Link href="/chat/board" >
                                <a id="link"><FontAwesomeIcon icon={faComments} style={{width:"auto",height:"14px"}}/>&nbsp;채팅</a>
                        </Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        <Row style={{minHeight:"52rem"}}>
            <Col xs={12} md={2} id="side" style={{borderRight:"1px solid rgba(0,0,0,.125)",marginTop:"1rem",marginBottom:"1rem",position:"fixed",height:"100%",zIndex:"4",width:"176px",paddingRight:"0px"}}>
                <SideBar/>
            </Col>
            
            <Col id="content" xs={12} md={10} style={{marginLeft:"180px"}}>
                    {props.children}
            </Col>
         </Row>
        </Container>
        
        
        <div style={{backgroundColor:"rgb(95, 75, 139)",zIndex:"4"}}>
            <Container >
                <Col xs={12} md={12} >
                    <Footer />
                </Col>
            </Container>
        </div>
        <div className="topToIcon" style={{position:"fixed",bottom:"14px",right:"20px"}}>
            <span onClick={()=>{window.scrollTo(0,0);}}>
                <FontAwesomeIcon style={{width:"35px",height:"auto",color:"#5f4b8b",
                                backgroundColor:"white",borderRadius:"60%",border:"3px solid #5f4b8b"}} icon={faArrowAltCircleUp}/>     
            </span>
          </div>
    
    </>
    );
};

AppLayout.propeTypes={
    children:PropeTypes.node.isRequired,
};

export default AppLayout;