import React,{useState, useCallback, useEffect} from 'react';
import { Row, Col,ToggleButtonGroup,ToggleButton, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLaptopCode } from '@fortawesome/free-solid-svg-icons';
import { TitleAndButtonComponent } from '../../components/presentational/atoms/TitleComponent';
import axios from 'axios'; 
import { UserSearchbarComponent } from '../../components/presentational/atoms/SearchbarComponent';
import LodingComponent from '../../components/presentational/atoms/LodingComponent';
import Page from '../../components/presentational/molecules/Page';
import VideoCard from '../../components/presentational/molecules/VideoCard';


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


const Board = ()=>{
  const [searchWord, setSearchWord] = useState('');
  const [dataList, setDataList] = useState([]);
  const [placeHolder, setPlaceHolder] = useState('글 제목 검색');
  const [isLoding, setIsLoding] = useState(false);
  const [orderby, setOrderby] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [endPageBlock, setEndPageBlock] = useState(1);
  const [pageSize, setPageSize] = useState(15);
  const [startPageBlock, setStartPageBlock] = useState(1);
  const [totalListCount, setTotalListCount] = useState(0);
  const [totalPage, setTotalPage] = useState(1);
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
    window.scrollTo(0,0);
    setIsLoding(true);

    axios.get(backUrl+"/project",
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
      setDataList(res['data']['projectBoardList']);
    })
    .catch((res)=>{
      setIsLoding(false);
      console.log(res);
    });
  },[orderby,totalListCount,currentPage,isSearch]);

  const path = ("https://img.youtube.com/vi/"+dataList.map((videoContent)=>{videoContent.file_path})+"/hqdefault.jpg");
  if(path == null){
      path = "?" 
   }
  return(
    <>
    {isLoding && <LodingComponent/>}
        
    
        <TitleAndButtonComponent 
          title="프로젝트 자랑" 
          name="글 올리기" 
          path='/project/write'
          >
            <FontAwesomeIcon style={{width:"35px",height:"auto"}} 
                              icon={faLaptopCode}/>                          
        </TitleAndButtonComponent> 
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
            >최신순
          </ToggleButton>
          <ToggleButton 
            value="1" 
            style={{backgroundColor:"#fff",
                    color:"#5F4B8B",
                    borderColor:"rgba(0,0,0,.125)"}} 
                    variant="dark"
            >조회순
          </ToggleButton>
          </ToggleButtonGroup>
        </Col>
        <Col sm={6} md={4}>
          
          <UserSearchbarComponent 
            name="user_searchbar"
            onChange={onChangeSearchInput} 
            onClick={onClickSearchButton} 
            onKeyPress={onKeyPressSearch}
            content={placeHolder}
          />
        </Col>
        
        </Row>        
        <style>

          {`
          @media screen and (max-width:480px){
            #videocontent {
              display : block!important;
            }

            #loading{
              top : 50%!important;
            }
          }
          `}
        </style>
        <hr style={{marginBottom:"5px"}}/><br/>
        {dataList.length!==0 ?  
        <Container style={wrapper} id="videocontent">
          {
            dataList.map((videoContent)=>{
              return(
                <div key={JSON.stringify(videoContent['id'])}>                  
                <VideoCard
                  seq={videoContent.id}
                  tags={videoContent.tags.replace('"','').replace('"','').replace("0",'')}  
                  title={videoContent.title.replace('"','').replace('"','')} 
                  view_count={videoContent.view_count}
                  likecount={videoContent.likecount}
                  reputation={videoContent.reputation}
                  id={videoContent.nick_name.replace('"','').replace('"','')}
                  image={"https://img.youtube.com/vi/"+videoContent.file_path+"/hqdefault.jpg"}
                  path="/project/detail" 
                  userid={videoContent.userid}

                  content={videoContent.content} 
                  date_created={videoContent.date_created}
                  videoCss={{padding:'1rem 0 1rem 0', 
                             backgroundColor:'black'}}  
                  />
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
              handlePageChange={handlePageChange}
              />
            </div>
          </Row>
        </>
  );
}

export default Board;