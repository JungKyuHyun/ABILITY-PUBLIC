import React, { Component } from 'react';
import {BoardSimpleList,BoardSimpleList2,BoardSimpleList3,BoardSimpleList4 } from './BoardSimpleList';
import Link from 'next/link';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { faLaptopCode } from '@fortawesome/free-solid-svg-icons';
import { faCrow } from '@fortawesome/free-solid-svg-icons';
import { faIdBadge } from '@fortawesome/free-solid-svg-icons';

/**
 * @author  신선하
 * @summary 보드리스트 박스 
 * @see 정규현 리펙토링
 * 
 **/

const backUrl = process.env.NODE_ENV === 'production'? "?" : "?";

 const endpoint = backUrl+"/test/getpost";
 const endpoint2 = backUrl+"/test/getjobpost";

const css2 = {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: '1', /* 라인수 */
    WebkitBoxOrient: 'vertical',
    wordWrap:'break-word',
    marginBottom:"10px"
}

const userWrite ={
    gridArea: "2 / 2 / 3 / 4",
}

const userWriteTitle = {
    fontSize: "18px",
    fontWeight: "600",
    marginBottom: "10px",
    display: "inline-block",
    color:"#636e72"
}

const userWritelist = {
    margin: "0",
    lineHeight: "100%",
    fontSize : "12px",   
    }

const board_css = {
    borderBottom:"1px solid #eaeaea",
    marginBottom:"15px",
    display:"flex",
    justifyContent:"space-between"
}

const more_css ={
    textAlign:"right"
}

const nextpage_css = {
    marginTop:"15px",
    fontSize:"12px"
}

const linkcss={
    color:"#0984e3"
}
 
class BoardListBox extends Component {
    constructor(props){
        super(props);

        this.props = props
        this.state={
            categoryid: this.props.categoryid,
            postArray:[]
        }
    }

   async componentDidMount(){
      if(this.state.categoryid==4){
        await axios.get(endpoint2).then(response=>{
            this.setState({
                postArray:response.data
            })
        })

      }else{
      await axios.get(endpoint,{
          params:{
             categoryid:this.state.categoryid
          }
      }).then(response =>{
         this.setState({
            postArray:response.data
         })

      })
    }
    }
    render(){
        function textLengthOverCut(txt, len, lastTxt) {
            if (txt.length > len) {
                txt = txt.substr(0, len) + lastTxt;
            }
            return txt;
        }
        const UserList= this.state.postArray.map((user,index)=>{ 
        if(this.state.categoryid==1){
        return <BoardSimpleList key={index} id={user.id} userid={user.userid} title={textLengthOverCut(user.title, '20', '...')} 
               date_created={user.date_created} userimage={user.user_image} tags={user.tags} reputation={user.reputation} nickname={user.nick_name} css2={css2} ></BoardSimpleList>
        }else if(this.state.categoryid==2){
            return <BoardSimpleList3 key={index} id={user.id} userid={user.userid} title={textLengthOverCut(user.title, '20', '...')} 
            date_created={user.date_created} userimage={user.user_image} tags={user.tags} reputation={user.reputation} nickname={user.nick_name} css2={css2} ></BoardSimpleList3>
        }else if(this.state.categoryid==7){
            return <BoardSimpleList2 key={index} id={user.id} userid={user.userid} title={textLengthOverCut(user.title, '20', '...')} 
               date_created={user.date_created} userimage={user.user_image} tags={user.tags} reputation={user.reputation} nickname={user.nick_name} css2={css2} ></BoardSimpleList2>
        }else{
            return <BoardSimpleList4 key={index} id={user.id} userid={user.userid} title={textLengthOverCut(user.title, '20', '...')} 
               date_created={user.date_created} userimage={user.user_image} tags={user.tags} reputation={user.reputation} nickname={user.nick_name} css2={css2} ></BoardSimpleList4>
        }
    });

    function moreList(id){
        
        if(id ==1){
            return <Link href="/question/board"><a style={linkcss}>더보기</a></Link>
        }else if(id ==7){
          return <Link href="/community/board"><a style={linkcss}>더보기</a></Link>
        }else if(id==2){
          return <Link href="/project/board"><a style={linkcss}>더보기</a></Link>
        }else{
            return <Link href="/job/board"><a style={linkcss}>더보기</a></Link>
        }
    }
     const nextpage = moreList(this.state.categoryid);
     function icon(id){
         if( id == "1"){
           return <FontAwesomeIcon icon={faQuestionCircle} style={{width:"17px", marginRight:"7px"}}/> 
         }else if(id == "2"){
            return <FontAwesomeIcon icon={faLaptopCode} style={{width:"17px", marginRight:"7px"}}/> 
         }else if(id == "7"){
            return <FontAwesomeIcon icon={faCrow} style={{width:"17px", marginRight:"7px"}}/> 
         }
         else{
            return <FontAwesomeIcon icon={faIdBadge} style={{width:"17px", marginRight:"7px"}}/> 
         }
     }
     const faIcon = icon(this.state.categoryid);
  
    return (
        <>
        <div style={userWrite}>
            <div style={board_css}>
            <span style={userWriteTitle}>
              {faIcon}
               {this.props.boardtitle}
            </span>
            <div style={nextpage_css}>{nextpage}</div> 
            </div>
            <div style={userWritelist}>
                {UserList}
            </div>
            <div style={more_css}>
            
            </div>
        </div>
        </>
        );
    }
}

export default BoardListBox;

