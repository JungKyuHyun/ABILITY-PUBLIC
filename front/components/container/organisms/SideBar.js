import React, {useEffect,useState} from 'react';
import {ListGroup} from 'react-bootstrap';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments, faHome, faQuestionCircle, faCrow, faUsers, faIdBadge, faLaptopCode, faUserShield } from '@fortawesome/free-solid-svg-icons';

  /**
   * @auth 정진호
   * @summary 사이드바 컴포넌트 ++ 라우터처리
   * @see 정규현 리펙토링 / 넥스트 적용
   */
  
  
 const SideBar = (props) =>{      
    const [windowGlobal,setWindowGlobal]=useState("");
    const [isAdmin,setIsAdmin]=useState(false);
    useEffect(()=>{
        setWindowGlobal(location.pathname);
        if(localStorage.getItem('role_name')=='ROLE_ADMIN'){
            setIsAdmin(true);
        }
      
    });
    function loadAdmin(){
      if (isAdmin) {
        return <Link href="/admin/board" >
                  <ListGroup.Item action active={windowGlobal === "/admin/board" ? true : false} onClick={props.onClick} id="sidebar">
                  <a><FontAwesomeIcon icon={faUserShield} style={{ width: "auto", height: "14px" }} />&nbsp;관리자</a>
                  </ListGroup.Item>
               </Link>
      }
    }
     const Admin = loadAdmin();
      return ( 
      <>
      <div id="sideBarHover">
        <ListGroup variant="flush" className="text-center">
          <Link href="/" >
              <ListGroup.Item action active={windowGlobal==="/"?true:false} onClick={props.onClick}>
                <a><FontAwesomeIcon icon={faHome} style={{width:"auto",height:"14px"}}/>&nbsp;Home</a>
              </ListGroup.Item>
          </Link>
          <h6 style={{marginRight:"70px",marginBottom:"0px",marginTop:"10px"}}>PUBLIC</h6>
          <Link href="/question/board" >
            <ListGroup.Item action active={windowGlobal==="/question/board"?true:false} onClick={props.onClick} id="sidebar">
                <a><FontAwesomeIcon icon={faQuestionCircle} style={{width:"auto",height:"14px"}}/>&nbsp;질의 응답
                </a>
            </ListGroup.Item>
          </Link>
          <Link href="/community/board" >
              <ListGroup.Item action active={windowGlobal==="/community/board"?true:false} onClick={props.onClick} id="sidebar">
                <a><FontAwesomeIcon icon={faCrow} style={{width:"auto",height:"14px"}}/>&nbsp;자유 게시판</a>
              </ListGroup.Item>
          </Link>
          <Link href="/developer/board" >
              <ListGroup.Item action active={windowGlobal==="/developer/board"?true:false} onClick={props.onClick} id="sidebar">
                <a><FontAwesomeIcon icon={faUsers} style={{width:"auto",height:"14px"}}/>&nbsp;개발자들</a>
              </ListGroup.Item>
          </Link>
          <Link href="/job/board" >
              <ListGroup.Item action active={windowGlobal==="/job/board"?true:false} onClick={props.onClick} id="sidebar">
                <a><FontAwesomeIcon icon={faIdBadge} style={{width:"auto",height:"14px"}}/>&nbsp;개발자 모집</a>
              </ListGroup.Item>
          </Link>
          <Link href="/project/board" >
              <ListGroup.Item action active={windowGlobal==="/project/board"?true:false} onClick={props.onClick} id="sidebar">
                <a><FontAwesomeIcon icon={faLaptopCode} style={{width:"auto",height:"14px"}}/>&nbsp;프로젝트 자랑</a>
              </ListGroup.Item>
          </Link>
          <Link href="/chat/board" >
              <ListGroup.Item action active={windowGlobal==="/chat/board"?true:false} onClick={props.onClick} id="sidebar">
                  <a><FontAwesomeIcon icon={faComments} style={{width:"auto",height:"14px"}}/>&nbsp;채팅</a>
              </ListGroup.Item>
          </Link>
                   {Admin}
        </ListGroup>
        </div>
        </>
        );
}

export default SideBar;