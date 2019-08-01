import React,{useState,useEffect,useCallback} from 'react';
import HireList from '../../presentational/molecules/HireList';
import {Row,Col, ToggleButton, ToggleButtonGroup, Container} from 'react-bootstrap';
import { UserSearchbarComponent3 } from '../../presentational/atoms/SearchbarComponent';
import axios from 'axios'; 
import LodingComponent from '../../presentational/atoms/LodingComponent';
import Page from '../../presentational/molecules/Page';
import Router from 'next/router';

/**
 * @author 신선하
 * @summary
 * 
 * @author 정진호
 * @summary Job_Board 게시판 구현
 */
const css = {
  verticalAlign:"middle"
}


const Job = ()=>{
  const [searchWord, setSearchWord] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isSearch, setIsSearch] = useState(0);
  const [isLoding, setIsLoding] = useState(false);
  const [dataList, setDataList] = useState([]);
  const [placeHolder, setPlaceHolder] = useState('글 제목 검색');
  const [orderby, setOrderby] = useState(0);
  const [totalListCount, setTotalListCount] = useState(0);
  const [userrole,setUserrole] = useState("");
  
  
  const onChangeSearchInput = useCallback((e) =>{
    setSearchWord(e.target.value);
  },[searchWord]);
  
  const handlePageChange= useCallback((pageNumber)=> {
    setCurrentPage(pageNumber);
  },[currentPage]);

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

  const onChangeToggle = useCallback((e)=>{
    const str = e.pop();
    if(typeof str != "string"){
      return;
    }
    setOrderby(str);
    setIsSearch(0);
  },[orderby,isSearch]);

  const endpoint = process.env.NODE_ENV === 'production'? "?" : "?";

  useEffect( () =>{
    setIsLoding(true);
    setDataList([]);
    setUserrole(localStorage.getItem("role_name"));
    
    axios.get(endpoint,{
      params : {
        orderby : orderby,
        currentpage : currentPage,
        userid: Router.query['userid'],
        word: isSearch!=0 ? searchWord : "",
        categoryid:4
      }
    }).then((response) => {
      setIsLoding(false);
      setDataList(response.data.postBoardList);
      setCurrentPage(response.data.currentPage);
      setTotalListCount(response.data.totalListCount);
    })
    .catch((response)=>{
      setIsLoding(false);
    });
  },[orderby,currentPage,totalListCount,isSearch]);

  return(
    <>
    {isLoding && <LodingComponent/>}
    
      { userrole == "ROLE_COMPANY" ?
      <>
      </> : 
      <>
      </>  
      }
      <Container>
        <Row style={{marginTop:"25px"}} >
        <Col sm={6} md={8} style={css}>
          <ToggleButtonGroup
            type="checkbox" 
            value={orderby}
            onChange={onChangeToggle}
          >
            <ToggleButton value="0" style={{backgroundColor:"#fff",color:"#5F4B8B",borderColor:"rgba(0,0,0,.125)"}} variant="dark">최신순</ToggleButton>
            <ToggleButton value="1" style={{backgroundColor:"#fff",color:"#5F4B8B",borderColor:"rgba(0,0,0,.125)"}} variant="dark">조회순</ToggleButton>
      
        </ToggleButtonGroup>
    
        </Col>
        <Col sm={6} md={4}><UserSearchbarComponent3 onChange={onChangeSearchInput} onClick={onClickSearchButton} content={placeHolder}
                                                    onKeyPress={onKeyPressSearch}/></Col>
        
        </Row>
        <hr style={{marginBottom:"5px"}}/><br/>
          { dataList.length > 0 ? <>
          {
            dataList.map((content)=> {
              return(
                <div key={content.id}>
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
              <Page currentPage={currentPage} totalListCount={totalListCount} currentPage={currentPage} handlePageChange={handlePageChange}/>
            </div>
          </Row>
          </>: <div style={{margin: "3% 38%", width: "100%"}}>작성한 글이 없습니다.</div>}
</Container>
    </>
    
  );
}


export default Job;
