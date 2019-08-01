import React ,{Component}from 'react';
import { GridArea } from '../organisms/GridArea';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import UserUpdate from './UserUpdate';
import UserDelete from './UserDelete';

/**
 * 
 * @author 우세림
 * @summary 개발자들 수정 TabMeun
 * 
 */

class UserModify extends Component { 
    render(){
        return (
            <>
         

            <GridArea>
                <Tabs>
                    <TabList>
                        <Tab>정보수정</Tab>
                        <Tab>회원탈퇴</Tab>
                    </TabList>
                    
                    <TabPanel>
                        <UserUpdate/>
                    </TabPanel>
                    <TabPanel>
                        <UserDelete/>
                    </TabPanel>
                </Tabs>
            </GridArea>
            </>
        );
    }
}


export default UserModify;