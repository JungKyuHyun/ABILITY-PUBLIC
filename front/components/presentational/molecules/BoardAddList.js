import React from 'react';
import { Question, Like, Answer } from '../atoms/LikeQnAComponent';


/**
 * @author  우세림
 * @summary 게시판 더 추가 된 리스트
 **/

const content = {
    marginBottom: "16px",
    color: "#565656",
    display: "grid",
    gridTemplateColumns: "5% 15% 50% 20% 10%",
} 

const css4 = {
    display: "flex",
}

export const BoardAddList = (props)=>{
    return (
        <>
            <div style={content}>
                <div style={props.css1}>{props.id}</div>
                <div style={props.css2}>{props.category}</div>
                <div style={props.css3}>
    
                </div>
                <div style={css4}>
                    <Question question={props.view}/> &nbsp;&nbsp;&nbsp;
                    <Like like={props.like}/> &nbsp;&nbsp;&nbsp;
                    <Answer answer={props.answer}/>
                </div>
                <div style={props.css5}>{props.day}</div>
            </div>
            <hr/>
        </>
    )
}


export default BoardAddList;