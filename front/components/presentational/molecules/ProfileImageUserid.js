import React from 'react';
import { Card, Col} from "react-bootstrap";
import { ProfileImageComponent } from "../atoms/ProfileImageComponent";

/**
 * 
 * @auth 곽호원
 * @summary 프로필 이미지 + 아이디 보여주는 컴포넌트
 * 
 */
const cardcss = {
  display: "grid",
  width: "100%"
}

const colcss = {
  marginBottom : "0.8rem",
}
const spancss = {
  position: "relative",
  top: "0.5rem"
}
const ProfileImageUserid = (props) => {
  return (
      <Card style={cardcss}>
        <Col style={colcss}>
          <ProfileImageComponent  user_image={props.user_image} /><span style={spancss}>{props.writer}</span>
        </Col>
      </Card>
  );
};

export default ProfileImageUserid;