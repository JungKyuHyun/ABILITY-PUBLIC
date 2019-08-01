import React from 'react';
import UserCard from '../molecules/UserCard';
import {NavLink} from 'react-router-dom';


/**
 * 
 * @author 우세림
 * @summary 20190620 채팅 중인 유저정보
 * 
 */
const css={
    border:"1px solid #dfe6e9",
    width:"240px",
    height:"100%",
    borderRadius:"6px",
    boxShadow:"1px 1px #b2bec3",
    marginBottom:"20px"
}

const css2 = {
    marginTop:"10px",
    fontWeight:"bold",
    color:"#5F4B8B"
}

const css3 = {
    height:"35px",
    borderBottom:"1px solid #dfe6e9",
    paddingLeft:"15px",
    paddingRight:"15px"
}

const css4 = {
    textAlign: "center",
    marginBottom: "10px"
}


const ChattingUser = (props) =>
    <div style={css}>
        <div style={css3}>
            <h5 style={css2}>{props.title}</h5>
        </div>
        <UserCard id={props.id} name={props.name} area={props.area} reputation={props.reputation}/>
        <div style={css4}>
            <NavLink>더보기</NavLink>
        </div>
    </div>

export default ChattingUser;