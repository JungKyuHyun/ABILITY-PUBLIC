import React, { Component } from 'react';
import { GridArea } from "../organisms/GridArea"
import { Container, Row, Col } from 'react-bootstrap';
import ProfileImageUserid from '../../presentational/molecules/ProfileImageUserid';
import { InputText } from '../../presentational/atoms/InputboxComponent';
import CkeditorOne from '../../presentational/atoms/CkeditorOne';
import { ButtonComponent } from '../../presentational/atoms/ButtonComponent';
import axios from 'axios';
/**
 * 
 * @auth 곽호원 
 * @summary 글쓰기 상세 페이지
 * 
 * @auth 정진호
 * @version selectmenu 반복문처리
 */

const buttoncss = {
    textAlign: "right"
}

const cardcss={
    margin : "0px",
    padding : "0px"
}
let userid = window.sessionStorage.getItem('userid');

const WriteDetail = () =>{
    
    return(
    <>
    <GridArea >
        <Container >
            <br />
                <h3 className="title">#질의응답</h3>
            <br/>
            {tabpanel()}
            <br/> 
        </Container>
    </GridArea>
    </>
    )
}

const backUrl = process.env.NODE_ENV === 'production'? "?" : "?";

export class Contents extends Component {

    async onSubmit() {
        const contentEndPoint = backUrl+"/question/insert?";
        let title = "";
        let tags = "";
        let con = "";
        if(document.getElementById('title') !== null || document.getElementById('title') !== "" || document.getElementById('title') !== undefined){
            title = document.getElementById('title').value;
        }else{
            alert("제목을 입력해주세요.");
            return
        }
        if(document.getElementById('ckvalue').innerHTML !== null || document.getElementById('ckvalue').innerHTML !== "" || document.getElementById('ckvalue').innerHTML !== undefined) {
              con =  document.getElementById('ckvalue').innerHTML;
           }
        if(document.getElementById('tags') !== null || document.getElementById('tags') !== "" || document.getElementById('tags') !== undefined) {
            tags = document.getElementById('tags').value;
        }
        let {data : result} = await axios.get(contentEndPoint,{
            params : {
                userid: 58,
                title: title,
                content: con,
                tags: tags
            }
        }).catch((res)=> {console.log(res)});
        if(result > 0){
            alert("등록 성공");
            window.history.go(-1); 
        }else {
            alert("등록실패");
        }
    }

    render(){ 

        return(
            <Row>
            <Col>
                <div className="tab-content" id="nav-tabContent">
                    <form action="" method="post">
                    <div id="dropdown-item">
                    <ProfileImageUserid style={cardcss} writer={userid} />
                    </div>
                        <InputText id="title" content="제목을 입력해주세요" />
                        <InputText id="tags" content="Tags" />
                        <CkeditorOne  />
                    <hr />
                    <div style={buttoncss}>
                        <ButtonComponent name="취소" /> &nbsp;&nbsp;
                        <ButtonComponent name="등록" onclick={this.onSubmit.bind(this)} />
    
                    </div>
                    </form>
                </div>
            </Col>
            </Row>
    
        )
        
    }

}
export const tabpanel =() => {
    return(
    <div className="tab-content" id="nav-tabContent">
         <div key="1" className="tab-pane fade show active" id="question" role="tabpanel" aria-labelledby="board-list-question">
         <Contents/>
        </div>
    </div>
    )
}     
export default WriteDetail;


