import React from 'react';
import Image from 'react-bootstrap/Image';


/**
 * 
 * @author 우세림
 * @summary 채팅창 텍스트 박스
 */
const css = {
    display: "grid",
    gridGap: "3px",
    gridTemplateColumns: "70px 80% 10px",
    gridTemplateRows: "30px 0px",
    marginBottom: "10px"
}

const css2 = {
    width: "30px",
    height: "30px",
    marginLeft: "40px"
}

const css3 = {
    fontSize: "11px",
    textAlign: "right",
    gridArea: "3/1/4/2", 
    textOverflow: "ellipsis",
    overflow: "hidden"
}

const css4 = {
    fontSize: "14px",
    backgroundColor: "#f7f7f7",
    gridArea: "1/2/4/3",
    padding: "16px",
    borderRadius: "7px 7px 7px 7px",
    marginLeft: "10px"
}

const css5 = {
    fontSize: "12px",
    gridArea: "3/3/4/4",
    marginLeft: "5px",
    marginBottom: "0px",
    marginTop: "auto",
    color: "#878787"
}


export const ChattingProfile=(props)=>
    <div style={css}>
        <Image style={css2} src="&ssl=1" thumbnail/>
        <div style={css3}>{props.id}</div>
        <div style={css4}>{props.comments}</div>
        <div style={css5}>{props.time}</div>
    </div>
                   




     