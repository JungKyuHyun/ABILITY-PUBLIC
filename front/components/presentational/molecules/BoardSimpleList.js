import React from 'react';
import Link from 'next/link';
import TimeAgo from 'react-timeago';
import ko from 'react-timeago/lib/language-strings/ko';
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter';
import { AbilityComponent } from '../atoms/AbilityComponent';
import Badge from 'react-bootstrap/Badge';
const formatter = buildFormatter(ko);
/**
 * @author  우세림
 * @summary 게시판 간단한 리스트
 * @this 사용방법 :  
 *      <BoardSimpleList title="제목..." day="2019-06-19"/>
 * @see 정규현 리펙토링
 **/

const userWriteTitle = {
    fontSize: "20px",
    fontWeight: "600",
    marginTop: "0.500em",
    display: "inline-block"
}

const titlecss = {
    display:"flex",
    justifyContent:"space-between",
    borderBottom:"1px solid #eaeaea",
    marginBottom:"10px"
}

const boardListTitle ={
     marginRight:"5px",
     fontSize:"15px",
     marginBottom:"5px"
}

const timeCss ={
     fontSize:"3px",
     marginTop:"5px",
     color:"#636e72"

}

const userimage={
      width:"28px",
      height:"28px",
      marginRight:"5px"
}

const nickname={
      color:"#636e72"
}

const userinform={
    display:"flex",
    flexDirection:"column"
}

const user = {
    display: "flex"
}

const badgecss = {
    width:"auto"
}

const badgediv = {
    marginTop:"3px",
    textAlign:"right"
}

const tagcss = {
    marginRight : "0.2rem",
    marginTop:"6px"
};


export const BoardSimpleForm = (props)=>{
    return (
        <>
            <span style={userWriteTitle}>{props.head}</span>
            <span>&nbsp;({props.postCount})</span>
            <hr/>
        </>
    )
}

export const BoardSimpleList = (props)=>{
    const taglist = [];
    if(props.tags !== null && props.tags !== "" && props.tags !== undefined && props.tags !== "null"){
        const list = props.tags.split(',');
        for(var i=0; i<list.length; i++){
            taglist.push(list[i]);
        }
    }
    const taglistSet = [...new Set(taglist)];
    const hashtags = taglistSet.map((value)=>(<Badge key={value} variant="light" style={tagcss}>{value}</Badge>))
    return (

        <>


        <div style={titlecss} id="user_board">
            <div style = {props.css2}>
                <Link href={{pathname: "/question/content" , query:{seq: props.id} }} as={"/content/"+props.id} >
                    <a style={boardListTitle}> 
                        {props.title}{props.comment_content}{props.reply_content}
                    </a>
                </Link>
                <div>
                {hashtags}
                </div>
                <div style = {timeCss}><TimeAgo date={props.date_created} formatter={formatter} /></div> 
            </div>
            <div style={user}>
            <img src={props.userimage} style={userimage}/>
            
            <div style={userinform}> 
            <Link href={{pathname: "/developer/page" , query:{userid: props.userid} }} as={"/developer/page/"+props.userid}>
             <a> 
             <span style={nickname}>{props.nickname}</span>
                </a>
                </Link>
            <div style={badgediv}><AbilityComponent style={badgecss} val={props.reputation}/></div>
            </div>
            </div>
        </div>
        </>
    )
}

export const BoardSimpleList2 = (props)=>{
    const taglist = [];
    if(props.tags !== null && props.tags !== "" && props.tags !== undefined && props.tags !== "null"){
        const list = props.tags.split(',');
        for(var i=0; i<list.length; i++){
            taglist.push(list[i]);
        }
    }
    const taglistSet = [...new Set(taglist)];
    const hashtags = taglistSet.map((value)=>(<Badge key={value} variant="light" style={tagcss}>{value}</Badge>))
    return (
        <div style={titlecss}>
            <div style = {props.css2}>
                <Link href={{pathname: "/community/detail" , query:{seq: props.id} }} >
                    <a style={boardListTitle}> 
                        {props.title}{props.comment_content}{props.reply_content}
                    </a>
                </Link>
                <div>
                {hashtags}
                </div>
                <div style = {timeCss}><TimeAgo date={props.date_created} formatter={formatter} /></div> 
            </div>
            <div style={user}>
            <img src={props.userimage} style={userimage}/>
            
            <div style={userinform}> 
            <Link href={{pathname: "/developer/page" , query:{userid: props.userid} }} >
             <a> 
             <span style={nickname}>{props.nickname}</span>
                </a>
                </Link>
            <div style={badgediv}><AbilityComponent style={badgecss} val={props.reputation}/></div>
            </div>
            </div>
        </div>
    )
}

export const BoardSimpleList3 = (props)=>{
    const taglist = [];
    if(props.tags !== null && props.tags !== "" && props.tags !== undefined && props.tags !== "null"){
        const list = props.tags.split(',');
        for(var i=0; i<list.length; i++){
            taglist.push(list[i]);
        }
    }
    const taglistSet = [...new Set(taglist)];
    const hashtags = taglistSet.map((value)=>(<Badge key={value} variant="light" style={tagcss}>{value}</Badge>))
    return (
        <div style={titlecss}>
            <div style = {props.css2}>
                <Link href={{pathname: "/project/detail" , query:{seq: props.id} }} >
                    <a style={boardListTitle}> 
                        {props.title}{props.comment_content}{props.reply_content}
                        {/* <div dangerouslySetInnerHTML={ {__html:props.reply_content} }></div> */}
                    </a>
                </Link>
                <div>
                {hashtags}
                </div>
                <div style = {timeCss}><TimeAgo date={props.date_created} formatter={formatter} /></div> 
            </div>
            <div style={user}>
            <img src={props.userimage} style={userimage}/>
            
            <div style={userinform}> 
            <Link href={{pathname: "/developer/page" , query:{userid: props.userid} }} >
             <a> 
             <span style={nickname}>{props.nickname}</span>
                </a>
                </Link>
            <div style={badgediv}><AbilityComponent style={badgecss} val={props.reputation}/></div>
            </div>
            </div>
        </div>
    )
}

export const BoardSimpleList4 = (props)=>{
    const taglist = [];
    if(props.tags !== null && props.tags !== "" && props.tags !== undefined && props.tags !== "null"){
        const list = props.tags.split(',');
        for(var i=0; i<list.length; i++){
            taglist.push(list[i]);
        }
    }
    const taglistSet = [...new Set(taglist)];
    const hashtags = taglistSet.map((value)=>(<Badge key={value} variant="light" style={tagcss}>{value}</Badge>))
    return (
        <div style={titlecss}>
            <div style = {props.css2}>
                <Link href={{pathname: "/job/detail" , query:{seq: props.id} }} >
                    <a style={boardListTitle}> 
                        {props.title}{props.comment_content}{props.reply_content}
                    </a>
                </Link>
                <div>
                {hashtags}
                </div>
                <div style = {timeCss}><TimeAgo date={props.date_created} formatter={formatter} /></div> 
            </div>
            <div style={user}>
            <img src={props.userimage} style={userimage}/>
            
            <div style={userinform}> 
            <Link href={{pathname: "/developer/page" , query:{userid: props.userid} }} >
             <a> 
             <span style={nickname}>{props.nickname}</span>
                </a>
                </Link>
            <div style={badgediv}><AbilityComponent style={badgecss} val={props.reputation}/></div>
            </div>
            </div>
        </div>
    )
}



export default BoardSimpleList;