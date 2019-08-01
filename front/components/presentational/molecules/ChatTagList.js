import React from 'react';
import Badge from 'react-bootstrap/Badge';
import Link from 'next/link';
/**
 * 
 * @author 정규현
 * @summary props 값으로 tags= ? 값을 넘겨주면 , (콤마)로 값을 구분해서 태그를 생성해 줌.
 * 
 * @version 수정 정진호--태그 통일
 * @version 수정 정규현--Modify TagList Scope
 */
const tagcss = {
    marginRight : "0.2rem",
    backgroundColor: "#D1BADF",
}
const tag = {
    color:"white",
    textDecoration:"none"
}

const ChatTagList = (props) =>{
    const taglist = [];
    if(props.hashtag !== null && props.hashtag !== "" && props.hashtag !== undefined){
        const list = props.hashtag.split(',');
        for(var i=0; i<list.length; i++){
            taglist.push(list[i]);
        }
        const hashtags = taglist.map((value, index)=>(
            <Badge key={index} variant="light" style={tagcss} id={"tag"+index}>
                <Link key={index} href="/tag"><a style={tag}>{value}</a></Link>
            </Badge>));

        return(
            <>
                <h6>{hashtags}</h6>
            </>
        )
    }else{
        return(
            <h6> </h6>
        );
    }
}

export default ChatTagList;