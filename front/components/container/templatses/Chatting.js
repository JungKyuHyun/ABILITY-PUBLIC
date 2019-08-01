import React,{Component} from 'react';
import ChattingRooms from '../../presentational/atoms/ChattingRooms';
import ChattingModal from '../../presentational/atoms/ChattingModal';
import { GridArea } from '../organisms/GridArea';
import TitleComponent from '../../presentational/atoms/TitleComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

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

class Chatting extends Component {
    constructor(props){
        super(props);

        this.state = {
           roomList :[]
        }
    }
    async componentDidMount(){
        await axios.get(EndPoint).then(response=>{            
            this.setState({
                roomList:response.data
            })
        })
    }
    render(){
        const RoomList = this.state.roomList.map((room)=>{
            return <ChattingRooms key={room.roomId} roomId={room.roomId} title={room.name} tags={room.tags} roomUserMaxCount={room.people} link={EndPoint2+"/chat/room/"+room.roomId}/>
        });
      
        return(
            <GridArea>
                <div className="chat_sub_div">
                    <TitleComponent title="채팅">
                        <FontAwesomeIcon icon={faComments}/>
                    </TitleComponent>
                    <div className="chat_sub_btn">
                        <ChattingModal name="방만들기"/>
                    </div>
                </div>

                <div style={chat_hr}>
                </div>

                <div className="chat_rooms">
                   {RoomList}
                </div>
            </GridArea>
        );
    }

}
export default Chatting;
