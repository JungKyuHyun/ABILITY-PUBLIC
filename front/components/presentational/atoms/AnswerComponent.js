import React from "react";
import {Card} from 'react-bootstrap';
import {ProfileImageComponent} from "./ProfileImageComponent";
import TagList from "../molecules/TagList";

const titlecss = {
  position : "Absolute",
  paddingLeft :"3.5em",
  paddingTop: "0.8em",
  margin : "0"

}
const labelcss = {
  width : "100%",
  border : "none",
  backgroundColor : "#ecf0f1",
  margin : "0"
}

const subcss = {
  position : "Absolute",
  paddingLeft : "60px",
  paddingTop : "-5px",
  fontSize : "11px"
}

const subcss2 = {
  position : "Absolute",
  paddingLeft : "150px",
  paddingTop : "-5px",
  fontSize : "11px"
}

const subcss3 = {
  paddingLeft : "230px",
  paddingTop : "-5px",
  fontSize : "11px"
}

const hrcss = {
  marginTop : "10px"
}

const cardcss = {
  paddingTop : "0px",
  paddingLeft : "10px"
}

/**
 * 
 * @auth 곽호원
 * @summary 답변의 수도 포함되어 있는 답변 컴포넌트
 * 
 */
export const AnswerComponent = (props) =>
<>
<label title="답변" value="답변" style={labelcss}>답변 {props.count}</label>
<Card>
        <>
        <ProfileImageComponent />
        <Card.Title style={titlecss}>제목을 입력해주세요하하하하하핳</Card.Title>  
        </>
        <Card.Body style={cardcss}>
          
          <Card.Subtitle style={subcss}>{props.writer}</Card.Subtitle>
          <Card.Subtitle style={subcss2}>{props.date}</Card.Subtitle>
          <Card.Subtitle style={subcss3}><TagList hashtag="java, javascript" /></Card.Subtitle>
          <>
          <hr style={hrcss}/>
          </>
          <Card.Text>글 내용</Card.Text>
        </Card.Body>
</Card>
</>