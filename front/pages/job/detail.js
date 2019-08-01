import React ,{useState,useCallback,useEffect} from 'react';
import {Container,Row,Col,} from 'react-bootstrap';
import {ButtonComponent2} from '../../components/presentational/atoms/ButtonComponent';
import HireTitle from '../../components/presentational/molecules/HireTitle';
import HireComDescription from '../../components/presentational/molecules/HireComDescription';
import HireJobDescription from '../../components/presentational/molecules/HireJobDescription';
import HireTable from '../../components/presentational/molecules/HireTable';
import MapComponent from "../../components/presentational/atoms/MapComponent";
import axios from 'axios'; 
import Router from 'next/router';
import { TitleAndButtonComponent } from '../../components/presentational/atoms/TitleComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIdBadge } from '@fortawesome/free-solid-svg-icons';
import swal from 'sweetalert';
import ResumeModal from '../../components/presentational/atoms/ResumeModal';
/**
 * @auth 곽호원
 * @summary 구인 공고 상세페이지
 * 
 * @auth 정진호
 * @version css 수정, 실데이터 반영, 이벤트 추가 , 즐겨찾기 기능 추가
 */

const buttoncss={
    textAlign:"right"
}

const mapcss = {
    width:"400px",
    height : "300px"
}

const Detail = () => {
    const [isseq,setIsseq] = useState('');
    const [title,setTitle] = useState('');
    const [hireStartDate,setHireStartDate] = useState('');
    const [hireEndDate,setHireEndDate] = useState('');
    const [jobType,setJobType] = useState('');
    const [comScale,setComScale] = useState('');
    const [jobdept,setJobdept] = useState('');
    const [viewcount,setViewcount] = useState('');
    const [domain,setDomain] = useState('');
    const [jobTime,setJobTime] = useState('');
    const [comDescription,setComDescription] = useState('');
    const [jobDescription,setJobDescription] = useState('');
    const [xloc,setXloc] = useState('');
    const [yloc,setYloc] = useState('');
    const [userid,setUserid] = useState('');
    const [company_name,setCompany_name] = useState('');
    const [career,setCareer] = useState("");
    const [company_area,setCompany_area] = useState("")
    const [path,setPath] = useState("");
    const [scrap,setScrap] = useState(0);
    const [allscrap,setAllscrap] = useState(0);
    const [manager_email,setManager_email] = useState("");
    const [manager_tel,setManager_tel] = useState("");
    const [guest,setGuest] = useState("");
    const [resume,setResume] = useState("");
    const backUrl = process.env.NODE_ENV === 'production'? "?" : "?";


    const onClickScrap = useCallback( async()=>{
        if(guest === null && guest === undefined){
            swal({
                text: "즐겨찾기(스크랩) 기능은 로그인 후 이용이 가능합니다.",
                title: "게시물 즐겨찾기 추가 실패",
                timer: "10000",
                icon: "/static/image/Logo2.png"
             });
             return;
        }else{
            let Forms = new FormData();
            Forms.append("userid",localStorage.getItem("userid"));
            Forms.append("boardid",Router.query["seq"]);
            Forms.append("category_id","4");
            await axios({
                    method :'post',
                    baseURL : backUrl,
                    data : Forms
                }).then((response)=>{
                    if(response.data == 1){
                        swal({
                            title : "즐겨찾기 등록완료",
                            text : "제목 : "+title+" 를(을) 스크랩 하였습니다.",
                            timer :"3000"
                        })
                        setAllscrap(allscrap+1);
                    }else {
                        setAllscrap(Number(allscrap)-1);
                        swal({
                            title : "즐겨찾기 등록취소",
                            text : "스크랩을 취소하였습니다.",
                            timer :"3000"
                        })
                    }
                    setScrap(response.data);
                });
            }

     });



    useEffect(()=>{
        setGuest(localStorage.getItem("userid"));
        setIsseq(Router.query["seq"]);
        axios.get(backUrl,{
            params : {
                seq : Router.query["seq"],
                userid : localStorage.getItem("userid")
            }
        }).then((response)=>{
            setTitle(response.data.title);
            setJobDescription(response.data.content);
            setSubtitle(response.data.subtitle);
            setHireStartDate(response.data.date_created);
            setHireEndDate(response.data.period);
            setJobType(response.data.job_type);
            setComScale(response.data.scale);
            setJobdept(response.data.job_dept);
            setViewcount(response.data.view_count);
            setDomain(response.data.homepage_url);
            setJobTime(response.data.job_time);
            setPhone(response.data.manager_tel);
            setEmail(response.data.company_email);
            setComDescription(response.data.company_info);
            setXloc(response.data.xloc);
            setYloc(response.data.yloc);
            setUserid(response.data.userid);
            setCompany_name(response.data.company_name);
            setCareer(response.data.career);
            setCompany_area(response.data.company_area)
            setPath(response.data.logo);
            setScrap(response.data.scrap);
            setAllscrap(response.data.allscrap);
            setManager_tel(response.data.phone);
            setManager_email(response.data.email);
            setResume(response.data.resume);
        })
    },[]);

    const resumedown = useCallback(()=>{
        swal({
            title:"다운로드",
            text:"이력서를 다운로드 하시겠습니까?",
            icon:"/static/image/Logo2.png",
            buttons: true
        }).then((res)=>{
            if(res){
                window.open(resume);
            }else{
                return;
            }
        });
    })

    const del = useCallback(()=>{
        if(!localStorage.getItem("userid")){
            swal({
                text: "로그인 후 이용이 가능합니다.",
                title: "삭제 실패",
                timer: "10000",
                icon: "/static/image/Logo2.png"
             });
             return;
        }else{
            swal({
                text: "게시글을 정말 삭제하시겠습니까?",
                title: "삭제 경고",
                icon: "/static/image/Logo2.png",
                buttons: true
             })
             .then((deleteok)=>{
                 if(deleteok){
                 let form = new FormData();
                     form.append("seq",isseq); 
                    axios({
                        method :'put',
                        baseURL : backUrl,
                        data : form,
                        headers :{'Content-Type':'application/json'}
                    }).then((res)=>{
                        if(res.data=="success"){
                            swal({
                                title: "삭제 완료",
                                text: "능력치가 -3 떨어졌습니다",
                                icon: "/static/image/Logo2.png",
                            });
                            Router.push("/job/board");
                        }else{
                            swal("[Error0577] 삭제 실패");
                        }
                    })
                    .catch((res)=>{
                        console.log(isseq,"?");
                        console.log("오류발생",res);
                    });
                }
             });
        }

    })
    
   
    return (
        <>
            <Container>
                <TitleAndButtonComponent title="구인구직 게시판" name="이력서 받기" path={'/job/detail?seq='+isseq} onclick={resumedown}>
                    <FontAwesomeIcon icon={faIdBadge} style={{width:"21px"}}/>                          
                </TitleAndButtonComponent> 
                <Row style={{display:"flex",paddingRight:"17px", justifyContent:"flex-end"}}>
              { guest == userid ?
                <>
                    <span style={{color :"rgb(6,82,221)" , cursor :"pointer"}} onClick={()=>{
                                                                                            if(!localStorage.getItem("userid")){
                                                                                                swal({
                                                                                                    text: "로그인 후 이용이 가능합니다.",
                                                                                                    title: "수정 실패",
                                                                                                    timer: "10000",
                                                                                                    icon: "/static/image/Logo2.png"
                                                                                                 });
                                                                                            }else{
                                                                                                Router.push("/job/modify?seq="+Router.query["seq"], "/content/"+Router.query["seq"])}
                                                                                                
                                                                                            }
                                                                                            }>[수정]</span>&nbsp;&nbsp;
                    <span style={{color :"rgb(247,159,31)" ,cursor :"pointer"}} onClick={del}>[삭제]</span>  
                </> :""
                }
                  
                    </Row>
                <HireTitle title={title} company_name={company_name} count={viewcount} company_area={company_area} career={career}
                            scrapValue={scrap} scrap={onClickScrap} allscrap={allscrap} event={hireEndDate.substr(0,10)} image={"https://react-ability.s3.ap-northeast-2.amazonaws.com/spring/LogoImage"+path}/>
                <br /><br />
                <HireTable hireStartDate={hireStartDate} hireEndDate={hireEndDate.substr(0,10)} jobType={jobType} comScale={comScale} jobdept={jobdept} domain={domain}
                            jobTime={jobTime} phone={manager_tel} email={manager_email} career={career}/>
                <Row>
                    <Col>
                        <hr />
                    </Col>
                </Row> 
                <HireComDescription comDescription={comDescription} />
                <br />
                <HireJobDescription jobDescription={jobDescription} />
                <br /><br />
                <Row>
                    <Col xs={12}>
                    <div style={mapcss}>
                          <MapComponent xloc={xloc} yloc={yloc} name={company_name}/> 
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div style={buttoncss}>
                            <br />
                            <ButtonComponent2 css={{backgroundColor :"#ffffff", border:"1px solid grey", color:"grey"}} name="목록으로" onclick={()=>{Router.push("/job/board")}} />
                            &nbsp;&nbsp;
                            {guest !== undefined && guest!== null ? <ResumeModal email={manager_email}/> : ""}
                        </div>
                    </Col>
                </Row>
            </Container>
            </>
    );
};

export default Detail;