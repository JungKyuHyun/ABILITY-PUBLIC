import React,{useState, useCallback, useEffect} from 'react';	
import { Row, Col,ToggleButtonGroup,ToggleButton, Container } from 'react-bootstrap';	
import axios from 'axios';	
import { UserSearchbarComponent3 } from '../../presentational/atoms/SearchbarComponent';	
import LodingComponent from '../../presentational/atoms/LodingComponent';	
import Page from '../../presentational/molecules/Page';	
import VideoCard from '../../presentational/molecules/VideoCard';	
import { ButtonComponent } from '../../presentational/atoms/ButtonComponent';	

 /**	
 * @author 신선하	
 * @summary  비디오게시판 입니다	
 */	

 const css = {	
  verticalAlign:"middle",	
}	

 const wrapper = {	
  display: 'grid',	
  gridTemplateColumns: 'repeat(3, 1fr)',	
  gridAutoRows: 'minmax(50px, auto)',	
  gridGap: '1rem',	
  align: 'center',	
};    	

 const deleteBtn ={	
  width:"50px",	
  height:"30px",	
  fontSize:"13px",	
  marginRight:"0",	
  padding:"0",	
  marginTop:"10px"	
}	

 const btncss ={	
  textAlign:"right"	
}	

 const Project = ()=>{	
  const [searchWord, setSearchWord] = useState('');	
  const [dataList, setDataList] = useState([]);	
  const [placeHolder, setPlaceHolder] = useState('글 제목 검색');	
  const [isLoding, setIsLoding] = useState(false);	
  const [orderby, setOrderby] = useState(0);	
  const [currentPage, setCurrentPage] = useState(1);	
  const [totalListCount, setTotalListCount] = useState(0);	
  const [isdelok,setIsdelok] =useState(false);	
  const [isSearch, setIsSearch] = useState(0)	

   const onChangeSearchInput = useCallback((e) =>{	
    setSearchWord(e.target.value);	
  },[searchWord]);	

   const onKeyPressSearch = useCallback((e)=>{	
    if(searchWord.trim().replace(' ','').length===0){	
      setSearchWord('');	
      setPlaceHolder('검색할 내용이 없습니다!');	
      return;	
    }else if(e.charCode == 13){	
      setIsSearch(isSearch+1);	
    }	
  },[searchWord,placeHolder])	

   const onClickSearchButton = useCallback(()=>{	
    if(searchWord.trim().replace(' ','').length===0){	
      setSearchWord('');	
      setPlaceHolder('검색할 내용이 없습니다!');	
      return;	
    };	
    setIsSearch(isSearch+1);	
  },[searchWord,placeHolder]);	

   const onChangeToggle = useCallback((e,event)=>{	
    const str = e.pop();	
    if(typeof str != "string"){	
      return;	
    }	
    setOrderby(str);	
  },[orderby]);	

   const handlePageChange= useCallback((pageNumber)=> {	
    setCurrentPage(pageNumber);	
  },[currentPage]);	

  const backUrl = process.env.NODE_ENV === 'production'? "?" : "?";

   const onClickDeleteButton = useCallback((e)=>{	
    let seq = e.target.id;	
    if(orderby == 3){	
      swal({	
        text: "게시글을 복구하시겠습니까?",	
        title: "게시글 복구",	
        icon: "/static/image/Logo2.png",	
        buttons: true	
     })	
     .then((recoverok)=>{	
         if(recoverok){	
         let form = new FormData();	
             form.append("id",seq); 	
               axios({	
                method :'put',	
                baseURL : backUrl,	
                data : form	
            }).then((res)=>{	
                if(res.data=="success"){	
                    swal("게시글이 복구 되었습니다.");	
                    setIsdelok(true);	
                }else{	
                    swal("[Error0577] 복구 실패");	
                }	
            })	
            .catch((res)=>{	
                console.log("오류발생",res);	
            })	
        }	
     },[isdelok])	
    }else{	
    swal({	
      text: "게시글을 정말 삭제하시겠습니까?",	
      title: "게시글 삭제",	
      icon: "/static/image/Logo2.png",	
      buttons: true	
   })	
   .then((deleteok)=>{	
       if(deleteok){	
       let form = new FormData();	
           form.append("id",seq); 	
             axios({	
              method :'put',	
              baseURL : backUrl,	
              data : form	
          }).then((res)=>{	
              if(res.data=="success"){	
                  swal("게시글이 삭제 되었습니다.");	
                  setIsdelok(true);	
              }else{	
                  swal("[Error0577] 삭제 실패");	
              }	
          })	
          .catch((res)=>{	
              console.log("오류발생",res);	
          })	
      }	
   },[isdelok])	
  }	
  });	

   useEffect( () =>{	
    setIsdelok(false);	
    setIsLoding(true);	
    setDataList([]);	
    axios.get(backUrl,	
      {	
        params : {	
          orderby:orderby,	
          currentpage:currentPage,	
          word: isSearch!=0 ? searchWord : "",	
          categoryid:2	
        }	
      })	
    .then((res) => {	
      setIsLoding(false);	
      setCurrentPage(res['data']['currentPage']);	
      setEndPageBlock(res['data']['endPageBlock']);	
      setPageSize(res['data']['pageSize']);	
      setStartPageBlock(res['data']['startPageBlock']);	
      setTotalListCount(res['data']['totalListCount']);	
      setTotalPage(res['data']['totalPage']);	
      setDataList(res['data']['projectBoardList']);	
    })	
    .catch((res)=>{	
      setIsLoding(false);	
    });	
  },[orderby,totalListCount,currentPage,isSearch,isdelok]);	

   return(	
    <>	
    {isLoding && <LodingComponent/>}	


         <Row style={{marginTop:"25px"}}>	
        <Col sm={6} md={8} style={css}>	
          <ToggleButtonGroup	
            type="checkbox" 	
            value={orderby}	
            onChange={onChangeToggle}	
          >	
            <ToggleButton 	
              value="0" 	
              style={{backgroundColor:"#fff",	
                      color:"#5F4B8B",	
                      borderColor:"rgba(0,0,0,.125)"}} 	
              variant="dark"	
            >	
              최신순	
            </ToggleButton>	
            <ToggleButton 	
              value="1" 	
              style={{backgroundColor:"#fff",	
                      color:"#5F4B8B",	
                      borderColor:"rgba(0,0,0,.125)"}} 	
                      variant="dark"	
                      >	
              조회순	
            </ToggleButton>	
            <ToggleButton 	
              value="3" 	
              style={{backgroundColor:"#fff",	
                      color:"#5F4B8B",	
                      borderColor:"rgba(0,0,0,.125)"}} 	
              variant="dark"	
              >	
              삭제된 게시물	
            </ToggleButton>	
          </ToggleButtonGroup>	
        </Col>	
        <Col sm={6} md={4}>	
        <UserSearchbarComponent3 onChange={onChangeSearchInput} onClick={onClickSearchButton} 	
                            onKeyPress={onKeyPressSearch}  content={placeHolder}/>	
        </Col>	

         </Row>	
        <hr style={{marginBottom:"5px"}}/>	
        {dataList.length!==0 ? <Container style={wrapper}>	
          {	
            dataList.map((videoContent)=>{	
              let btnName = "";	
              if(orderby==3){	
                btnName = "복구";	
              }else{	
                btnName = "삭제";	
              }	
              return(	
                <div key={JSON.stringify(videoContent['id'])}>	
                <VideoCard	
                  seq={JSON.stringify(videoContent['id'])} 	
                  image={"https://img.youtube.com/vi/"+videoContent.file_path+"/hqdefault.jpg"}	
                  title={videoContent.title} 	
                  userid={videoContent.userid}	
                  content={videoContent.content}	
                  reputation={videoContent.reputation} 	
                  view_count={videoContent.view_count} 	
                  date_created={videoContent.date_created}	
                  id={videoContent.nick_name}                                   	
                  likecount={videoContent.likecount}	
                  tags={videoContent.tags}	
                  imagepath={videoContent.user_image}                        	
                  path="/project/detail" 	
                  videoCss={{padding:'1rem 0 1rem 0', 	
                              backgroundColor:'black'}}   	

                   />	
                  <div style={btncss}> 	
                   <ButtonComponent id={JSON.stringify(videoContent['id'])} name={btnName} css={deleteBtn} onclick={onClickDeleteButton}/>	
                   </div>	
                  <hr style={{marginTop:"5px", marginBottom:"5px"}}/>	
                  </div>	
                );	
            })	
          }	
               </Container>	
               : 	
          <div 	
            style={{marginTop:"30%",	
                    marginLeft:"50%"}}>	
                  검색한 결과가 없습니다.	
          </div>	
        }	
          <Row 	
            style={{marginTop:"1.4rem",	
                    marginBottom:"2rem",	
                    justifyContent:"center"	
                  }}>	
            <div style={{textAlign:"center"}}>    	
            <Page 	
              currentPage={currentPage} 	
              totalListCount={totalListCount} 	
              currentPage={currentPage} 	
              handlePageChange={handlePageChange}	
              />	
            </div>	
          </Row>	
        </>	
  );	
}	

 export default Project;