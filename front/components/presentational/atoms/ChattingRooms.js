import React, { Component } from 'react';
import ChatTagList from '../molecules/ChatTagList';
import { ButtonComponent } from './ButtonComponent';
import axios from 'axios';
import {chat_chatcard,chat_title,chat_usercount,chat_hr2,chat_tag_div,chat_tag,chat_btn_div} from '../../container/organisms/css/Chatting'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { UserImageComponent2 } from './UserImageComponent';
import Link from 'next/link';
import swal from 'sweetalert';
import { InputText } from './InputboxComponent';
import { Form } from 'react-bootstrap';
/**
 * 
 * @author 강기훈
 * @summary 채팅방 컴포넌트  
 */

const backUrl = process.env.NODE_ENV === 'production'? "?" : "?";



 const chat_btn = {
    width: "100%"
 }
  const icon ={
    textAlign:"right",
 } 
  const userList={
      height:"100px",
      display:"flex",
      justifyContent:"center",
      margin:"90px 0 30px 0"
  }
  const userImage={
      width:"40px",
      height:"40px",
      marginRight:"5px"
  }
class ChattingRooms extends Component{
  constructor(props){
      super(props);  
       this.deleteRoom = this.deleteRoom.bind(this);
       this.getUserInfo = this.getUserInfo.bind(this);

      this.state = {
          title:props.title,
          roomId:props.roomId,
          roomUserMaxCount:props.roomUserMaxCount,
          tags:props.tags,
          link:props.link,
          userList:[],
          userCount:0,
          userRole:""
        
      }
  }
  async componentDidMount(){
          this.setState({
              userRole:localStorage.getItem('role_name'),
              isDelete:0
          })
      await axios.get(endpoint2,{
          params:{roomID: this.state.roomId}
      }).then(response =>{
          this.setState({
             userList:response.data
          })
      })
      await axios.get(endpoint3, {
          params:{
              roomID: this.state.roomId
          }
      }).then(response=>{
          this.setState({
             userCount:response.data
          })
      })
  }
   deleteRoom(){
    swal({
        text: "채팅방을 정말 삭제하시겠습니까?",
        title: "채팅방 삭제",
        icon: "/static/image/Logo2.png",
        buttons: true
    })
    .then((deleteok)=>{
       if(deleteok){
         axios.get(endpoint,{
            params:{
                roomId:this.state.roomId
            }
        })
       }
    })
}
async getUserInfo(){
if(!localStorage.getItem('nick_name')){
    swal({
        text: "로그인이 필요합니다!",
        title: "Login",
        icon: "/static/image/Logo2.png",
        buttons: true
    })
}else if(this.state.userCount==this.state.roomUserMaxCount){
    swal({
        text: "인원이 가득 찼습니다!",
        title: "인원 초과",
        icon: "/static/image/Logo2.png",
        buttons: true
    })
}else if(localStorage.getItem('reputation')<20){
    swal({
        text: "능력치가 20이상이여야 입장이 가능합니다!",
        title: "능력치 부족",
        icon: "/static/image/Logo2.png",
        buttons: true
    })
}
else{


  let nick_name = localStorage.getItem('nick_name');
  let user_image= localStorage.getItem('user_image');
  let userid = localStorage.getItem('userid');
  const forms = document.chat;
  window.open('',"chatting",'width=1000, height=700, toolbar=no, menubar=no,resizable=yes,location=no', "chatting");
  if(forms[0].type){
    forms.action = this.state.link;
    forms.method ="post";
    forms.target ="chatting";
    forms.userid.value = userid;
    forms.user_image.value = user_image;
    forms.nick_name.value = nick_name;
    forms.submit();
  }else{
  forms[this.props.index].action = this.state.link;
  forms[this.props.index].method ="post";
  forms[this.props.index].target ="chatting";
  forms[this.props.index].userid.value = userid;
  forms[this.props.index].user_image.value = user_image;
  forms[this.props.index].nick_name.value = nick_name;
  forms[this.props.index].submit();
  }
  }
}
render(){
    let props = this.state;
    const userLists = props.userList.map((user)=>{
        return <Link href={{pathname: "/developer/page" , query:{userid: user.userid} }}><a title={user.nick_name}><UserImageComponent2 css={userImage} imagepath = {user.user_image}/></a></Link>
    });
    return(
<>
   
<div id="container" onMouseOver={(()=>{
   var m;
   m = document.getElementById(`${props.title}`);
   if(this.state.userRole=='ROLE_ADMIN'){
    m.style.visibility = "visible";
   }
}).bind(this)} onMouseOut={(()=>{
    var m;
    m = document.getElementById(`${props.title}`);
    m.style.visibility = "hidden"
}).bind(this)} >
<div style={icon}><FontAwesomeIcon icon={faTimes} id={props.title} onClick={this.deleteRoom}/></div>
<div className="chat_chatcard usercard" style={chat_chatcard}>
    <div className="chat_title_div">
        <div className="chat_title" style={chat_title}>{props.title}</div>
         <div className="chat_usercount" style={chat_usercount}>{props.userCount} / {props.roomUserMaxCount}명</div> 
    </div >
    <hr className="chat_hr2" style={chat_hr2}/>
    <div className="chat_tag_div" style={chat_tag_div}>
        <ChatTagList hashtag={props.tags} className="chat_tag" style={chat_tag} />
    </div>
    <div style={userList}> 
    {userLists}
    </div>
    <div className="chat_btn_div" style={chat_btn_div}>
       <Form name="chat">
            <InputText type="hidden" name="userid" value=""></InputText>
            <InputText type="hidden" name="nick_name" value=""></InputText>
            <InputText type="hidden" name="user_image" valeu=""></InputText>
       </Form>
            <ButtonComponent onclick={this.getUserInfo} id="enterRoom" css={chat_btn} name="입장하기"/>
    </div>
</div>
</div>
</>
    )}
}
export default ChattingRooms