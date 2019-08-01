import React ,{useState,useCallback,useEffect ,useReducer} from 'react';
import { Button, Container } from 'react-bootstrap';
import { AboutJob, JobSkills, CompanyDetail, JobDetail, Benefits, Manager } from '../../components/presentational/molecules/JobOpening';
import TitleComponent from '../../components/presentational/atoms/TitleComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIdBadge } from '@fortawesome/free-solid-svg-icons';
import swal from 'sweetalert';
import axios from 'axios';
import Router from 'next/router';

/**
   @auth 정진호
 * @summary 구인구직 게시판 글쓰기 기능 , 예외처리 ,정규표현식, 파일업로드
 */

const  greyBox = {        
    position: 'relative',
    color: '#212529',
    padding: '1rem',
    marginRight: '0',
    marginLeft: '0',
    border: '.2rem solid #ececec',
    borderRadius: '8px',
}

function reducer(state,action){
  return {
    ...state,
    [action.name] : action.value
  }
}
const Write = () => {
  const[Form,setForm] = useReducer(reducer,{title:"",subtitle:"",period:"",job_type:"",job_time:"",job_dept:"",email:"",
                                            phone:"",tags:"",career:"", file :""});
  const {title,subtitle,period,job_type,job_time,job_dept,email,phone,tags,career} = Form;
  const [dropdown,setDropdown] = useState("인원 선택");
  const [data,setData] = useState("<p></p>");
  const [file,setFile] = useState("");
  const [filename,setFilename] = useState("");
  const [fileurl,setFileurl]= useState("");  
  const [file1,setFile1] = useState("");
  const [filename1,setFilename1] = useState("");
  const [userrole,setUserrole] = useState("");
  const onChangeInput = e =>{
    setForm(e.target);
  };
  const onChangeFile = useCallback((e)=>{
    let reader = new FileReader()
    let files = e.target.files[0];
    reader.onloadend = () => {
      setFileurl(reader.result);
    }
    reader.readAsDataURL(files);
      setFilename(e.target.files[0].name);
      setFile(e.target.files[0]);
  },[filename,file,fileurl]);

  const onChangeFile2 = useCallback((e)=>{
      setFilename1(e.target.files[0].name);
      setFile1(e.target.files[0]);
  },[filename1,file1]);


  const dropdownEvent = useCallback((e)=>{
      setDropdown(e.target.name);
  },[dropdown]);
  const ChangeData = useCallback((e)=>{
    setData(e.editor.getData());
  },[data]);

  const backUrl = process.env.NODE_ENV === 'production'? "?" : "?";

  const SubmitBoard = useCallback(()=>{
    if(title === "" &&subtitle  === "" &&period  === "" &&job_type  === "" &&job_time  === "" &&job_dept  === "" &&email  === "" &&phone  === "" &&tags  === "" &&career === ""&&filename === "" && dropdown =="인원 선택"){
      swal({
        text: "빈칸은 등록이 불가능합니다.",
        title: "공백 오류",
        timer: "4000",
        icon: "/static/image/Logo2.png"
          });
      return;
    }else if(title === " " &&subtitle  === " " &&period  === " " &&job_type  === " " &&job_time  === " " &&job_dept  === " " &&email  === " " &&phone  === " " &&tags  === " " &&career === " "){
      swal({
        text: "빈칸은 등록이 불가능합니다.",
        title: "공백 오류",
        timer: "4000",
        icon: "/static/image/Logo2.png"
          });
      return;
    }else if(title.includes("  ") &&subtitle.includes("  ") &&period.includes("  ") &&job_type.includes("  ") &&job_time.includes("  ") &&job_dept.includes("  ") &&email.includes("  ") &&phone.includes("  ") &&tags.includes("  ") &&career.includes("  ")){
      swal({
        text: "빈칸은 등록이 불가능합니다.",
        title: "공백 오류 errorCode-공백 2개 발견",
        timer: "4000",
        icon: "/static/image/Logo2.png"
          });
      return;
    }else{
      const regex = /^[ㄱ-ㅎ가-힣a-zA-Z0-9,-\s]+$/;
      const regEmail = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
      const regphone = /^\d{3}-\d{3,4}-\d{4}$/;
      const date = new Date();

      let year = date.getFullYear();
      let month = date.getMonth()+1;
      let day = date.getDate();
      if((day+"").length <2){
        day = "0"+day;
      }
      let temp = period.split("-");
      let results = Number(temp[0]);
          results += Number(temp[1]);
          results += Number(temp[2]);
      let getDates = year+month+day;
      if(!regex.exec(tags)){
            swal({
                text: "태그는 [한글], [영문], [-]만 가능하며 콤마(,)로 구분됩니다.",
                title: "태그 오류",
                timer: "3000",
                icon: "/static/image/Logo2.png"
             });
            return;
        }else if(!regEmail.exec(email)){
            swal({
              text: "이메일 형식으로 입력해주세요.",
              title: "이메일 오류",
              timer: "3000",
              icon: "/static/image/Logo2.png"
          });
              return;
        }else if(!regphone.exec(phone)){
          swal({
            text: "연락처가 올바르지 않습니다.",
            title: "담당자 번호 오류",
            timer: "3000",
            icon: "/static/image/Logo2.png"
         });
            return;
        }else if(eval(getDates) > eval(results)){
          swal({
            text: "공고 기간은 현재 날짜보다 뒤에 존재할수 없습니다.",
            title: "기간 오류",
            timer: "10000",
            icon: "/static/image/Logo2.png"
         });
            return;
        }else{
          if(file !== undefined && file !== "" &&file !== null && file1 !== undefined && file1 !== "" &&file1 !== null){
            let Forms = new FormData();
            Forms.append('files',file);
            Forms.append('files2',file1);
            Forms.append('title',title);
            Forms.append('userid',localStorage.getItem("userid"));
            Forms.append('subtitle',subtitle);
            Forms.append('job_type',job_type);
            Forms.append('job_time',job_time);
            Forms.append('job_dept',job_dept);
            Forms.append('scale',dropdown);
            Forms.append('email',email);
            Forms.append('phone',phone);
            Forms.append('tags',tags);
            Forms.append('content',data);
            Forms.append('career',career);
            Forms.append('period',period);
                 axios({
                     method :'post',
                     baseURL : backUrl,
                     url :"/job/insert",
                     data : Forms,
                     headers :{'Content-Type':'multipart/form-data'}
                 }).then(()=>{
                  Router.push("/job/board");
                  swal({
                    title: "등록 성공",
                    text: "능력치가 +3 올랐습니다.",
                    icon: "/static/image/Logo2.png",
                  });
                }).catch((xhr)=>{
                  console.log(xhr);
              });
          }else{
            swal({
              text: "파일이 존재하지 않습니다.",
              title: "로고 or 이력서 양식 필수!",
              timer: "3000",
              icon: "/static/image/Logo2.png"
           });
          }

        }

      }
  });
  
useEffect(()=>{
  setUserrole(localStorage.getItem("role_name"));
},[])
  return (
        <>
  { userrole == "ROLE_COMPANY" ? 
  <>
    <Container>
        <TitleComponent title="구인구직 게시판">
                <FontAwesomeIcon style={{width:"21px",height:"auto"}} icon={faIdBadge}/>                          
        </TitleComponent>
        <br/><AboutJob border={greyBox} onChange={onChangeInput}/>
        <br/><br/><JobSkills border={greyBox} onChange={onChangeInput}/>
        <br/><br/><JobDetail border={greyBox} data={data} onChange={ChangeData}/>
        <br/><br/><CompanyDetail border={greyBox} dropdown={dropdownEvent} dropdownName={dropdown} onChangeFile={onChangeFile} filename={filename}
                                  onChangeFile2={onChangeFile2} logoSrc={fileurl} filename2={filename1}/>        
        <br/><br/><Manager border={greyBox}/>
        <br/><br/>
        <Button variant="primary" type="submit" style={{float:"right"}} onClick={SubmitBoard}>
              등록하기
         </Button>
        </Container>
        <br/><br/>
  </>
        : "잘못된 접근입니다."
    }
        </>
      );
    }
export default Write;