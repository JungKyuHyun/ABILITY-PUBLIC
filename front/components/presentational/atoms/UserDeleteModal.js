import React, {Component} from 'react';
import { Modal, Button} from 'react-bootstrap';
import { InputText } from './InputboxComponent';
import axios from 'axios';
import Router from 'next/router';


/**
 * 
 * @author 우세림
 * @summary 유저삭제방 만들기 모달
 * 
 */

const EndPoint = process.env.NODE_ENV === 'production'? "?" : "?";


class UserDeleteModal extends Component {
  constructor(props, context) {
    super(props, context);
    
    this.state = {
      show: false,
      userid : 0,
      result : 0,
    };

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
    
  async handleClose() {
    this.setState({ show: false });
  }
  async handleShow() {
    this.setState({ show: true });
  }

  async componentDidMount() {
    let user = Router.query['userid'];
    this.setState({
        userid : user
    })
  }

  async handlesubmit() {
      let password = document.getElementById('password').value;
      
      let result = 0;
      if(password){
        await axios.get(EndPoint, {
          params : {
            userid : Router.query['userid'],
            password :password
          }
          }).then((Response) => {
              result = Response.data;
              if(result>0){
                swal({
                    text: "회원탈퇴 되었습니다.",
                    title: "회원탈퇴 성공",
                    timer: "3000",
                    icon: "/static/image/Logo2.png"
                });
                Router.push("/");
              } else {
                swal({
                  text: "회원탈퇴가 일치하지 않습니다.",
                  title: "회원탈퇴 오류",
                  timer: "3000",
                  icon: "/static/image/Logo2.png"
               });
               return;
              }
          });
      } else{
        swal({
          text: "빈칸을 입력해주세요",
          title: "회원탈퇴 오류",
          timer: "3000",
          icon: "/static/image/Logo2.png"
       });
       return;
      }
     
  }

    render() {
      return (
        <>
          <Button variant="primary" onClick={this.handleShow} variant="info">
            회원탈퇴
          </Button>

            <Modal
                {...this.props}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                show={this.state.show} onHide={this.handleClose}
                centered
            >

            <Modal.Header closeButton>
              <Modal.Title>회원탈퇴</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <div>- 회원탈퇴를 원하시면 비밀번호를 입력해주세요.</div>
                <hr/>
                비밀번호 <InputText id="password" type="password"/>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose}>
                취소
              </Button>
              <Button variant="primary" onClick={this.handlesubmit}>
                확인
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      );
    }
  }
export default UserDeleteModal;