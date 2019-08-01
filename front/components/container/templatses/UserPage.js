import React ,{Component} from 'react';
import {UserImageComponent2} from '../../presentational/atoms/UserImageComponent';
import TagList from '../../presentational/molecules/TagList';
import {BoardSimpleList, BoardSimpleForm} from '../../presentational/molecules/BoardSimpleList';
import UserProfile from '../../presentational/molecules/UserProfile';
import UserSub from '../../presentational/molecules/UserSub';
import UserPost from '../../presentational/molecules/UserPost';
import { ButtonComponent } from '../../presentational/atoms/ButtonComponent';
import UserWrite from './UserWrite';
import {NavLink} from 'react-router-dom';
import axios from 'axios';

/**
 * 
 * @author 우세림
 * @summary 개발자들 상세 페이지
 * 
 */

const titlecss = {
    fontSize : "15px"
}

const user_img = {
    width: "100%"
}

const endpoint = process.env.NODE_ENV === 'production'? "?" : "?";

class UserPage extends Component {
     constructor(props){
         super(props);

         this.state = {
             userdata : [],
             userdata2 : [],
             userid : props.userid
         }
     }
    async componentDidMount() {
        await axios.get(endpoint, {
            params : {
                userid : this.state.userid,
                start : 0,
                end : 5
            }
            }).then((Response) => {
                this.setState({
                    userdata : Response.data
                });
            });
    
        await axios.get(endpoint, {
            params : {
                userid : this.state.userid,
                start : 0,
                end : 5
            }
            }).then((Response) => {
                this.setState({
                    userdata2 : Response.data
                });
            });
    }

    render(){
        const UserList= this.state.userdata.map((user)=>{ 
            return <BoardSimpleList key={user.id} id={user.id} title={user.title} date_created={user.date_created} />
        });

        const UserList2= this.state.userdata2.map((user)=>{ 
            return <BoardSimpleList key={user.id} id={user.id} reply_content={user.reply_content} date_created={user.date_created} />
        });
             
        if(this.state.userdata !== null){
            return (
            <>
                <div className="user_ok">
                    <div className="user_image">
                        <UserImageComponent2 css={user_img} imagepath={this.props.user_image}/>
                    </div>
                    
                    <div className="userContent">
                        <UserProfile nick_name={this.props.nick_name} reputation={this.props.reputation} name={this.props.name} email={this.props.email} user_info={this.props.user_info}/>
                    </div> 

                    <div className="userSub">
                        <div className="userPostNum">
                            <UserPost question="1" answer="293" comment="1131"/>
                        </div>
                            <UserSub tel={this.props.tel} area={this.props.area} date_created={this.props.date_created} last_updated={this.props.last_updated}/>
                    </div>
                </div>

                <div className="userWrite"> 
                    <div className="userWriteTag"> 
                        <span className="userWriteTitle">
                            <i className="fas fa-tag"></i>
                            &nbsp; 관심있는 태그
                        </span>
                        <hr/>
                        <TagList hashtag={this.props.tags} />
                    </div>

                    <div className="user_question">
                        <BoardSimpleForm css={titlecss} head="최근 작성 한 질문" postCount={UserList.length} to={<UserWrite/>}/>
                        {(UserList!=null&&UserList!="")?UserList: "작성한 질문 글이 없습니다."}
                    </div>

                    <div className="user_answer">
                        <BoardSimpleForm css={titlecss} head="최근 작성 한 답변" postCount={UserList2.length}  to={<UserWrite/>}/>
                        {(UserList2!=null&&UserList2!="")?UserList2: "작성한 답변 글이 없습니다."}
                    </div>

                </div>

                <div className="user_md_btn">
                    <NavLink to={"/usermodify/"+this.props.userid} >
                        <ButtonComponent name="수정하기" />
                    </NavLink>
                </div>
            </>
            );
        }
    }
}

export default UserPage;