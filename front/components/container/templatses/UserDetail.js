import React ,{Component}from 'react';
import { GridArea } from '../organisms/GridArea';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import UserWrite from './UserWrite';
import UserPage from './UserPage';
import axios from 'axios';

/**
 * 
 * @author 우세림
 * @summary 개발자들 상세 TabMeun
 * 
 */

const endpoint = process.env.NODE_ENV === 'production'? "?" : "?";


class UserDetail extends Component { 
    constructor(props){
        super(props);

        this.state = {
            userdata : [],
            userid : props.match.params.userid
        }
    }

    async componentDidMount() {
        await axios.get(endpoint, {
            params : {
                userid : this.state.userid
            }
            }).then((Response) => {
                this.setState({
                    userdata : Response.data
               });
        });

    }

    render(){
        let {userdata} = this.state;

        if(this.state.userdata !== null){
            return (
                <>
              
                
                <GridArea>
                    <Tabs>
                        <TabList>
                            <Tab>전체</Tab>
                            <Tab>Add</Tab>
                        </TabList>
                        
                        <TabPanel>
                            <UserPage user_image={userdata.user_image} nick_name={userdata.nick_name} reputation={userdata.reputation} 
                            name={userdata.name} email={userdata.email} user_info={userdata.user_info} tel={userdata.tel} area={userdata.area} 
                            date_created={userdata.date_created} last_updated={userdata.last_updated} tags={userdata.tags} 
                            userid={this.state.userid} />
                        </TabPanel>
                        <TabPanel>
                            <UserWrite/>
                        </TabPanel>
                    </Tabs>
                </GridArea>
                </>
            );
        }else {
            return (
                <>
                <h6> </h6>
                </>
            )
        }
    }
}


export default UserDetail;