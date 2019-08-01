import React from 'react';
import { AbilityComponent2 } from '../atoms/AbilityComponent';

/**
 * 
 * @author 우세림
 * @summary 개발자들 상세 페이지 프로필 정보
 * 
 */
const userContentId ={
    width: "100%",
    fontSize: "29px",
    fontWeight: "700"
}

const userContentDiv ={
    marginBottom: "20px"
}

const userContentAbili ={
    fontSize: "16px",
    marginLeft: "15px"
}

const userContentEmail ={
    width: "100%",
    color: "#57606f",
    display: "inline-block",
    marginTop: "15px"
}

const usermaster={
    display: "inline-block",
    marginBottom: "4px"
}

const userContentIntro ={
    width: "100%",
    height: "70%",    
    display: "inline-block",
    marginTop: "10px",
    overflow: "auto",
    backgroundColor: "#f2f2f2",
    padding: "10px"
}


export const UserProfile = (props)=> {
    return (
        <>
            <span style={userContentId}>
                {props.nick_name}
            </span>
            <span style={userContentAbili}>
                <AbilityComponent2 val={props.reputation}/>
            </span>
            <span style={userContentEmail}>
                {props.name} &nbsp; {props.email}
            </span>
            <span style={userContentIntro}>
                <div dangerouslySetInnerHTML={ {__html:props.user_info } } ></div>
            </span>
        </>
    )
}

export const UserProfile2 = (props)=> {
    return (
        <div style={userContentDiv}>
            <span style={userContentId}>
                {props.company_name}
            </span> &nbsp; <a href={props.homepage_url}>{props.homepage_url}</a>
            <span style={userContentEmail}>
                <span style={usermaster}>담당자 : &nbsp; {props.name} </span> <br/>
                <span style={usermaster}>담당자 이메일: &nbsp; {props.email} </span>
            </span>
        </div>
    )
}

export const UserProfile3 = (props)=> {
    return (
        <>
            <span style={userContentIntro}>
                <div dangerouslySetInnerHTML={ {__html:props.company_info } } ></div>
            </span>
        </>
    )
}
export default UserProfile;