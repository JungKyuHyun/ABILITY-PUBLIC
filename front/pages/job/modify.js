import React ,{useState,useCallback,useEffect ,useReducer} from 'react';
import { Button, Container } from 'react-bootstrap';
import { AboutJob, JobSkills, JobDetail, Manager } from '../../components/presentational/molecules/JobOpening';
import TitleComponent from '../../components/presentational/atoms/TitleComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIdBadge } from '@fortawesome/free-solid-svg-icons';
import swal from 'sweetalert';
import axios from 'axios';
import Router from 'next/router';

/**
   @auth 정진호
 * @summary 구인구직 게시판 수정 기능 , 예외처리 ,정규표현식, 파일업로드
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
const Modify = () => {
  const[Form,setForm] = useReducer(reducer,{title:"",subtitle:"",period:"",job_type:"",job_time:"",job_dept:"",email:"",
                                            phone:"",tags:"",career:"", file :""});
  const {title,subtitle,period,job_type,job_time,job_dept,email,phone,tags,career} = Form;
  const [data,setData] = useState("<p></p>");
  const [userrole,setUserrole] = useState("");
  const [Response,setResponse] = useState(null);
  const onChangeInput = e =>{
    setForm(e.target);
  };

  const ChangeData = useCallback((e)=>{
    setData(e.editor.getData());
  },[data]);

  const backUrl = process.env.NODE_ENV === 'production'? "?" : "?";

  const SubmitBoard = useCallback(()=>{
    if(title === "" &&subtitle  === "" &&period  === "" &&job_type  === "" &&job_time  === "" &&job_dept  === "" &&email  === "" &&phone  === "" &&tags  === "" &&career === ""){
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
            let Forms = new FormData();
                Forms.append('id',Router.query["seq"]);
                Forms.append('title',title);
                Forms.append('userid',localStorage.getItem("userid"));
                Forms.append('subtitle',subtitle);
                Forms.append('job_type',job_type);
                Forms.append('job_time',job_time);
                Forms.append('job_dept',job_dept);
                Forms.append('email',email);
                Forms.append('phone',phone);
                Forms.append('tags',tags);
                Forms.append('content',data);
                Forms.append('career',career);
                Forms.append('period',period);
                 axios({
                     method :'put',
                     baseURL : backUrl,
                     url :"/job/update",
                     data : Forms
                 }).then(()=>{
                  Router.push("/job/detail?seq="+Router.query["seq"] , "/content/"+Router.query["seq"]);
                  swal({
                    text: "게시글이 정상적으로 수정되었습니다.",
                    title: "수정 성공!",
                    timer: "10000",
                    icon: "/static/image/Logo2.png"
                      });
                }).catch((xhr)=>{
                  console.log(xhr);
              });
        }

      }
  });
  
useEffect(()=>{
  setUserrole(localStorage.getItem("role_name"));
      axios.get(backUrl,{
        params : {
            seq : Router.query["seq"],
            userid : localStorage.getItem("userid")
        }
    }).then((response)=>{
        setResponse(response.data)
    })
},[])
  return (
        <>
  { userrole == "ROLE_COMPANY" && Response !== null? 
  <>
    <Container>
        <TitleComponent title="구인구직 게시판">
                <FontAwesomeIcon style={{width:"21px",height:"auto"}} icon={faIdBadge}/>                          
        </TitleComponent>
        <br/><AboutJob border={greyBox} onChange={onChangeInput} title={Response.title} email={Response.email} subtitle={Response.subtitle} job_type={Response.job_type} job_dept={Response.job_dept}
                        job_time={Response.job_time} phone={Response.phone} career={Response.career} period={Response.period.substr(0,10)} />
        <br/><br/><JobSkills border={greyBox} onChange={onChangeInput} tags={Response.tags}/>
        <br/><br/><JobDetail border={greyBox} data={Response.content} onChange={ChangeData}/>       
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
export default Modify;