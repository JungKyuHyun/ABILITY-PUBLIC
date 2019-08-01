import React,{useState, useCallback, useEffect} from 'react';	
import { Row, Col,ToggleButtonGroup,ToggleButton, Container,Table} from 'react-bootstrap';	
import axios from 'axios';	
import { UserSearchbarComponent3 } from '../../presentational/atoms/SearchbarComponent';	
import LodingComponent from '../../presentational/atoms/LodingComponent';	
import Page from '../../presentational/molecules/Page';	
import { ButtonComponent } from '../../presentational/atoms/ButtonComponent';	
import AdminReportTbody from '../../presentational/molecules/AdminReportTbody';	
import AdminReportThead from '../../presentational/molecules/AdminReportThead';	
import swal from 'sweetalert';	
import filesaver from 'file-saver';	


 /**	
 * @author 신선하 	
 * @summary  회원관리	
 * 	
 * @author 강기훈	
 * @summary  회원관리 로직구현 	
 */ 	

 const css = {	
  verticalAlign:"middle",	
}	

 const deleteBtn ={	
  width:"50px",	
  height:"30px",	
  fontSize:"13px",	
  marginLeft:"45px",	
  padding:"0",	
  marginTop:"5px"	
}	

 const excelBtn ={	
  width:"50px",	
  height:"30px",	
  fontSize:"13px",	
  marginLeft:"45px",	
  padding:"0"	
}	


 const btncss ={	
  textAlign:"right",	
  marginTop:"10px",	
  marginRight:"10px",	

 }	

 const usercount_div ={	
    marginTop:"40px",	
    marginBottom:"8px",	
    display:"flex",	
    justifyContent:"space-between"	
}	

 const usercount={	
    fontFamily:"sans-serif",	
    fontWeight:"bold",	
    color:"#5F4B8B",	
    marginRight:"3px"	
}	

 const usercount_div_child={	
    marginTop:"10px"	
}	

 const count={	
    fontFamily:"sans-serif",	
    fontWeight:"bold",	
    color:"#5F4B8B",	
    marginRight:"15px"	
}	

 const Users = ()=>{	
  const [searchWord, setSearchWord] = useState('');	
  const [dataList, setDataList] = useState([]);	
  const [placeHolder, setPlaceHolder] = useState('닉네임 검색');	
  const [isLoding, setIsLoding] = useState(false);	
  const [orderby, setOrderby] = useState(0);	
  const [currentPage, setCurrentPage] = useState(1);	
  const [totalListCount, setTotalListCount] = useState(0);	
  const [isSearch, setIsSearch] = useState(0)	
  const [isdelok,setIsdelok] =useState();	
  const [totalUser,setTotalUser] =useState("0");	
  const [deletUser,setDeleteUser] =useState("0");	
  const [isChecked,setIsChecked] = useState();	
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
  },[orderby, isSearch]);	

  const backUrl = process.env.NODE_ENV === 'production'? "?" : "?";


   const onClickExcelButton = useCallback(()=>{	

      axios.get(backUrl,
      { responseType: 'arraybuffer'})
      .then(response=>{	
        var blob = new Blob([response.data], {type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});	
        filesaver.saveAs(blob, "Users.xls");	
      swal({	
        text: "현재 회원 목록을 Excel 파일로 다운로드 완료하였습니다.",	
        title: "회원 목록 다운로드",	
        icon: "/static/image/Logo2.png",	
        buttons: true	
     })     	
     });	
  })	



    let userIdList = [];	

   const onClickCheckBox = useCallback((e)=>{	

     if(e.target.checked==true){	
      userIdList.push(e.target.id);	
    }else{	
      userIdList.splice(userIdList.indexOf(e.target.id),1);	
    }	
  });	


   const handlePageChange= useCallback((pageNumber)=> {	
    setCurrentPage(pageNumber);	
  },[currentPage]);	

   const onClickDeleteButton = useCallback((e)=>{	
    if(orderby == 3){	
      swal({	
        text: "유저를 복구시키겠습니까?",	
        title: "회원 복구",	
        icon: "/static/image/Logo2.png",	
        buttons: true	
     })	
     .then((recoverok)=>{	
         if(recoverok){	
         let form = new FormData();	
             form.append("idList",userIdList); 	
               axios({	
                method :'put',	
                baseURL : backUrl,	
                data : form	
            }).then((res)=>{	
                if(res.data=="success"){	
                    swal("유저가 복구 되었습니다.");	
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
      text: "유저를 탈퇴 시키겠습니까?",	
      title: "유저 추방",	
      icon: "/static/image/Logo2.png",	
      buttons: true	
   })	
   .then((deleteok)=>{	
       if(deleteok){	
       let form = new FormData();	
           form.append("idList",userIdList); 	
             axios({	
              method :'put',	
              baseURL : backUrl,	
              url :"/test/deleteuser",	
              data : form	
          }).then((res)=>{	
              if(res.data=="success"){	
                  swal("유저를 강퇴시켰습니다.");	
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
 const modalRedirect =useCallback(()=>{	
   setIsdelok(true);	
 })	
  useEffect( () =>{	
    setIsdelok(false);	
    setIsLoding(true);	
    setDataList([]);	
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
      setDataList(res['data']['userList']);	
    })	
    .catch((res)=>{	
      setIsLoding(false);	
      console.log(res);	
    });	

     axios.get(backUrl).then((res) =>{	
       setTotalUser(res['data']);	
    })	

     axios.get(backUrl).then((res) =>{	
      setDeleteUser(res['data']);	
   })	

   },[orderby,totalListCount,currentPage,isSearch,isdelok]);	
  let btnName = "";	
            if(orderby==3){	
              btnName = "복구";	
            }else{	

               btnName = "추방";	
            }	
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
            <ToggleButton value="0" style={{backgroundColor:"#fff",color:"#5F4B8B",borderColor:"rgba(0,0,0,.125)"}} variant="dark">능력치순</ToggleButton>	
            <ToggleButton value="1" style={{backgroundColor:"#fff",color:"#5F4B8B",borderColor:"rgba(0,0,0,.125)"}} variant="dark">신규순</ToggleButton>	
            <ToggleButton value="2" style={{backgroundColor:"#fff",color:"#5F4B8B",borderColor:"rgba(0,0,0,.125)"}} variant="dark">이름순</ToggleButton>	
            <ToggleButton value="3" style={{backgroundColor:"#fff",color:"#5F4B8B",borderColor:"rgba(0,0,0,.125)"}} variant="dark">탈퇴 회원</ToggleButton>	
          </ToggleButtonGroup>	
        </Col>	
        <Col sm={6} md={4}>	
          <UserSearchbarComponent3 onChange={onChangeSearchInput} onClick={onClickSearchButton} 	
                            onKeyPress={onKeyPressSearch}  content={placeHolder}/>	
        </Col>	
        </Row>	
        <div style={usercount_div}>	
        <div style={usercount_div_child}>	
        <span style={usercount}>총 회원수:</span>	
        <span style={count}>{totalUser}</span> 	
        <span style={usercount}>탈퇴 회원수:</span>	
        <span style={count}>{deletUser}</span>	
        </div>	

         <ButtonComponent id="excelbtn" name="Excel" css={excelBtn} onclick={onClickExcelButton}/>	
        </div>	

         <Table>	

                     <AdminReportThead 	

                        n2="#" n3="닉네임" n4="이름" 	
                        n5="권한" n6="가입일" n7="이메일" n8="능력치"/>	

         {dataList.length!==0 ? <>	
          {	
            dataList.map((content)=>{	
              return(	
                <tr key={JSON.stringify(content['userid'])}>	
                <AdminReportTbody checked={isChecked}	
                                  onChange = {onClickCheckBox}	
                                  onExited = {modalRedirect}	
                                  userid={JSON.stringify(content['userid'])} 	
                                  user_image={JSON.stringify(content['user_image']).replace('"','').replace('"','')}	
                                  nick_name={JSON.stringify(content['nick_name']).replace('"','').replace('"','')}	
                                  name={JSON.stringify(content['name']).replace('"','').replace('"','')}	
                                  role_name={JSON.stringify(content['role_name']).replace('"','').replace('"','')}	
                                  date_created={JSON.stringify(content['date_created']).replace('"','').replace('"','')}	
                                  email={JSON.stringify(content['email']).replace('"','').replace('"','')}	
                                  reputation={JSON.stringify(content['reputation'])}	
                                  />	
                </tr>      	
                );	
            })	

           }	
                   <div style={btncss}> 	
                   <ButtonComponent id="deletebtn" name={btnName} css={deleteBtn} onclick={onClickDeleteButton}/>	
                   </div>	
          <Row style={{marginTop:"1.4rem",marginBottom:"2rem",justifyContent:"center"}}>	
            <div style={{textAlign:"center"}}>	

               <Page currentPage={currentPage} totalListCount={totalListCount} currentPage={currentPage} handlePageChange={handlePageChange}/>	
            </div>	
          </Row>	
          </>: <div style={{marginTop:"30%",marginLeft:"50%"}}>검색한 결과가 없습니다.</div>}	
          </Table>   	

 </Container>	
    </>	
  );	
}	

 export default Users;