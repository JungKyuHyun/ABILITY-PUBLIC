import React from 'react';
import Image from 'react-bootstrap/Image';


/**
 * 
 * @author 강기훈
 * @summary 게시글 프로필이미지 컴포넌트 
 */
const css={
    width:"32px",
    height:"32px",
    border:"1px solid #CDCECF",
    marginRight: "0.5rem",
    marginTop: "0.8rem"
}

export const ProfileImageComponent=(props)=>
      <Image style={props.css?props.css: css} src={props.user_image ? props.user_image : ""} roundedCircle/>
      