import React ,{Component} from 'react';
import BoardList from '../../presentational/molecules/BoardList';
import ContentTop from '../../presentational/molecules/ContentTop'
import { GridArea } from '../organisms/GridArea';
import axios from 'axios';
import TitleComponent from '../../presentational/atoms/TitleComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

/**
 * 
 * @author 정진호
 * @summary 게시판 리스트
 * @see 정규현 // 오류수정 
 * @see 정규현 // main title ui 추가
 */

const plistEndPoint = process.env.NODE_ENV === 'production'? "?" : "?";

const plistparameter = "?category=1&start=0&end=10";
class PostListJson extends Component{
    constructor(props){
        super(props);

        this.state = {
            postlist : []
        };
        
    }
    
    async componentDidMount() {
                let {data : postlist} = await axios.get(plistEndPoint+"/0"+plistparameter);
                this.setState({
                    postlist
                });
            }
 
        render(){
         const {postlist} = this.state;
            if(postlist.length > 0){
                return postlist.map(postContent=>(
                    <BoardList key={postContent.id} seq={postContent.id} hashtag={postContent.tags} title={postContent.title} view_count={postContent.view_count} like={postContent.likecount} answer={postContent.replycount} reputation={postContent.reputation} id={postContent.nick_name} day={postContent.date_created} imagepath={postContent.user_image}/>
                    ));
            }else {
                return (
                <>
                <h6> </h6>
                </>
                )
            }
        }    
        
}
   class PostListJson1 extends Component{
    constructor(props){
        super(props);

        this.state = {
            postlist1 : []
        };
    }
        async componentDidMount() {
            
            let {data : postlist1} = await axios.get(plistEndPoint+"/1"+plistparameter);
            this.setState({
                postlist1
            });
        }
    
        render(){
            const {postlist1} = this.state;
            if(postlist1.length > 0){
                return postlist1.map(postContent=>(
                    <BoardList key={postContent.id} seq={postContent.id} hashtag={postContent.tags} title={postContent.title} view_count={postContent.view_count} like={postContent.likecount} answer={postContent.replycount} reputation={postContent.reputation} id={postContent.nick_name} day={postContent.date_created} imagepath={postContent.user_image}/>
                    ));
            }else {
                return (
                 <>
                    <h6> </h6>
                </>
                )
            }
    }    
}
   class PostListJson2 extends Component{
    constructor(props){
        super(props);

        this.state = {
            postlist : []
        };
    }
        async componentDidMount() {
            let {data : postlist} = await axios.get(plistEndPoint+"/2"+plistparameter);

            this.setState({
                postlist
            });
        
        }

        render(){
            const {postlist} = this.state;
            if(postlist.length > 0){
                return postlist.map(postContent=>(
                    <BoardList key={postContent.id} seq={postContent.id} hashtag={postContent.tags} title={postContent.title} view_count={postContent.view_count} like={postContent.likecount} answer={postContent.replycount} reputation={postContent.reputation} id={postContent.nick_name} day={postContent.date_created} imagepath={postContent.user_image}/>
                    ));
            }else {
                return (
                    <>
                <h6> </h6> 
                </>
                )
            }
    }  
}
const PostList = () => {
    return (
        <>


        <GridArea>
        <TitleComponent title="질의 응답">
            <FontAwesomeIcon icon={faQuestionCircle} />
        </TitleComponent>
        <ContentTop/>
        <div className="tab-content" id="nav-tabContent">
             <div className="tab-pane fade show active" id="list-home" role="tabpanel" aria-labelledby="list-home-list">
             <PostListJson />
             </div>
             <div className="tab-pane fade" id="list-profile" role="tabpanel" aria-labelledby="list-profile-list">
             <PostListJson1 />
             </div>
             <div className="tab-pane fade" id="list-messages" role="tabpanel" aria-labelledby="list-messages-list">
             <PostListJson2/>
             </div>
        </div>

        </GridArea>
        </>
    )
}


export default PostList;