import React ,{Component} from 'react';
import {UserImageComponent2} from '../../presentational/atoms/UserImageComponent';
import TagList from '../../presentational/molecules/TagList';
import {BoardSimpleList, BoardSimpleForm} from '../../presentational/molecules/BoardSimpleList';
import UserSub from '../../presentational/molecules/UserSub';
import UserPost from '../../presentational/molecules/UserPost';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTag } from '@fortawesome/free-solid-svg-icons';
import Router from 'next/router';
import PostChart from '../../presentational/atoms/PostChart';
import { UserProfile } from '../../presentational/molecules/UserProfile';

/**
 * 
 * @author 우세림
 * @summary 개발자들 상세 페이지
 * 
 */

const user_img = {
    height: "auto",
    width: "100%"
}

const user_ok = {
    paddingTop : "1rem",
    display: "grid",
    gridTemplateColumns: "17% 50% 25%",
    gridGap: "0px 30px"
}

const userPostNum = {
    display: "grid",
    gridTemplateColumns: "33% 34% 33%",
    width: "100%",
    backgroundColor: "#fafafa",
    marginBottom: "1.8em"
}

const userContent = {
    width: "100%",
    height: "9.000em",
    gridArea: "1 / 2 / 2 / 3"
}

const userSub = {
    color: "#6d6d6d",
    gridArea: "1 / 3 / 2 / 4"
}

const userWriteTitle = {
    fontSize: "20px",
    fontWeight: "600",
    marginTop: "1.500em",
    display: "inline-block"
}

const userTag = {
    marginTop: "1.500em"
}

const userWrite = {
    display: "grid",
    gridTemplateColumns: "50% 50%",
    marginTop: "2.500em"
}

const user_post_char ={
    gridArea: "1 / 1 / 2 / 3",
    height: "310px"
}

const user_post_list ={
    padding: "10px",
    height: "100%",
    marginBottom: "100px"
}

const endpoint = process.env.NODE_ENV === 'production'? "?" : "?";


class Info extends Component {
     constructor(props){
        super(props);

        this.state = {
            userdata : [],
            userdata2 : [],
            postCount: [],
            userid : 0
        };
    };

    async componentDidMount() {
        let user = Router.query['userid'];
        this.setState({
            userid : user
        })

        await axios.get(endpoint, {
            params : {
                userid : Router.query['userid'],
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
                userid : Router.query['userid'],
                start : 0,
                end : 5
            }
            }).then((Response) => {
                this.setState({
                    userdata2 : Response.data
                });
            });

        await axios.get(endpoint, {
            params : {
                userid : Router.query['userid']
            }
            }).then((Response) => {
                this.setState({
                    postCount : Response.data
                });
            });

        
    }

    render(){
        function textLengthOverCut(txt, len, lastTxt) {
            if (txt.length > len) {
                txt = txt.substr(0, len) + lastTxt;
            }
            return txt;
        }

        function htmlCut(title) {
            let replytitle = title.replace(/<(\/)?([a-zA-Z]*)(\s[a-zA-Z]*=[^>]*)?(\s)*(\/)?>/ig, "");
            return replytitle;
        }

        function leadingZeros(data, num) {
            let zero='';
            let str='';
            let result= '';
            if(data!=undefined){
                if (data.toString().length < num) {
                    for (var i = 0; i < num - data.toString().length; i++)
                     zero += '0';
                }
                str= zero + data;
                result += str.substr(0,3);
                result += '-';
                result += str.substr(3,4);
                result += '-';
                result += str.substr(7);
            }
            return result;
       }

       function addcomma(num) {
           if(num.length <= 3){
               return num;
           }
           num = num.toString(); 
           let count = Math.floor((num.length-1)/3);
           let result = "";
           for(var i=0; i<count; i++){
               let length = num.length;
               let strCut = num.substr(length-3, length);

               num = num.slice(0, length-3);
               result = ","+strCut + result;
           }
           result = num + result;
           return result;
       } 


        const UserList= this.state.userdata.map((user, index)=>{ 
            return <BoardSimpleList key={index} id={user.id} userid={user.userid} title={textLengthOverCut(user.title, 20, "...")}
              date_created={user.date_created} userimage={user.user_image}  reputation={user.reputation} nickname={user.nick_name}  />
        });

        const UserList2= this.state.userdata2.map((user, index)=>{ 
            return <BoardSimpleList key={index} id={user.board_id} userid={user.userid} reply_content={textLengthOverCut(htmlCut(user.reply_content), 20, "...")}
            date_created={user.date_created} userimage={user.user_image} reputation={user.reputation} nickname={user.nick_name}  />
        });
             
        if(this.state.userdata !== null){
            return (
            <>
                <div style={user_ok} id="user_info">
                    <div id="user_img_div">
                        <UserImageComponent2 id="user_img" css={user_img} imagepath={this.props.user_image?this.props.user_image:"?"}  />
                    </div>
                    
                    <div style={userContent}>
                        <UserProfile nick_name={this.props.nick_name?this.props.nick_name:"닉네임"} 
                                     reputation={this.props.reputation?addcomma(this.props.reputation):"0"} 
                                     name={this.props.name?this.props.name:"이름"} 
                                     email={this.props.email?this.props.email:"이메일"} 
                                     user_info={this.props.user_info?this.props.user_info:"<p>소개를 등록하지 않았습니다.</p>"}/>
                    </div> 
                    <br></br>
                    <div style={userSub} >
                        <div style={userPostNum} id="usersub">
                            <UserPost question={this.state.postCount.board_count?this.state.postCount.board_count:"-"} 
                                      answer={this.state.postCount.reply_count?this.state.postCount.reply_count:"-"} 
                                      comment={this.state.postCount.comment_count?this.state.postCount.comment_count:"-"}/>
                        </div>
                        <UserSub tel={leadingZeros(this.props.tel,11)} 
                                area={this.props.area} 
                                date_created={this.props.date_created} 
                                last_updated={this.props.last_updated}/>
                    </div>
                
                </div>
                
                <div style={userTag}> 
                    <span style={userWriteTitle}>
                        <FontAwesomeIcon icon={ faTag } style={{width:"1em",height:"auto"}}/>&nbsp; 관심있는 태그
                    </span>
                    <hr/>
                    <TagList hashtag={this.props.tags?this.props.tags:"등록한 태그가 없습니다."}/>
                    
                </div>
                

                <div style={userWrite}> 
                    <div style={user_post_char}>
                        <PostChart />
                    </div>
                    
                    <div style={user_post_list}>
                        <BoardSimpleForm head="질문한 게시글" postCount={this.state.postCount.board_count} />
                        {UserList.length!=0?UserList: "작성한 질문이 없습니다."}
                    </div>

                    <div style={user_post_list}>
                        <BoardSimpleForm head="답변한 게시글" postCount={this.state.postCount.reply_count}  />
                        {UserList2.length!=0?UserList2: "작성한 답변이 없습니다."}
                    </div>

                    
                </div>
            </>
            );
        }
    }
}

export default Info;