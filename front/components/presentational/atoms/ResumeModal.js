import React, {Component} from 'react';
import { Modal, Button} from 'react-bootstrap';
import { InputText } from '../atoms/InputboxComponent';
import axios from 'axios';
import LodingComponent from './LodingComponent';
/**
 * 
 * @author 정진호
 * @summary 이력서 메일 보내기
 * 
 */

const backUrl = process.env.NODE_ENV === 'production'? "?" : "?";
class ResumeModal extends Component {
    constructor(props, context) {
      super(props, context);
      
      this.handleShow = this.handleShow.bind(this);
      this.handleClose = this.handleClose.bind(this);
      this.handlesubmit = this.handlesubmit.bind(this);
      this.onChangeIntroduce = this.onChangeIntroduce.bind(this);
      this.onChangeFile = this.onChangeFile.bind(this);

      this.state = {
        show: false,
        email : this.props.email,
        file: "",
        filename:"",
        introduce:"",
        loading : true
      };
    }
    onChangetitle(e){
      this.setState({
        name : e.target.value
      })
    }
    onChangeIntroduce(e){
      this.setState({
        introduce : e.target.value
      })
    }
    onChangeFile(e){
        this.setState({
            file:e.target.files[0],
            filename:e.target.files[0].name
        })
    };

  

     handlesubmit() {
       const manager = this.props.email
       if(manager !== "" && this.state.file !== "" && this.state.introduce.trim().length !== 0){
        let Forms = new FormData();
        Forms.append("resume",this.state.file);
        Forms.append("email",manager);
        Forms.append("introduce",this.state.introduce);
      this.setState({
        loading : false
      },()=>{
          axios({
          method :'post',
          baseURL : backUrl,
          data : Forms,
          headers :{'Content-Type':'multipart/form-data'}
          }).then((res)=>{
            this.setState({
              loading:true
            });
          if(res.data === "success"){
            swal({
              text: "이력서가 정상적으로 전달되었습니다.",
              title: "지원 완료",
              timer: "10000",
              icon: "/static/image/Logo2.png"
              }).then(()=>{
                      this.setState({ show: false });
                  });
          }else{
            swal({
              text: "Error.Code- 407D89C92A113",
              title: "지원 실패",
              timer: "10000",
              icon: "/static/image/Logo2.png"
            });
          }

  
      }).catch((xhr)=>{
          console.log(xhr);
      });
    });
  }else{
    swal({
      text: "Error.Code- 407D89C92A113",
      title: "빈칸을 입력해주세요.",
      timer: "10000",
      icon: "/static/image/Logo2.png"
    });
  }


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
           
                {!this.state.loading && <LodingComponent/>}
          <Button variant="primary" onClick={this.handleShow}>
            지원하기
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
              <Modal.Title>이력서 지원</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                한줄 소개 <InputText id="introduce" type="text" content="간단한 소개를 입력해주세요." onChange={this.onChangeIntroduce}/>
                이력서 첨부  <InputText label="첨부하기" id="resume" name="file" accept=".hwp , .xls , xlsx"
                                       className="resume" for="resume" type="file" name="file" onChange={this.onChangeFile}/><span style={{margin : "23px 0px 0px 23px", color:"rgb(205, 97, 51)"}}>{this.state.filename !== "" ? this.state.filename+"을 선택하였습니다." : "파일이 없습니다."}</span> 
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose}>
                취소
              </Button>
              <Button variant="primary" onClick={this.handlesubmit}>
                지원하기
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      );
    }
  }
export default ResumeModal;