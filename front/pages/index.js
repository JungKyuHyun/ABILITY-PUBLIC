import React from 'react';
import {useSelector} from 'react-redux';
import {Container,Row,Col} from 'react-bootstrap';
import RollingBannerComponent from '../components/presentational/atoms/RollingBannerComponent';
import MainCardComponent, {MainVideoCardComponent} from '../components/presentational/atoms/MainCardComponent';
import HelMet from 'react-helmet';

import dynamic from 'next/dynamic';
import { MAIN_DATA_REQUEST } from '../reducers/main';
const AdminWordcloud = dynamic(() =>import('../components/presentational/molecules/AdminWordcloud'),{
    ssr : false	 
});	

/**
 * @author 정규현
 * @summary 메인 페이지 
 */

 const rowCss = {
    marginTop:"2rem",
    marginBottom:"3rem",
 };

 const rowCss2 = {
    marginBottom:"2.4rem",
 };

 const cloud = {
     border:"1px solid #c6badf",
     marginTop:"0.9rem",
     borderRadius:"10px"
 };
 
const Home = ()=>{
    
    const {pBoard, qBoard, fBoard, banner} = useSelector(state=>state.main);

    return (
        <>
        <HelMet
            title={`ABILITY에 오신걸 환영합니다.`}
            description={`여러가지 트랜드를 반영한 최신 기술과 고급 기술들을 많이 적용해서 만든 기술 중심형 프로젝트입니다. 사용자들은 질문을 통해 개발에 대한 해결방안을 얻고, 
            답변을 통해 일정한 포인트(능력치)를 얻을 수 있는 사이트 입니다. 또한 사용자들은 페이지를 통해 구인을 원하는 기업에 지원할 수 있고, 사용자 간의 채팅도 가능하며, 
            본인이 만든 프로젝트 영상을 다른 사용자들에게 보여줄 수 있는 공간을 제공합니다.`}
        />
           <Container style={{marginBottom:"5rem"}}>
           
            <Row style={rowCss}>
                <RollingBannerComponent data={banner}/>
            </Row>

            <Row  style={rowCss2}>
                <Col sm={12} md={12} style={{padding:"0"}}>
                    <div style={{width:"100%",height:"auto"}}>
                        <MainCardComponent data={qBoard}
                                        path="/question/board"
                                        category="질의 응답"
                                        titlepath="/question/content"
                                        more="최신글"
                        />
                    </div>
                </Col>
            </Row>
                
            <Row style={rowCss2}>
                <div style={{width:"100%",height:"auto"}}>
                    <MainVideoCardComponent data={pBoard}
                                            path="/project/board"
                                            more="프로젝트 영상"
                    />
                </div>
            </Row>  

            <Row style={rowCss2}>
                <Col sm={12} md={6}>
                    <div style={cloud}>
                        <AdminWordcloud/>
                    </div>
                </Col>

                <Col sm={12} md={6} style={{padding:"0"}}>
                    <div style={{width:"100%",height:"auto"}}>
                    <MainCardComponent data={fBoard}
                                        path="/community/board"
                                        category="자유 게시판"
                                        titlepath="/community/detail"
                                        more="최신글"
                        />
                    </div>
                </Col>
            </Row>
           </Container>
        </>
    );
};

Home.getInitialProps = (context) =>{
    context.store.dispatch({
        type:MAIN_DATA_REQUEST,
    })
};


export default Home;