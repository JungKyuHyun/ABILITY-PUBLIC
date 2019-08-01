import React from 'react';
import {Container} from 'react-bootstrap';
import {ChattingProfile} from '../../presentational/molecules/ChattingProfile';
import ChattingRooms from '../../presentational/atoms/ChattingRooms';
import ChattingUser from '../../presentational/molecules/ChattingUser';
import {UserImageComponent} from '../../presentational/atoms/UserImageComponent';
import {InputTextBtn} from '../../presentational/atoms/InputboxComponent';



const chatdetail = {
    display: "grid",
    gridTemplateColumns:"75% 25%"
}

const chatdetail_chat = {
    padding: "10px",
    gridArea: "1 / 1 / 2 / 2",
    minHeight: "700px",
    display: "table"
}

const chatdetail_box ={
    width: "100%",
    minHeight: "700px",
    verticalAlign: "bottom",
    display: "table-cell",
    overflowY: "hidden auto"
}

const chatdetail_sub = {
    padding: "0px 0px 0px 10px",
    gridArea: "1/2/2/3",
}

const chatdetail_text = {
    textAlign: "center",
    fontSize: "12px",
    color: "#515151",
    margin: "20px auto",
}

const chatdetail_write = {
    display: "flex",
    position:"fixed",
    bottom:"0",
    width:"100%",
    height:"85px",   
    background:"#ede8ed",
}

const chat_userimg ={
    width: "55px",
    height: "55px",
    margin: "15px"
}

const chat_usertext ={
    width: "300px",
    height: "55px",
    margin: "auto"
}

const chat_logo ={
    width: "140px",
    height: "28px",
    marginLeft :"24%",
    marginTop : "2%"
}


const ChattingDetail = () => {
    return(
    <Container style={chatdetail}>
            <div style={chatdetail_chat}>
                <div style={chatdetail_box}>
                    <div style={chatdetail_text}>
                        2019년 9월 13일
                    </div>
                    <div style={chatdetail_text}>
                        우세림님이 입장 했습니다.
                    </div>
                    <div>
                        <ChattingProfile id="seri53ff5" comments="밥먹자 " time="17:33"/>
                        <ChattingProfile id="se222255" comments="밥먹자 " time="17:33"/>
                        <ChattingProfile id="serim09rrrrrrrrrrrrrr1222255" comments="밥먹자 "time="17:33"/>
                        <ChattingProfile id="seri53ff5" comments="밥먹자 "time="17:33"/>
                        <ChattingProfile id="serim091222255" comments="글요소를 block 값으로 변경했기에 자동적으로 요소의 너비는 부모 너비의 100%를 차지하도록 변경된다. 만약 inline-block 과 같이 콘텐츠에 따라 유동적인 너비를 가진다면 직접 요소의 너비를 설정해야 한다. 즉, 일정한 고정된 너비를 가지는 것이 전제 조건이다." time="17:33"/>
                        <ChattingProfile id="seri53ff5" comments="밥먹자 "time="17:33"/>
                        <ChattingProfile id="seri53ff5" comments="밥먹자 " time="17:33"/>
                        <ChattingProfile id="se222255" comments="밥먹자 " time="17:33"/>
                        <ChattingProfile id="serim09rrrrrrrrrrrrrr1222255" comments="밥먹자 "time="17:33"/>
                        <ChattingProfile id="seri53ff5" comments="밥먹자 "time="17:33"/>
                        <ChattingProfile id="serim091222255" comments="글요소를 block 값으로 변경했기에 자동적으로 요소의 너비는 부모 너비의 100%를 차지하도록 변경된다. 만약 inline-block 과 같이 콘텐츠에 따라 유동적인 너비를 가진다면 직접 요소의 너비를 설정해야 한다. 즉, 일정한 고정된 너비를 가지는 것이 전제 조건이다." time="17:33"/>
                        <ChattingProfile id="seri53ff5" comments="밥먹자 "time="17:33"/>
                        <ChattingProfile id="seri53ff5" comments="밥먹자 " time="17:33"/>
                        <ChattingProfile id="se222255" comments="밥먹자 " time="17:33"/>
                        <ChattingProfile id="serim09rrrrrrrrrrrrrr1222255" comments="밥먹자 "time="17:33"/>
                        <ChattingProfile id="seri53ff5" comments="밥먹자 "time="17:33"/>
                        <ChattingProfile id="serim091222255" comments="글요소를 block 값으로 변경했기에 자동적으로 요소의 너비는 부모 너비의 100%를 차지하도록 변경된다. 만약 inline-block 과 같이 콘텐츠에 따라 유동적인 너비를 가진다면 직접 요소의 너비를 설정해야 한다. 즉, 일정한 고정된 너비를 가지는 것이 전제 조건이다." time="17:33"/>
                        <ChattingProfile id="seri53ff5" comments="밥먹자 "time="17:33"/>
                        <ChattingProfile id="seri53ff5" comments="밥먹자 "time="17:33"/>
                        <ChattingProfile id="serim091222255" comments="글요소를 block 값으로 변경했기에 자동적으로 요소의 너비는 부모 너비의 100%를 차지하도록 변경된다. 만약 inline-block 과 같이 콘텐츠에 따라 유동적인 너비를 가진다면 직접 요소의 너비를 설정해야 한다. 즉, 일정한 고정된 너비를 가지는 것이 전제 조건이다." time="17:33"/>
                        <ChattingProfile id="seri53ff5" comments="밥먹자 "time="17:33"/>
                    </div>
                </div>
            </div>

            <div xs={4} style={chatdetail_sub}>
                <div>
                    <ChattingRooms id="wooo33" title="자유채팅방" content="아무나 와요" master="kihoon" tags="java, jsp" roomUserCount="7" />
                </div>
                <div>
                    <ChattingUser title="접속중인 이용자" id="ssad" name="홍길동" area="Korea"/>
                </div>
            </div>

            <div style={chatdetail_write}>
                <UserImageComponent css={chat_userimg}/>
                <InputTextBtn css={chat_usertext} content="채팅을 입력해주세요." name={<i class="fas fa-plus"></i>}/>

                <img src="../../../image/Logo.png" alt="..." style={chat_logo}></img>
            </div> 
    </Container>
    )
}

export default ChattingDetail;