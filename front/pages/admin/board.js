import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Users from '../../components/container/organisms/users';
import DashBoard from '../../components/container/organisms/dashboard';
import { TitleAndButtonComponent } from '../../components/presentational/atoms/TitleComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCog } from '@fortawesome/free-solid-svg-icons';
import FreeBoard from '../../components/container/organisms/freeboard';
import Question from '../../components/container/organisms/question';
import Project from '../../components/container/organisms/project';
import Job from '../../components/container/organisms/job';
import BannerRegister from '../../components/container/organisms/BannerRegister';
import BannerInfo from '../../components/container/organisms/bannerinfo';

/**
 * @author 신선하
 * @summary  
 * @see 정규현 리펙토링/ 반응형
 */


const Board =()=>{
   
   
      return (
        <>
      

        <TitleAndButtonComponent title="관리자 페이지">
          <FontAwesomeIcon icon={faUserCog} style={{width:"1em",height:"auto"}}/>                          
      </TitleAndButtonComponent>
          <Tabs>
            <TabList>
              <Tab>대쉬보드</Tab>
              <Tab >게시판 관리</Tab>
              <Tab>회원 관리</Tab>
              <Tab>배너 등록</Tab>
              <Tab>배너 조회</Tab>
            </TabList>
            <TabPanel>
              <DashBoard/>
            </TabPanel>
            <TabPanel>
            <Tabs>
              <TabList>
               <Tab>질의응답</Tab>
               <Tab>자유게시판</Tab>
               <Tab>프로젝트</Tab>
               <Tab>구인구직</Tab>
              </TabList>
              <TabPanel>
               <Question/>
              </TabPanel>
              <TabPanel>
               <FreeBoard/>
              </TabPanel>
              <TabPanel>
               <Project/>
              </TabPanel>
              <TabPanel>
              <Job/>
              </TabPanel>
            </Tabs>
            </TabPanel>
            <TabPanel>
                <Users/>
            </TabPanel>
            <TabPanel>
                <BannerRegister/>
            </TabPanel>
            <TabPanel>
              <BannerInfo/>
            </TabPanel>
          </Tabs>
        </>
      );
    
  };

export default Board;
