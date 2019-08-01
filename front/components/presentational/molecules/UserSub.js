import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhoneAlt, faMapMarkedAlt, faUserClock, faEdit, faAt } from '@fortawesome/free-solid-svg-icons';

/**
 * 
 * @author 우세림
 * @summary 개발자들 상세 페이지 부가정보
 * 
 */
const userSubDate = {
    width: "100%",
    display: "inline-block",
    fontSize: "13px",
    marginBottom: "5px"
}

export const UserSub = (props)=> {
    return (
        <>
        <span style={userSubDate}>
            <FontAwesomeIcon icon={ faPhoneAlt } style={{width:"1em",height:"auto"}} />
            &nbsp; {props.tel?props.tel:"등록한 번호가 없습니다."}
        </span>
        <span style={userSubDate}>
            <FontAwesomeIcon icon={ faMapMarkedAlt } style={{width:"1em",height:"auto"}}/>
            &nbsp; {props.area?props.area:"등록한 위치가 없습니다."}
        </span>
        <span style={userSubDate}>
            <FontAwesomeIcon icon={ faUserClock } style={{width:"1em",height:"auto"}}/>
            &nbsp; {props.date_created?props.date_created:"-"} 에 가입
        </span>
        <span style={userSubDate}>
            <FontAwesomeIcon icon={ faEdit } style={{width:"1em",height:"auto"}}/>
            &nbsp; {props.last_updated?props.last_updated:"-"} 프로필 수정
        </span>
        </>
    )
}

export const UserSub2 = (props)=> {
    return (
        <>
        <span style={userSubDate}>
            <FontAwesomeIcon icon={ faPhoneAlt } style={{width:"1em",height:"auto"}} />
            &nbsp; {props.tel?props.tel:"등록한 번호가 없습니다."}
        </span>
        <span style={userSubDate}>
            <FontAwesomeIcon icon={ faAt } style={{width:"1em",height:"auto"}}/>
            &nbsp; {props.company_email?props.company_email:"등록한 이메일이 없습니다."}
        </span>
        <span style={userSubDate}>
            <FontAwesomeIcon icon={ faUserClock } style={{width:"1em",height:"auto"}}/>
            &nbsp; {props.date_created?props.date_created:"-"} 에 등록
        </span>
        <span style={userSubDate}>
            <FontAwesomeIcon icon={ faEdit } style={{width:"1em",height:"auto"}}/>
            &nbsp; {props.last_updated?props.last_updated:"-"} 기업정보 수정
        </span>
        </>
    )
}

export default UserSub;