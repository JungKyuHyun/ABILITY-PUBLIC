import React, {Component} from 'react';
import ChattingRooms from '../../components/presentational/atoms/ChattingRooms';
import ChattingModal from '../../components/presentational/atoms/ChattingModal';
import TitleComponent from '../../components/presentational/atoms/TitleComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import {chat_sub_div,chat_sub_btn,chat_rooms} from '../../components/container/organisms/css/Chatting';
import { Row, Col, Image } from 'react-bootstrap';
import { ButtonComponent } from '../../components/presentational/atoms/ButtonComponent';
import Link from 'next/link';
/**
 * 
 * @author 강기훈
 * @summary 채팅 게시판 페이지 
 * @see 정규현 메인 타이틀 컴포넌트로 통일 
 */
const EndPoint = process.env.NODE_ENV === 'production'? "?" : "?";

const EndPoint2 = process.env.NODE_ENV === 'production'? "?" : "?";

const chat_hr = {
    height: "420px",
    width: "48.5%",
    position: "absolute",
    borderRight: "1px solid #d6d6d6",
    zIndex: "-1"
};

const empty = {
    textAlign:"center",
}

const title ={
    textAlign : 'center',
    fontSize : '36px',
    margin : '1rem 0 0.5rem 0'
    }

const middle = {
    textAlign : 'center',
    fontSize : '18px',
    marginBottom : '0.5rem'
    }

const content = {
    textAlign : 'center',
    fontSize : '17px',
    marginBottom : '1rem'    
    }

const img = {
    width : "30%",
    height : "auto",
    lineHeight : 'auto',
    verticalAlign : 'middle',
    textAlign : "center"
    }

const textAlignCenter = {
    textAlign : 'center'
    }

const fontColor = {
    color:'#5F4B8B'
    }

    
class Board extends Component {
    constructor(props){
        super(props);

        this.state = {
           roomList :[],
            userRole:"",
            delete:false
        }
        this.getlist = this.getlist.bind(this);
        this.createRoomButton = this.createRoomButton.bind(this);
        this.deleteRoomButton = this.deleteRoomButton.bind(this);
    }
    async componentDidMount(){
        await this.getlist();
        this.setState({
            userRole:localStorage.getItem("role_name")
        })
    }

    getlist(){
        axios.get(EndPoint).then(response=>{
            this.setState({
                roomList:response.data
            })
        });
    }
   createRoomButton(){
      if(this.state.userRole==='ROLE_ADMIN'){
            return  <ChattingModal name="방만들기" onExited={this.getlist}/>
      }
   }
  deleteRoomButton =()=>{
       this.setState({
           delete:true
       })
   }
    render(){
        const roomButton = this.createRoomButton();
        const RoomList = this.state.roomList.map((room,index)=>{
            return <ChattingRooms key={room.roomId} roomId={room.roomId} title={room.name} tags={room.tags} roomUserMaxCount={room.people} link={EndPoint2+"/chat/room/"+room.roomId} index={index}/>
        });
        return(
              <>
                <div className="chat_sub_div" style={chat_sub_div}>
                    <TitleComponent title="채팅">
                        <FontAwesomeIcon icon={faComments} style={{width:"45px"}}/>
                    </TitleComponent>
                    <div className="chat_sub_btn" style={chat_sub_btn}>
                       {roomButton}
                    </div>
                </div>
                <div id="chathr" style={chat_hr}>
                </div>
                <div className="chat_rooms" style={chat_rooms}>
                {RoomList.length !=0 ? RoomList :
                        <>
                            <div style={empty}>
                            <br/>      
        
        <Row>
            <div style={textAlignCenter}>
            <Image 
                src="/static/image/penguin.png" 
                alt="404"  
                style={img}               
                />
            </div>
        </Row>
        <Row>
            <Col sm={6} md={12} style={{padding:'0 0 0 30px'}}>
                <div style={title}>
                    <b>
                     현재 개설된 방이 <span style={fontColor}> 없습니다.
                    </span>
                    </b>
                </div><br/>                
                <div style={middle}>
                    <b>
                  개설된 방이 없어 채팅에 참여할 수 없습니다.
                    </b>
                </div>

                <div style={content}>
                관리자에게 별도로 문의하거나 연락주시길 바랍니다.<br/>
                
                </div><br/>
                <div style={textAlignCenter}>
                    <Link href="/">
                        <a><ButtonComponent name="메인페이지 바로가기" /></a>
                    </Link>                    
                </div>
            </Col>
        </Row>
        <br/>
                            </div>
                                
                        </>}
                </div>
              </>
                
        );
    }

}

export default Board;