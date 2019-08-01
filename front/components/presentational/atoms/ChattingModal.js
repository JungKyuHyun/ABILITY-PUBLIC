import React, {Component} from 'react';
import { Modal, Button} from 'react-bootstrap';
import { InputText } from '../atoms/InputboxComponent';
import axios from 'axios';

/**
 * 
 * @author 우세림
 * @summary 채팅방 만들기 모달
 * 
 */
class ChattingModal extends Component {
    constructor(props, context) {
      super(props, context);
      
      this.handleShow = this.handleShow.bind(this);
      this.handleClose = this.handleClose.bind(this);
      this.handlesubmit = this.handlesubmit.bind(this);
      this.onChangetitle = this.onChangetitle.bind(this);
      this.onChangepeople = this.onChangepeople.bind(this);
      this.onChangetags = this.onChangetags.bind(this);

      this.state = {
        show: false,
        roomid : "",
        people:"",
        name:"",
        tags : "",
        link:""
      };
    }
    onChangetitle(e){
      this.setState({
        name : e.target.value
      })
    }
    onChangepeople(e){
      this.setState({
        people : e.target.value
      })
    }
    onChangetags(e){
      this.setState({
        tags : e.target.value
      })
    }
     async handlesubmit() {
      const backUrl = process.env.NODE_ENV === 'production'? "?" : "";
      let Forms = new FormData();
      Forms.append("name",this.state.name);
      Forms.append("people",this.state.people);
      Forms.append("tags",this.state.tags);
      await axios({
          method :'post',
          baseURL : backUrl,
          url :"/chat/room",
          data : Forms
      }).then(()=>{
         this.setState({ show: false });
    });
  }
    handleClose() {
      this.setState({ show: false });
    }
    handleShow() {
      this.setState({ show: true });
    }
    render() {
      return (
        <>
          <Button variant="primary" onClick={this.handleShow}>
            방만들기
          </Button>
            <Modal
                {...this.props}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                show={this.state.show} onHide={this.handleClose}
                onExited={this.props.onExited}
                centered
            >

            <Modal.Header closeButton>
              <Modal.Title>방만들기</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                방 제목 <InputText id="name" type="text" content="방 이름을 입력하세요" onChange={this.onChangetitle}/>
                인원 <InputText id="people" type="text" content="인원 입력하세요" onChange={this.onChangepeople}/>
                태그 <InputText id="tags" type="text" content="JAVA, JSP" onChange={this.onChangetags}/>
  
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
export default ChattingModal;