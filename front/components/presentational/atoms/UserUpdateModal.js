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

const EndPoint = process.env.NODE_ENV === 'production'? "" : "";

class UserUpdateModal extends Component {
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

  isEmpty(str){      
    if(typeof str == "undefined" || str == null || str == "")
        return true;
    else
        return false ;
  }

  async handlesubmit() {
    let pattern = /^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W)).{8,20}$/;

    let password = document.getElementById('password').value;
    let repassword = document.getElementById('repassword').value;
    let repasswordok = document.getElementById('repasswordok').value;
    
    let result = 0;
    if(password && repassword && repasswordok) {
      if (pattern.test(repassword)) {
        if(repassword==repasswordok){
          await axios.get(EndPoint+"/change", {
            params : {
              userid : Router.query['userid'],
              password :password,
              repassword :repassword
            }
            }).then((Response) => {
              result = Response.data;
              if(result>0){
              swal({
                text: "비밀번호 변경이 되었습니다.",
                title: "비밀번호 변경 성공",
                timer: "3000",
                icon: "/static/image/Logo2.png"
             });
              Router.push("/developer/page?userid="+Router.query['userid']);
              } else{
                swal({
                  text: "현재 비밀번호와 입력한 비밀번호가 다릅니다.",
                  title: "비밀번호 오류",
                  timer: "3000",
                  icon: "/static/image/Logo2.png"
               });
                return false;
              }
            })
        } else {
          swal({
            text: "새 비밀번호와 비밀번호 확인이 일치하지 않습니다.",
            title: "비밀번호 오류",
            timer: "3000",
            icon: "/static/image/Logo2.png"
         });
        }
      } else{
        swal({
          text: "새 비밀번호는 숫자, 문자, 특수문자를 포함하여 8자이상 20자 이하로 작성해주세요.",
          title: "비밀번호 오류",
          timer: "3000",
          icon: "/static/image/Logo2.png"
       });
        document.getElementById('repassword').value ="";
        document.getElementById('repassword').focus();
      }
    } else {
      swal({
        text: "빈칸을 입력해주세요.",
        title: "비밀번호 오류",
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
            비밀번호 변경
          </Button>

            <Modal
                {...this.props}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                show={this.state.show} onHide={this.handleClose}
                centered
            >

            <Modal.Header closeButton>
              <Modal.Title>비밀번호 변경</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <div>- 비밀번호 변경을 원하시면 현재 비밀번호와 변경하실 비밀번호를 입력해주세요.</div>
                <hr/>
                현재 비밀번호 <InputText id="password" type="password"/>
                변경할 비밀번호 <InputText id="repassword" type="password"/>
                비밀번호 확인 <InputText id="repasswordok" type="password"/>
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
export default UserUpdateModal;