import React from 'react';
import {Recommend3} from './Recommend';
import BoardReply from './BoardReply';
import {Col,Row} from 'react-bootstrap';


/**
 * @author 정규현 
 * @summary 리플라이 리스트 
 */

const ReplyList = (props) =>{

    const handleBench = (data) =>{
        props.benchmark(data);
    };


    if(props.replyList){
        const repliesList = props.replyList.map((replies)=>
                <div key={replies.reply_id}>
                    <Row style={{width:"99%"}}>
                        <Col md={11} style={{paddingRight:"0"}}>
                            <BoardReply content={replies.reply_content} img={replies.user_image} nickname={replies.nick_name} ability={replies.reputation} date={replies.date_created} userid={replies.userid} replyid={replies.reply_id} benchmark={handleBench} />
                        </Col>  
                        <Col md={1} className="text-left" style={{padding:"0"}}>
                            <Recommend3 count={replies.vote_count} replyid={replies.reply_id} userid={replies.userid}/>
                        </Col>
                    </Row>
                    <hr style={{width:"99%"}}/>
                </div>    
        );
        
        return(
            <>
                <div style={{paddingLeft:"0.6rem"}}><b>답변({props.totalReply})</b></div>
                <hr style={{width:"99%",marginTop:"10px"}}/>
                    {repliesList}
            </>
        );
    }else{
        return(
           " "
        );
    };
};


export default ReplyList;