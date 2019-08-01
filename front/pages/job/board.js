import React,{useState,useEffect,useCallback} from 'react';
import { TitleAndButtonComponent } from '../../components/presentational/atoms/TitleComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIdBadge } from '@fortawesome/free-solid-svg-icons';
import HireList from '../../components/presentational/molecules/HireList';
import {Row,Col, ToggleButton, ToggleButtonGroup, Container} from 'react-bootstrap';
import { UserSearchbarComponent } from '../../components/presentational/atoms/SearchbarComponent';
import axios from 'axios'; 
import LodingComponent from '../../components/presentational/atoms/LodingComponent';
import Page from '../../components/presentational/molecules/Page';
import Router from 'next/router';
import swal from 'sweetalert'; 



/**
 * @author 신선하
 * @summary
 * 
 * @author 정진호
 * @summary Job_Board 게시판 구현
 */
const css = {
  verticalAlign:"middle",
}
const Board = ()=>{
  const [searchWord, setSearchWord] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isSearch, setIsSearch] = useState(0);
  const [isLoding, setIsLoding] = useState(false);
  const [dataList, setDataList] = useState([]);
  const [placeHolder, setPlaceHolder] = useState('');
  const [orderby, setOrderby] = useState(0);
  const [totalListCount, setTotalListCount] = useState(0);
  const [userrole,setUserrole] = useState("");
  const backUrl = process.env.NODE_ENV === 'production'? "?" : "?";


  const companySigh = useCallback(()=>{
    if(!localStorage.getItem("userid")){
      swal({
        text: "로그인 후 이용이 가능합니다.",
        title: "등록 실패",
        timer: "10000",
        icon: "/static/image/Logo2.png"
     });
    }else{
      axios.get(backUrl+"/signup/companysignup",{
        params : {
          userid : localStorage.getItem("userid")
        }
      }).then(()=>{
        const screenW = screen.availWidth;  // 스크린 가로사이즈
        const screenH = screen.availHeight; // 스크린 세로사이즈
        const posL=( screenW-430 ) / 2;   // 띄울창의 가로 포지션 
        const posT=( screenH-796 ) / 2;   // 띄울창의 세로 포지션 
        window.open(backUrl+"/signup/companysignup?userid="+localStorage.getItem("userid"),"ABILITY SIGN UP","width=860, height=796,top="+posT+",left="+posL+", toolbar=no,menubar=no,scrollbars=no,resizable=no,location=no");
      });
    }
  });
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
    Router.push("/job/board");
  },[orderby,isSearch]);

  useEffect( () =>{
    window.scrollTo(0,0);
    setIsLoding(true);
    setDataList([]);
    setUserrole(localStorage.getItem("role_name"));
    const endpoint = backUrl+"/job/getlist";
    axios.get(endpoint,{
      params : {
        orderby : orderby,
        currentpage : currentPage,
        userid : localStorage.getItem("userid")?localStorage.getItem("userid"):0,
        word: isSearch!=0 ? searchWord : ""
      }
    }).then((response) => {
      setIsLoding(false);
      setDataList(response.data.postBoardList);
      setCurrentPage(response.data.currentPage);
      setTotalListCount(response.data.totalListCount+1);
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
        <TitleAndButtonComponent title="구인구직 게시판" name="공고 올리기" path='/job/write'>
            <FontAwesomeIcon icon={faIdBadge} style={{width:"21px"}}/>                          
        </TitleAndButtonComponent>
      </> : 
      <>
        <TitleAndButtonComponent title="구인구직 게시판" name="기업 등록" path='/job/board' onclick={companySigh}>
            <FontAwesomeIcon icon={faIdBadge} style={{width:"21px"}}/>                          
        </TitleAndButtonComponent>
      </>  
      }
        <Row >
        <Col sm={6} md={8} style={css} id="togglegroup">
          <ToggleButtonGroup
            type="checkbox" 
            value={orderby}
            onChange={onChangeToggle}
          >
            <ToggleButton value="0" variant="info">최신순</ToggleButton>
            <ToggleButton value="1" variant="info">조회순</ToggleButton> 
        </ToggleButtonGroup>
    
        </Col>
        <Col sm={6} md={4}><UserSearchbarComponent onChange={onChangeSearchInput} onClick={onClickSearchButton} content={placeHolder}
                                                    onKeyPress={onKeyPressSearch}/></Col>
        
        </Row>
        <hr/>
          { dataList.length > 0 ?
            dataList.map((content)=>{
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
          : ""}
          <Row style={{marginTop:"1.4rem",marginBottom:"2rem",justifyContent:"center"}}>
            <div style={{textAlign:"center"}}>
              <Page currentPage={currentPage} totalListCount={totalListCount} currentPage={currentPage} handlePageChange={handlePageChange}/>
            </div>
          </Row>
      
    </>
  );
}


export default Board;
