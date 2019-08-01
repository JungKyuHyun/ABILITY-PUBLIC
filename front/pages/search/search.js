import React , {useState,useCallback,useEffect} from 'react';
import Router from 'next/router';
import axios from 'axios';
import { Container, Row ,Col ,Accordion, Card, Button } from 'react-bootstrap';
import HireList from '../../components/presentational/molecules/HireList';
import Page, { PageTwo } from '../../components/presentational/molecules/Page';
import {BoardListAll} from '../../components/presentational/molecules/BoardList';
import swal from 'sweetalert'; 
/**
 * 
 * @auth 정진호
 * @summary 메인 검색 페이지
 * 
 **/

const Search = () =>{
    
    const [pdata,setPdata] = useState([]);    
    const [jdata,setJdata] = useState([]);
    const [isLoding, setIsLoding] = useState(false);
    const [orderby, setOrderby] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalListCount, setTotalListCount] = useState(0);
    const [currentPage2, setCurrentPage2] = useState(1);
    const [totalListCount2, setTotalListCount2] = useState(0);
    const [jobboard,setJobboard] = useState(0);
    const [postboardallcount,setPostboardallcount] = useState(0);
    
    const backUrl = process.env.NODE_ENV === 'production'? "?" : "?";

    const handlePageChange= useCallback((pageNumber)=> {
        setCurrentPage(pageNumber);
      },[currentPage]);
    const handlePageChange2= useCallback((pageNumber)=> {
        setCurrentPage2(pageNumber);
      },[currentPage2]);
    
    useEffect(()=>{
            window.scrollTo(0,0);
        if(Router.query["word"].replace(" ","").length ===0){
        }else{
            const endpoint2 = backUrl+"/question/allSearch";
            axios.get(endpoint2,{
                params:{
                    orderby : orderby,
                    currentpage : currentPage2,
                    word: Router.query["word"]
                }
            }).then((response)=>{
                setIsLoding(false);
                setPdata(response.data.postBoardList);
                setCurrentPage2(response.data.currentPage);
                setTotalListCount2(response.data.totalListCount);
                setPostboardallcount(response.data.allcount);
            }).catch(()=>{
                setIsLoding(false);
            });
    
              const endpoint = backUrl+"/job/getlist";
              axios.get(endpoint,{
                  params:{
                      orderby : orderby,
                      currentpage : currentPage,
                      userid : localStorage.getItem("userid")?localStorage.getItem("userid"):0,
                      word: Router.query["word"]
                  }
              }).then((response)=>{
                  setIsLoding(false);
                  setJdata(response.data.postBoardList);
                  setCurrentPage(response.data.currentPage);
                  setTotalListCount(response.data.totalListCount+1);
                  setJobboard(response.data.count);
              }).catch(()=>{
                  setIsLoding(false);
                });
        }
    },[Router.query["word"],currentPage,totalListCount,currentPage2,totalListCount2]);
  
    return (
        <>
        
        {   jdata.length > 0 || pdata.length >0 ?       
                
             <Accordion defaultActiveKey={jobboard < postboardallcount ?"board":"jobs"} style={{paddingTop:"1.5rem"}}>
                    <Card.Header style={{backgroundColor:"#ffffff"}}>
                        <Accordion.Toggle as={Button} variant="primary" eventKey="board" style={{marginRight:"1.2rem"}}>
                            일반게시판 검색결과({postboardallcount})
                        </Accordion.Toggle>
                        <Accordion.Toggle as={Button} variant="primary" eventKey="jobs" >
                            개발자모집 검색결과({jobboard})
                        </Accordion.Toggle>
                        </Card.Header>
            <div>
                
           {jdata.length > 0? 
                <div>
                        <Accordion.Collapse eventKey="jobs">
                        <Card.Body>
                        <small>총 결과 [ {postboardallcount+jobboard} ] 건</small>
                        <hr></hr>
            {jdata.map((content)=>{
                return(
                <div key={content.id} style={{paddingTop:"0.7rem",paddingLeft :"1rem"}}>
                        <HireList key={content.id}
                                seq={content.id}
                                event={content.period.substr(0,10)}
                                hireTitle2={content.title}
                                subCompany={content.job_type}
                                company={content.company_name}
                                subtitle={content.subtitle}
                                loaction={content.area} 
                                count={content.viewcount} 
                                hashtag={content.tags}
                                hits={content.view_count}
                                date={content.date_created}
                                allscrap={content.allscrap}
                                scrap={content.scrap}/>
                    </div>
                );
            })
            }
                        <Row style={{marginTop:"1.4rem",marginBottom:"2rem",justifyContent:"center"}}>
                            <div style={{textAlign:"center"}}>
                            <Page totalListCount={totalListCount} currentPage={currentPage} handlePageChange={handlePageChange}/>
                            </div>
                        </Row>
                            </Card.Body>
                        </Accordion.Collapse>
    
            </div> : ""}
            {pdata.length>0?
            <>
                    {
                        <div>
                            
                        <Accordion.Collapse eventKey="board">
                        <Card.Body>
                            <small>총 결과 [ {postboardallcount+jobboard} ] 건</small>
                            <br/><br></br>
                             <div style={{display:"flex"}}>
                                <div style={{backgroundColor:"#77353d",width:"12px",height:"14px",marginRight:"4px"}}></div><small style={{marginRight:"6px"}}>질의 응답</small>
                                <div style={{backgroundColor:"#223d6b",width:"12px",height:"14px",marginRight:"4px"}}></div><small style={{marginRight:"6px"}}>자유 게시판</small> 
                                <div style={{backgroundColor:"#ca3422",width:"12px",height:"14px",marginRight:"4px"}}></div><small style={{marginRight:"6px"}}>프로젝트 자랑</small>
                            </div>
                            <hr></hr>
                        {pdata.map((postContent)=>{
                        if(postContent.category_id === "1"){
                            return(
                                
                                <div style={{paddingTop:"0.3rem"}} key={postContent.id}>
                                    <Container>
                                        <Row>
                                            <Col>
                                                <BoardListAll key={postContent.id}
                                                            color="#77353d"
                                                            menu="질의 응답" 
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
                                            </Col>
                                        </Row>
                                    </Container>
                                </div>
                            );
                        }else if(postContent.category_id === "7"){
                            return(
                                
                                <div key={postContent.id}>
                                <Container>
                                        <Row>
                                            <Col>
                                                <BoardListAll key={postContent.id}
                                                            color="#223d6b"
                                                            menu="자유 게시판"
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
                                            </Col>
                                        </Row>
                                    </Container>
                                </div>
                                
                                );
    
                        }else if(postContent.category_id === "2"){
                            return(
                                <div key={postContent.id}>
                                    <Container>
                                        <Row>
                                            <Col>        
                                                <BoardListAll key={postContent.id}
                                                        menu="프로젝트 자랑"
                                                        color="#ca3422"
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
                                            </Col>
                                        </Row>
                                    </Container>
                                  </div>
                                  
                                    );
    
                        }
                    })
                      }
                    <Row style={{marginTop:"1.4rem",marginBottom:"2rem",justifyContent:"center"}}>
                        <div style={{textAlign:"center"}}>
                        <PageTwo currentPage={currentPage2} totalListCount={totalListCount2}handlePageChange={handlePageChange2}/>
                        </div>
                    </Row>
                </Card.Body>
                </Accordion.Collapse>
            </div>
            }</>
        
        :""} 
        </div></Accordion>
          
            :<>
                <Row style={{marginTop:"11rem", paddingTop:"1.8em",textAlign:"center",border:"3px solid #5f4b8b",width:"95%",marginLeft:"3em",borderRadius:"10px"}}> 
                    <Col style={{paddingBottom:"1.3rem"}}>
                    <img src="/static/image/Logo2.png" alt="Ability"/><br/><br/>
                    <hr/>
                    <h5>조회하신 "{Router.query["word"]}" 에 대한 검색결과가 존재하지 않습니다.</h5>
                    <br></br>
                    <hr/>
                    <small style={{color:"darkred"}}>Error-Code 404 Not Found Search Result</small>
                    </Col>
                </Row>
                </>}
            </>
        )
           
    }
export default Search;