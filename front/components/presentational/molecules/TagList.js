import React from 'react';
import Badge from 'react-bootstrap/Badge';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

/**
 * @author 정규현
 * @summary props 값으로 tags= ? 값을 넘겨주면 , (콤마)로 값을 구분해서 태그를 생성해 줌.
 * 
 * @version 수정 정진호--태그 통일
 * @version 수정 정규현--Modify TagList Scope
 * @see 정규현 중복값 제거
 */

const tagcss = {
    marginRight : "0.2rem",
    paddingBottom:"0.24rem"
};

const tagcss2= {
    backgroundColor:"#5F4B8B",
    marginRight : "0.2rem",
    paddingBottom:"0.24rem"
};

const TagList = (props) =>{
    const taglist = [];
    if(props.hashtag !== null && props.hashtag !== "" && props.hashtag !== undefined){
        const list = props.hashtag.split(',');
        for(var i=0; i<list.length; i++){
            taglist.push(list[i]);
        }
        const taglistSet = [...new Set(taglist)];
        const hashtags = taglistSet.map((value)=>(
            <Badge key={value} variant="light" style={tagcss} id={value}>
               {value}
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
};

export const TagListBoard = (props) =>{
    const taglist = ["#"+props.boardid, "조회수 "+ props.viewcount];
        if(props.hashtag!=null){
            const list = props.hashtag.split(',');
            for(var i=0; i<list.length; i++){
                taglist.push(list[i]);
            }
        }
        const taglistSet = [...new Set(taglist)];
        const hashtags = taglistSet.map((value,index)=>(
            index>1?
            <Badge key={value} variant="light" style={tagcss}>
               {value}
            </Badge>
            :
            <Badge key={value} variant="primary" style={tagcss2}>
                {value}
            </Badge>
            ));

        return(
            <>
                <h6>{hashtags}</h6>
            </>
        )
 
}

export default TagList;