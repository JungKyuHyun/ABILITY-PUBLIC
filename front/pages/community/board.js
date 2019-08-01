import React,{useState, useCallback, useEffect} from 'react';
import { Row, Col,ToggleButtonGroup,ToggleButton } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrow } from '@fortawesome/free-solid-svg-icons';
import { TitleAndButtonComponent } from '../../components/presentational/atoms/TitleComponent';
import axios from 'axios';
import BoardList from '../../components/presentational/molecules/BoardList';
import { UserSearchbarComponent } from '../../components/presentational/atoms/SearchbarComponent';
import LodingComponent from '../../components/presentational/atoms/LodingComponent';
import Page from '../../components/presentational/molecules/Page';
import Router from 'next/router';

/**
 * @author 정규현
 * @summary  자유게시판 입니다
 */
 
const css = {
  verticalAlign:"middle",
}

const backUrl = process.env.NODE_ENV === 'production'? "?" : "?";

const Board = ()=>{
  const [searchWord, setSearchWord] = useState('');
  const [dataList, setDataList] = useState([]);
  const [placeHolder, setPlaceHolder] = useState('글 제목 검색');
  const [isLoding, setIsLoding] = useState(false);
  const [orderby, setOrderby] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalListCount, setTotalListCount] = useState(0);
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
    setIsSearch(0);
    Router.push("/community/board");
  },[orderby,isSearch]);

  const handlePageChange= useCallback((pageNumber)=> {
    setCurrentPage(pageNumber);
  },[currentPage]);

  

  useEffect( () =>{
    window.scrollTo(0,0);
    setIsLoding(true);
    axios.get(backUrl,
      {
        params : {
          orderby:orderby,
          currentpage:currentPage,
          word: isSearch!=0 ? searchWord : ""
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
      setDataList(res['data']['postBoardList']);
    })
    .catch((res)=>{
      setIsLoding(false);
      console.log(res);
    });
  },[orderby,totalListCount,currentPage,isSearch]);

  return(
    <>
    {isLoding && <LodingComponent/>}
    
    
        <TitleAndButtonComponent title="자유 게시판" name="글 올리기" path='/community/write'>
            <FontAwesomeIcon style={{width:"35px",height:"auto"}} icon={faCrow}/>                          
        </TitleAndButtonComponent> 
        <Row style={{marginTop:"25px"}}>
        <Col sm={6} md={8} style={css}>
          <ToggleButtonGroup
            type="checkbox" 
            value={orderby}
            onChange={onChangeToggle}
          >
            <ToggleButton value="0" style={{backgroundColor:"#fff",color:"#5F4B8B",borderColor:"rgba(0,0,0,.125)"}} variant="dark">최신순</ToggleButton>
            <ToggleButton value="1" style={{backgroundColor:"#fff",color:"#5F4B8B",borderColor:"rgba(0,0,0,.125)"}} variant="dark">조회순</ToggleButton>
            <ToggleButton value="2" style={{backgroundColor:"#fff",color:"#5F4B8B",borderColor:"rgba(0,0,0,.125)"}} variant="dark">답변순</ToggleButton>
          </ToggleButtonGroup>
        </Col>
        <Col sm={6} md={4}>
          <UserSearchbarComponent name="user_searchbar" onChange={onChangeSearchInput} onClick={onClickSearchButton} 
                            onKeyPress={onKeyPressSearch}  content={placeHolder}/>
        </Col>
        
        </Row>
        <hr style={{marginBottom:"5px"}}/>
        {dataList.length!==0 ? <>
          {
            dataList.map((content)=>{
              return(
                <div key={JSON.stringify(content['id'])}>
                <BoardList  seq={JSON.stringify(content['id'])}
                            hashtag={JSON.stringify(content['tags']).replace('"','').replace('"','')}
                            title={JSON.stringify(content['title']).replace('"','').replace('"','')}
                            view_count={JSON.stringify(content['view_count'])}
                            like={JSON.stringify(content['likecount'])}
                            answer={JSON.stringify(content['replycount'])}
                            reputation={JSON.stringify(content['reputation'])}
                            id={JSON.stringify(content['nick_name']).replace('"','').replace('"','')}
                            day={JSON.stringify(content['date_created']).replace('"','').replace('"','')}
                            imagepath={JSON.stringify(content['user_image']).replace('"','').replace('"','')}
                            path="detail"
                            userid={JSON.stringify(content['userid']).replace('"','').replace('"','')}
                            />  
                  <hr style={{marginTop:"5px", marginBottom:"5px"}}/>
                  </div>
                );
            })
          }
          <Row style={{marginTop:"1.4rem",marginBottom:"2rem",justifyContent:"center"}}>
            <div style={{textAlign:"center"}}>
            
              <Page currentPage={currentPage} totalListCount={totalListCount} handlePageChange={handlePageChange}/>
            </div>
          </Row>
          </>: <div style={{marginTop:"30%",marginLeft:"50%"}}>검색한 결과가 없습니다.</div>}

    </>
  );
};


export default Board;