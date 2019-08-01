import React, {useState} from 'react';

import Link from 'next/link';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrown,faBuilding,faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { AbilityComponent } from '../atoms/AbilityComponent';
/**
 * 
 * @author 신선하
 * @summary admin 신고내역 테이블 컴포넌트 바디부분
 * @Usage
 * 
 */
const modifyCss = {
    color: "#0984e3",
    fontFamily: "sans-serif",
    cursor: "pointer"
}
const image_css = {
    width: "30px",
    height: "30px",
    marginRight: "15px"
}

const logo={
    width:"100px",
    height:"20px",
    marginBottom:"40px",
    padding:"0"
}

function date(date_created) {
    let year = date_created.substring(2, 4);
    let month = date_created.substring(5, 7);
    let day = date_created.substring(8, 10);
    let edit_created = `${year}/${month}/${day}`;
    return edit_created;
}

const name_css = {
    width: "100px",
}

const profile_css = {
    padding: "6px 12px 0 35px",
    textAlign: "left",
    fontWeight: "bold",
    width: "210px"
}

const emailCss = {
    width: "210px"
}

const backUrl = process.env.NODE_ENV === 'production'? "?" : "?";

const AdminReportTbody = (props) => {
    let role_name = props.role_name;
     let userid= props.userid;
    function roleModal(role_name,userid,onExited) {
       
        if (role_name == "ROLE_USER") {
            role_name = "일반회원"
        } else if (role_name == "ROLE_COMPANY") {
            role_name = "기업회원"
        } else {
            role_name = "관리자"
        }
        const modalCss = {
            display:"flex",
            flexDirection:"column"
        }
        const radioCss = {
            marginTop:"10px",
            marginBottom:"10px",
            display:"flex",
            justifyContent:"space-around"
        }
        const radioBtn = {
             display:"none"
        }
    
        const labelCss = {
            display:"flex"
        }
        
        const role_css = {
            marginTop:"27px",
            marginRight:"5px",
            color:"#636e72",
            cursor:"pointer"
        }
    
        const role_span = {
            color:"#5F4B8B",
            cursor:"pointer"
        }
    
        const modalTitle={
            fontFamily:"sans-serif",
            fontWeight:"bold",
            color:"#5F4B8B",
            padding:"0"
        }
        const description = {
            textAlign:"center",
            fontFamily:"sans-serif",
            fontWeight:"bold",
            color:"#636e72"
        }
    
        const buttonTitle = role_name;
        const [show, setShow] = useState(false);
        const [roleValue, setRoleValue] = useState("default");
        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);
        const handleRadio = (e) => {
            let obj = {};
            obj[e.target.value] = e.target.checked;
            setRoleValue(e.target.value);
        }
        const handleSubmit = () => {
            let form = new FormData();
               form.append("role_name",roleValue);
               form.append("userid",userid);
                 axios({
                  method :'PUT',
                  baseURL : backUrl,
                  url :"/test/changerole",
                  data : form
              }).then((res)=>{
                  if(res.data=="success"){
                      swal("권한을 변경하였습니다.");
                      setShow(false);
                  }else{
                      swal("[Error0577] 변경 실패");
                  }
              })
        }
        return (
            <>
          
                <span style={role_span} onClick={handleShow}>
                    {buttonTitle}
                </span>
                <Modal show={show} onHide={handleClose} onExited={onExited}>
                    <Modal.Header closeButton>
                        <Modal.Title> <img src ="../../../static/image/Logo2.png" className="Logo-ABILITY" style={logo} alt="로고"/><span style={modalTitle}>권한 수정</span></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div style={modalCss}>
                            <div style={description}><span>수정할 권한을 선택하세요</span></div>
                            <div style={radioCss}>
                                
                                <input type="radio" id="user" name="role" value="user" style={radioBtn} onChange={handleRadio} />
                                <label for="user" style={labelCss}>
                                <span style={role_css} id="userlabel"><FontAwesomeIcon icon={faUserCircle}/> 일반회원</span>
                                </label>
                                
                                <input type="radio" id="company" name="role" value="company" style={radioBtn}  onChange={handleRadio} />
                                <label for="company" style={labelCss}>
                                <span style={role_css} id="companylabel"><FontAwesomeIcon icon={faBuilding}/> 기업회원</span>
                                </label>
                               
                                <input type="radio" id="admin" name="role" value="admin" style={radioBtn}  onChange={handleRadio} />
                                <label  for="admin" style={labelCss}>
                                 <span style={role_css} id="adminlabel"><FontAwesomeIcon icon={faCrown}/> 관리자</span> 
                                </label>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={handleSubmit}>
                            변경
                </Button>
                        <Button variant="primary" onClick={handleClose}>
                            취소
                </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
    const date_function = date(props.date_created);
    const role_function = roleModal(role_name,userid,props.onExited);
    return (
        <>
         

            <td><input type="checkbox" id={props.userid} checked={props.checked} onChange={props.onChange} /></td>
            <td>{props.userid}</td>
            <td style={profile_css}><img style={image_css} src={props.user_image} /><Link href={{ pathname: "/developer/page", query: { userid: props.userid } }}><a>{props.nick_name}</a></Link></td>
            <td style={name_css}>{props.name}</td>
            <td>{role_function}</td>
            <td>{date_function}</td>
            <td style={emailCss}>{props.email}</td>
            <td><AbilityComponent val={props.reputation}></AbilityComponent></td>
            <td><Link href={{ pathname: "/developer/update", query: { userid: props.userid } }}><a href=""><span style={modifyCss}>수정</span></a></Link></td>
        </>
    );
};

export default AdminReportTbody;