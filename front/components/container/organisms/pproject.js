import React,{useState, useCallback, useEffect} from 'react';
import { Row, Col,ToggleButtonGroup,ToggleButton, Container } from 'react-bootstrap';
import axios from 'axios';
import { UserSearchbarComponent3 } from '../../presentational/atoms/SearchbarComponent';
import LodingComponent from '../../presentational/atoms/LodingComponent';
import Page from '../../presentational/molecules/Page';
import VideoCard from '../../presentational/molecules/VideoCard';
import Router from 'next/router';

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
  marginRight:"30px",
  padding:"0",
  marginTop:"10px"
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

  const onChangeToggle = useCallback((e)=>{
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
          userid: Router.query['userid'],
          categoryid: 2

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
    
    <Container>
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
              value="2" 
              style={{backgroundColor:"#fff",
                      color:"#5F4B8B",
                      borderColor:"rgba(0,0,0,.125)"}} 
              variant="dark"
              >
              답변순
            </ToggleButton>
          </ToggleButtonGroup>
        </Col>
        <Col sm={6} md={4}>
        <UserSearchbarComponent3 onChange={onChangeSearchInput} onClick={onClickSearchButton} 
                            onKeyPress={onKeyPressSearch}  content={placeHolder}/>
        </Col>
        
        </Row>
        <hr style={{marginBottom:"5px"}}/><br/>
        {dataList.length!==0 ? <><div style={wrapper}>
          {
            dataList.map((videoContent)=>{
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
                  </div>
                );
            })
          }
          </div>
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

export default Project;
