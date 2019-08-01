import React ,{Component} from 'react'; 
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import axios from 'axios';
import Router from 'next/router';
import Link from 'next/link'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import Info from '../../components/container/organisms/info';
import CInfo from '../../components/container/organisms/cinfo';
import Post from '../../components/container/organisms/post';
import Bookmark from '../../components/container/organisms/bookmark';
import PQuestion from '../../components/container/organisms/pquestion';
import PFreeBoard from '../../components/container/organisms/pfreeboard';
import PProject from '../../components/container/organisms/pproject';
import PJob from '../../components/container/organisms/pjob';
import BQuestion from '../../components/container/organisms/bquestion';
import BFreeBoard from '../../components/container/organisms/bfreeboard';
import BProject from '../../components/container/organisms/bproject';
import BJob from '../../components/container/organisms/bjob';
import TitleComponent from '../../components/presentational/atoms/TitleComponent';
import { ButtonComponent } from '../../components/presentational/atoms/ButtonComponent';

/**
 * 
 * @author 우세림
 * @summary 개발자들 상세 TabMeun
 * @see 정규현 파라미터 받아주고 감..;;
 */

const endpoint = process.env.NODE_ENV === 'production'? "?" : "?";

class Page extends Component { 
    constructor(props){
        super(props);
        
        this.state = {
            userdata : [],
            userid : 0,
            userid2 : 0,
            userid3 : 0,
            userid4 : 0
        };
    };

    async componentDidMount() {
        const user = Router.query['userid'];
        const user2 = localStorage.getItem('userid');
        const user3 = localStorage.getItem('role_name');

        this.setState({
            userid :user,
            userid2 :user2,
            userid3 : user3
        })
        await axios.get(endpoint, {
            params : {
                userid : Router.query['userid']
            }
            }).then((Response) => {
                this.setState({
                    userdata : Response.data,
                    userid4: Response.data.role_name
               });
        });
    }

    render(){
        let userdata = this.state.userdata;
        if(userdata !== null){
            return (
                <>
                <TitleComponent title="개발자 정보" >
                    <FontAwesomeIcon icon={faUsers} style={{width:"35px",height:"auto"}}/>

                    { this.state.userid !== 0 ?
                        <>
                        {this.state.userid == this.state.userid2 || this.state.userid3 == "ROLE_ADMIN" ?
                        <Link href={{pathname: "/developer/update" , query:{userid: this.state.userid} }} as={"/developer/"+this.state.userid}>
                            <a><ButtonComponent css={{float: "right"}} name="프로필수정"/></a>
                        </Link> : ""}

                        {this.state.userid == this.state.userid2 && this.state.userid3 == "ROLE_COMPANY" || this.state.userid3 == "ROLE_ADMIN" && this.state.userid4 == "ROLE_COMPANY" ?  
                        <Link href={{pathname: "/developer/company/cupdate" , query:{userid: this.state.userid} }} as={"/developer/"+this.state.userid}>
                            <a><ButtonComponent css={{float: "right", marginRight: "10px"}} name="기업수정"/></a>
                        </Link> : ""}
                        </> : ""
                    }
                </TitleComponent>


                    <Tabs>
                        <TabList>
                            <Tab>프로필</Tab>
                            {this.state.userid4 == "ROLE_COMPANY" ? 
                                <Tab>기업정보</Tab> : "" }
                            <Tab>작성한 글</Tab>
                            {this.state.userid == this.state.userid2 ? 
                                <Tab>즐겨찾기</Tab> : "" }
                        </TabList>
                        
                        <TabPanel>
                            <Info user_image={userdata.user_image} nick_name={userdata.nick_name} reputation={userdata.reputation} 
                            name={userdata.name} email={userdata.email} user_info={userdata.user_info} tel={userdata.tel} area={userdata.area} 
                            date_created={userdata.date_created} last_updated={userdata.last_updated} tags={userdata.tags} 
                            userid={this.state.userid} />
                        </TabPanel>
                            {this.state.userid4 == "ROLE_COMPANY" ? 
                                <TabPanel>
                                    <CInfo />
                                </TabPanel>: "" }
                        <TabPanel>
                            <Post />
                            <Tabs>
                                <TabList>
                                    <Tab>질의응답</Tab>
                                    <Tab>자유게시판</Tab>
                                    <Tab>프로젝트</Tab>
                                    {this.state.userid4 == "ROLE_COMPANY" ? 
                                        <Tab>구인구직</Tab> : "" }
                                </TabList>
                                <TabPanel>
                                    <PQuestion/>
                                </TabPanel>
                                <TabPanel>
                                    <PFreeBoard/>
                                </TabPanel>
                                <TabPanel>
                                    <PProject/>
                                </TabPanel>
                                    <TabPanel>
                                        <PJob/>
                                    </TabPanel>
                            </Tabs>
                        </TabPanel>
                        <TabPanel>
                        <Bookmark />
                        <Tabs>
                            <TabList>
                                <Tab>질의응답</Tab>
                                <Tab>자유게시판</Tab>
                                <Tab>프로젝트</Tab>
                                <Tab>구인구직</Tab>
                            </TabList>
                            <TabPanel>
                                <BQuestion/>
                            </TabPanel>
                            <TabPanel>
                                <BFreeBoard/>
                            </TabPanel>
                            <TabPanel>
                                <BProject/>
                            </TabPanel>
                            <TabPanel>
                                <BJob/>
                            </TabPanel>
                        </Tabs> 
                        </TabPanel>
                    </Tabs>
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


export default Page;