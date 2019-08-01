import React from 'react';
import { Card, Badge } from 'react-bootstrap';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faEye } from '@fortawesome/free-regular-svg-icons';

/**
 * @author  신선하
 * @summary 비디오 카드 컴포넌트 
 * @usage <VideoCard title="" text="" writer="" hits="" time=""/>
 **/


const cardTitle= {
    marginBottom: '0rem',
    lineHeight:'130%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: '2', /* 라인수 */
    WebkitBoxOrient: 'vertical',
    wordWrap:'break-word',
    marginBottom:'0.75rem',
    minHeight: "52px"
};

const cardTags= {
    marginBottom: '1.25rem',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: '1', /* 라인수 */
    WebkitBoxOrient: 'vertical',
    wordWrap:'break-word',
    minHeight: "18.44px"
};

const cardText= {
    height:'2.275rem',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: '2', /* 라인수 */
    WebkitBoxOrient: 'vertical',
    wordWrap:'break-word',
    marginBottom:'0.75rem'    
};


const VideoCard=(props)=>{
    const taglist = [];
    if(props.tags !== null 
        && props.tags !== "" 
        && props.tags !== undefined 
        && props.tags !== "null"){
        const list = props.tags.split(',');
        for(var i=0; i<list.length; i++){
            taglist.push(list[i]);
        }
    }
     const tags = taglist.map((value,index)=>(
                    <Badge key={index} 
                        variant="light" 
                        style={{marginRight : "0.2rem"}}
                        >
                        {value}
                    </Badge>
                    ))
    return(
    <>

    <Card style={{width:'17.875rem'}} id="videocard">
        <Card.Img variant="top" src={props.image}/>
        <Card.Body>
            <Card.Title style={cardTitle}>
                <span>
                    <Link
                        href={{pathname:props.path,
                                query: {seq : props.seq}
                             }}
                        as={"/content/"+props.seq}
                        eplace 
                        >
                        <a>
                        {props.title}
                        </a>
                    </Link>
                </span>
            </Card.Title>
            <Card.Text style={cardTags}>
                {tags}  
            </Card.Text>
        </Card.Body>
        <Card.Footer>
        <small className="text-muted">
            <Link 
                href={{ pathname : "/developer/page", 
                        query    :{userid : props.userid ? props.userid : ""}}
                        } as={"/developer/page"+props.userid}>
                        <a>{props.id}</a>
            </Link><br/>                                
            <FontAwesomeIcon 
                icon={ faEye }/>&nbsp;
                {props.view_count}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <FontAwesomeIcon 
                icon={ faThumbsUp }/>&nbsp;
                {props.likecount}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                {props.date_created}                
        </small>
        </Card.Footer>
    </Card>
    </>   
    );
}

export default VideoCard;