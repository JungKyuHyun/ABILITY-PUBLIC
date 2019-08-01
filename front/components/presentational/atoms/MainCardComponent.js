import React from 'react';
import {Card, Col,Row} from 'react-bootstrap';
import Link from 'next/link';
import { AbilityComponent } from './AbilityComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShare } from '@fortawesome/free-solid-svg-icons';

import TimeAgo from 'react-timeago';
import ko from 'react-timeago/lib/language-strings/ko';
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter';
const formatter = buildFormatter(ko);

/**
 * @author 정규현
 * @summary 메인 index 페이지에 들어갈 카드 입니다.
 */

const MainCardComponent = (props) =>{

  if(props.data){
    const contents = props.data.map((boardData)=>
    
      <div key={boardData.id.toString()}>
        <Card.Text style={{margin:"0"}}>
            <b>[{props.category}]</b>&nbsp;&nbsp;
            <Link href={{pathname: props.titlepath, query:{seq:boardData.id}}}>
              <a>{boardData.title}</a>
            </Link>
            <small>
            &nbsp;&nbsp;-&nbsp;
            <Link href={{pathname:"/developer/page",query:{userid:boardData.userid}}}>
                                <a>{boardData.nick_name}</a>
                            </Link>&nbsp;
                        <AbilityComponent val={boardData.reputation}/>&nbsp;
                        - <i><TimeAgo date={boardData.date_created} formatter={formatter} /></i>
            </small>   
        </Card.Text>
        <hr style={{margin:"0.3rem"}}/>
      </div>
    
    );

    return(
      <>
      <div className="text-right" style={{marginBottom:"0.3rem",marginRight:"0.3rem"}}>
        <Link href={props.path}>
          <a>
            <b>
            {props.more} 더보기   <FontAwesomeIcon style={{width:"14px",height:"auto"}} icon={faShare}/>    
            </b>
          </a>
        </Link>
      </div>  
      <Card bg="light" style={{ width: '100%', height:'100%' }}>
        <Card.Body style={{ paddingRight:"15px", paddingLeft:"15px", backgroundColor:"white"}}>
          {contents}
            
        </Card.Body>
      </Card>
      </>  
    );
  
  }else{
      return(
        " "
      )
    }
      

};
  

export const MainVideoCardComponent = (props) =>{

  if(props.data){
    const contents = props.data.map((boardData)=>
    
        <Col sm={12} md={4} key={boardData.id.toString()}>
            <div className="embed-responsive embed-responsive-16by9 m-b-2" style={{marginTop:"0.5rem"}}>
                <iframe className="embed-responsive-item"
                    src={"https://www.youtube.com/embed/"+boardData.file_path}></iframe>	
            </div>
        </Col>
    
    );

    return(
      <>
      <div className="text-right" style={{marginBottom:"0.3rem",marginRight:"0.3rem"}}>
        <Link href={props.path}>
          <a>
            <b>
            {props.more} 더보기   <FontAwesomeIcon style={{width:"14px",height:"auto"}} icon={faShare}/>    
            </b>
          </a>
        </Link>
      </div>  
      <div style={{ width: '100%', height:'100%' }}>
        <div style={{ paddingRight:"15px", paddingLeft:"15px", backgroundColor:"white"}}>
          <Row style={{border:"1px solid #c6badf",padding:"0.5rem",borderRadius:"10px"}}>
            {contents}
          </Row>
        </div>
      </div>
      </>  
    );
  
  }else{
      return(
        " "
      )
    }
      

};

 



export default MainCardComponent;