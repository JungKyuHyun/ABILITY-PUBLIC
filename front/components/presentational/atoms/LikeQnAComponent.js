import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCommentAlt,faThumbsUp,faEye, faMehRollingEyes, faLaugh,faGrinHearts,faAngry} from "@fortawesome/free-regular-svg-icons";

/**
 * @auth 신선하
 * @summary 추천수, 조회수, 답변수 컴포넌트
 * @see 정규현 컴포넌트 수정 / 시나리오에 맞게, 조건문 적용 
 */

 function changeUnit(value){
    let result = value;
    const strResult = result.toString();
    const strResultLength = result.toString().length;
    
    if(strResultLength >9){
        result = strResult.substr(0, strResultLength-9)+"G";
    }else if(strResultLength >6){
        result = strResult.substr(0, strResultLength-6)+"M";
    }else if(strResultLength >3){
        result = strResult.substr(0, strResultLength-3)+"K";
    }
    return result;
 }

export class Like extends Component { //추천수
    
    render(){
        const view = changeUnit(this.props.like);
        let icon = <div><FontAwesomeIcon icon={ faThumbsUp }/>{' '} {view}</div>;
        if(this.props.like<-9){
            icon = <div style={{color:"#EA2027",fontWeight:"bold"}}><FontAwesomeIcon icon={ faAngry }/>{' '} {view}</div>;
        }else if(this.props.like<0){
            icon = <div style={{color:"#EE5A24",fontWeight:"bold"}}><FontAwesomeIcon icon={ faMehRollingEyes }/>{' '} {view}</div>;
        }else if(this.props.like>9){
            icon = <div style={{color:"#9b59b6",fontWeight:"bold"}}><FontAwesomeIcon icon={ faLaugh }/>{' '} {view}</div>;
        }else if(this.props.like>29){
            icon = <div style={{color:"#8e44ad",fontWeight:"bold"}}><FontAwesomeIcon icon={ faGrinHearts }/>{' '} {view}</div>;
        }else if(this.props.like>0){
            icon = <div style={{color:"#FDA7DF",fontWeight:"bold"}}><FontAwesomeIcon icon={ faThumbsUp }/>{' '} {view}</div>;
        }
        return(
            <>
             {icon}
            </>
        );
    }
}

export class Question extends Component { //조회수
    
    render(){
        const view = changeUnit(this.props.question);
        let qColor = "";
        const css = {
            color: "",
            fontWeight:""   
        };
        if(this.props.question>1000){
            qColor = "#1e90ff";
            css.color = qColor;
            css.fontWeight = "bold";
        }else if(this.props.question>1000000){
            qColor = "#5352ed";
            css.color = qColor;
            css.fontWeight = "bold";
        }else if(this.props.question>1000000000){
            qColor = "#3742fa";
            css.color = qColor;
            css.fontWeight = "bold";
        }

        return(
            <div style={css}>
                <FontAwesomeIcon icon={ faEye }/>{' '} {view}
            </div>
        );
    }
}


export class Answer extends Component { //답변수
    render(){
        const view = changeUnit(this.props.answer);
        return(
            <div style={{color:(this.props.answer>0?"#009432":""), fontWeight:(this.props.answer>0?"bold":""),}} >
                <FontAwesomeIcon icon={ faCommentAlt }/>{' '} {view}                 
            </div>
        );
    }
}