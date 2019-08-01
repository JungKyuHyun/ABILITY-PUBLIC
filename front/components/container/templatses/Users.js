import React,{Component} from 'react';
import {SearchbarComponent} from '../../presentational/atoms/SearchbarComponent';
import UserCard from '../../presentational/molecules/UserCard';
import { GridArea } from '../organisms/GridArea';
import TitleComponent from '../../presentational/atoms/TitleComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import ListgroupComponent from '../../presentational/atoms/ListgroupComponent';

/**
 * @author 강기훈
 * @summary 유저게시판 페이지 컴포넌트 
 * @see 정규현 게시판 메인 컴포넌트로 통일 
 */

const EndPoint = process.env.NODE_ENV === 'production'? "" : "";


const Search_css={  
  marginTop:"40px",
  display:"grid",
  gridTemplateColumns: "35% 25%",
  justifyContent:"space-between"
}
const User_css={
  display: "grid",
  gridTemplateColumns: "24% 24% 24% 24%",
  gridGap:"30px 15px",
  marginTop:"20px"
}

const sortbar={
   height:"38px",
   textAlign:"center"
}

class UserListJson extends Component{
  constructor(props){
    super(props);

    this.state= {
      userList:[]
    }
  }
  
  async componentDidMount() {
    await axios.get(EndPoint+"/ability"
        ).then((Response) => {
            this.setState({
                userList : Response.data
           });
    });
}
   render(){
    return this.state.userList.map((user)=>{ 
      let tags = user.tags.split(',');
      let minTags="";
      for(let i=0 ; i<3; i++){
        if(!tags[i+1]||i===2){
           minTags += tags[i]+" "
            break;
        }else{
            minTags += tags[i]+", ";
        }
      }
     return <UserCard key={user.userid} userid={user.userid} userImage={user.user_image} name={user.nick_name} area={user.area} reputation={user.reputation} tags={minTags}></UserCard>
 });
   }
}

class UserListJson1 extends Component{
  constructor(props){
    super(props);

    this.state= {
      userList:[]
    }
  }
  
  async componentDidMount() {
    await axios.get(EndPoint+"/newUser"
        ).then((Response) => {
            this.setState({
                userList : Response.data
           });
    });
}
   render(){
    return this.state.userList.map((user)=>{
      let tags = user.tags.split(',');
      let minTags="";
      for(let i=0 ; i<3; i++){
        if(!tags[i+1]||i===2){
           minTags += tags[i]+" "
            break;
        }else{
            minTags += tags[i]+", ";
        }
      }
     return <UserCard key={user.userid} userid={user.userid} userImage={user.user_image} name={user.nick_name} area={user.area} reputation={user.reputation} tags={minTags}></UserCard>
 });
   }
}

class UserListJson2 extends Component{
  constructor(props){
    super(props);

    this.state= {
      userList:[]
    }
  }
  
  async componentDidMount() {
    await axios.get(EndPoint
        ).then((Response) => {
            this.setState({
                userList : Response.data
           });
    });
}
   render(){
    return this.state.userList.map((user)=>{ 
      let tags = user.tags.split(',');
      let minTags="";
      for(let i=0 ; i<3; i++){
        if(!tags[i+1]||i===2){
           minTags += tags[i]+" "
            break;
        }else{
            minTags += tags[i]+", ";
        }
      }
     return <UserCard key={user.userid} userid={user.userid} userImage={user.user_image} name={user.nick_name} area={user.area} reputation={user.reputation} tags={minTags}></UserCard>
 });
   }
}


const Users = () =>{
    return (
      <>
     
      <GridArea>
        <TitleComponent title="개발자들">
          <FontAwesomeIcon icon={faUsers}/>
        </TitleComponent>
          <span className="sub_scss"></span>

        <div style={Search_css}>
          <ListgroupComponent css={sortbar} name="Ability" name1="New user" name2="Name"/>
          <SearchbarComponent/>
        </div>
        <div className="tab-content" id="nav-tabContent">
             <div className="tab-pane fade show active" id="list-home" role="tabpanel" aria-labelledby="list-home-list">
             <div style={User_css}>
             <UserListJson />
             </div>
             </div>
             <div className="tab-pane fade" id="list-profile" role="tabpanel" aria-labelledby="list-profile-list">
             <div style={User_css}>
             <UserListJson1 />
             </div>
             </div>
             <div className="tab-pane fade" id="list-messages" role="tabpanel" aria-labelledby="list-messages-list">
             <div style={User_css}>
             <UserListJson2/>
             </div>
             </div>
        </div>
        
            
     
      </GridArea>
      </>
    );
}

export default Users