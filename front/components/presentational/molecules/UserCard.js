import React from 'react';
import Link from 'next/link';
import {UserImageComponent2} from '../atoms/UserImageComponent';

/**
 * 
 * @author 강기훈
 * @summary 유저 게시판 유저 카드 컴포넌트 
 * @see 정규현 이미지 꽉차게 css 수정
 */

const Usercard_css={
    display:"flex"
  }

const Username_css={
  fontSize:"13px"
}

const userImgae_css={
    width:"50px",
    height:"50px",
    border:"1px solid #CDCECF",
    margin : "4px 5px 5px 0px",
    top:"0",
    left: "0",
    padding:"0"
}

const UserInfo_css={
    display:"flex",
    flexDirection:"column",
    marginLeft:"5px",
    fontSize:"10px"   
}

const UserCard=(props)=>
  <>
  
      <div style={Usercard_css} className="usercard">
            <UserImageComponent2 imagepath={props.userImage} css={userImgae_css}/>
            <div style={UserInfo_css}>
              <Link href={{pathname: "/developer/page" , query:{userid: props.userid} }} as={"/developer/page/"+props.userid}><a style={Username_css}>{props.name}</a></Link>
              <span>{props.area}</span>
              <span>{props.reputation}</span>
              <span>{props.tags}</span>
            </div>
      </div>
  </>

export default UserCard;