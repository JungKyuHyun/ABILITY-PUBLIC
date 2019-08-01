import React from 'react';
import Image from 'react-bootstrap/Image';

/**
 * 
 * @author 강기훈
 * @summary 유저게시판 프로필이미지 컴포넌트 
 * @see 정규현 / 이미지 컴포넌트 추가 / props 형태로 바꿈
 * 
 */

export const UserImageComponent=(props)=>
      <Image style={props.css} src="" thumbnail/>

export const UserImageComponent2 = (props) =>
      <Image style={props.css} src={props.imagepath} id={props.id} thumbnail/>