import React ,{Component,useState,useCallback} from 'react';
import BoardList from '../../components/presentational/molecules/BoardList';
import ListgropBoot from '../../components/presentational/atoms/ListgroupBoot';
import Tab from 'react-bootstrap/Tab';
import axios from 'axios'; 
import {TitleAndButtonComponent} from '../../components/presentational/atoms/TitleComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import LodingComponent from '../../components/presentational/atoms/LodingComponent';
import Page from '../../components/presentational/molecules/Page';
import { Row, Col } from 'react-bootstrap';

/**
 * 
 * @author 정진호
 * @summary 게시판 리스트
 * @see 정규현 // 오류수정 
 * @see 정규현 // main title ui 추가
 */

const backUrl = process.env.NODE_ENV === 'production'? "?" : "?";



const sortbar = {
    width :"295px",
    textAlign:"center"
};

const contentsize ={
    height : "auto"
};

export class PostListJson extends Component{
    constructor(props){
        super(props);

        this.state = {
            postlist : [],
            currentPage : 1,
            totalListCount : 0,
        };
        this.getlist = this.getlist.bind(this);
        this.onChangePage = this.onChangePage.bind(this);
    }   
    async componentDidMount() {
           
           await this.getlist();
}
        componentDidUpdate() {
            window.scrollTo(0,0);
        }
     getlist(){
            axios.get(this.props.path,{
                params : {
                    currentpage : this.state.currentPage
                }
            }).then((response) => {
            this.setState({
            postlist : response.data.postBoardList,
            totalListCount : response.data.totalListCount+1
            });
        });
    }
    onChangePage(pageNumber){
        this.setState({
            currentPage : pageNumber
        },()=> this.getlist());
    }
        render(){
         let postlist = this.state.postlist;
                return(
                    <>
                    {postlist.length > 0 
                        ? postlist.map(postContent=>(
                                <BoardList key={postContent.id} 
                                            seq={postContent.id} 
                                            hashtag={postContent.tags}
                                            title={postContent.title} 
                                            userid={postContent.userid}
                                            view_count={postContent.view_count} 
                                            like={postContent.likecount} 
                                            answer={postContent.replycount} 
                                            reputation={postContent.reputation} 
                                            id={postContent.nick_name} 
                                            day={postContent.date_created} 
                                            imagepath={postContent.user_image}
                                            path="/question/content"/> 
                            
                        )) 
                        :                     
                        <>
                            <h6> </h6>
                        </>
                    }
                    <Row style={{marginTop:"2rem",justifyContent:"center"}}>
                        <div style={{textAlign:"center"}}> 
                             <Page currentPage={this.state.currentPage} totalListCount={this.state.totalListCount} handlePageChange={this.onChangePage}/>
                         </div>
                    </Row>
                    </>
                    );
        }             
        
}
const Board = () => {
    const [isvalue,setIsvalue] = useState("");
    const [isdata,setIsdata] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [placeHolder, setPlaceHolder] = useState('검색어를 입력하세요');
    const [value,setValue] = useState("");
    let changeValue = useCallback((e)=> {
        setIsvalue(e.target.value);
    },[isvalue]);
    const handlePageChange= useCallback((pageNumber)=> {
        setCurrentPage(pageNumber);
      },[currentPage]);

    const onKeyPressSearch = useCallback((e)=>{
        if(isvalue.trim().replace(' ','').length===0){
          setIsvalue('');
          setPlaceHolder('검색할 내용이 없습니다!');
          return;
        }
    },[isvalue,placeHolder]);

    const inputValue = useCallback((e)=>{
        e.preventDefault();
        if(isvalue.trim().replace(' ','').length===0){
          setValue('');
          setIsvalue('');
          setPlaceHolder('검색할 내용이 없습니다!');
          setIsdata([]);
          return;
        }else{
            setIsdata([]);
            setLoading(true);
                const endpoint = backUrl         
                axios.get(endpoint,{
                    params :{
                        title : isvalue
                    } 
                }).then((response)=> {
                    setLoading(false);       
                    setIsdata(response.data);
                    setIsvalue("");
                    setValue(isvalue);
                }).catch((xhr) => {
                    console.log("실패 : ",xhr);
                });
            }
            
        },[isdata,isvalue,loading]);
    return (
        <>

       {loading && <LodingComponent/>}
       
        <TitleAndButtonComponent title="질의 응답" path="/question/write" name="글쓰기">
            <FontAwesomeIcon icon={faQuestionCircle} style={{width:"27.73px"}} />
        </TitleAndButtonComponent>
            <ListgropBoot style={sortbar} inputid="search" list1="최신순" list2="조회순" list3="답변순" onKeyPress={onKeyPressSearch} value={isvalue} onChange={changeValue} onClick={inputValue} placeholder={placeHolder}>
                    <Tab.Content style={contentsize}>
                        <Tab.Pane eventKey="#link1" >
                            <PostListJson path={plistEndPoint+"/0"}/>
                        </Tab.Pane>
                        <Tab.Pane eventKey="#link2" >
                            <PostListJson path={plistEndPoint+"/1"}/>
                        </Tab.Pane>
                        <Tab.Pane eventKey="#link3">
                            <PostListJson path={plistEndPoint+"/2"}/> 
                        </Tab.Pane>
                        <Tab.Pane eventKey="#search">
                            {isdata.length > 0 ?
                                isdata.map(searchlist => {
                                    return(
                                <BoardList key={searchlist.id} 
                                            seq={searchlist.id} 
                                            hashtag={searchlist.tags}
                                            title={searchlist.title} 
                                            userid={searchlist.userid}
                                            view_count={searchlist.view_count} 
                                            like={searchlist.likecount} 
                                            answer={searchlist.replycount} 
                                            reputation={searchlist.reputation} 
                                            id={searchlist.nick_name} 
                                            day={searchlist.date_created} 
                                            imagepath={searchlist.user_image}
                                            path="/question/content"/>
                                )
                            }) : <>

                            <Row style={{marginTop:"11rem", paddingTop:"1.8em",textAlign:"center",border:"3px solid #5f4b8b",width:"95%",marginLeft:"3em",borderRadius:"10px"}}> 
                                <Col style={{paddingBottom:"1.3rem"}}>
                                <img src="/static/image/Logo2.png" alt="Ability"/><br/><br/>
                                <hr/>
                                <h5>조회하신 "{value}" 에 대한 검색결과가 존재하지 않습니다.</h5>
                                <br></br>
                                <hr/>
                                <small style={{color:"darkred"}}>Error-Code 404 Not Found Search Result</small>
                                </Col>
                            </Row>
            
                            </>
                            }
                        </Tab.Pane>
                        <hr></hr>
                       
                    </Tab.Content>

                </ListgropBoot>
                
        </>
    )
}


export default Board;