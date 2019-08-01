import React ,{Component} from 'react';
import {UserImageComponent2} from '../../presentational/atoms/UserImageComponent';
import { UserProfile2 ,  UserProfile3 } from '../../presentational/molecules/UserProfile';
import { UserSub2} from '../../presentational/molecules/UserSub';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfo, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'; 
import Router from 'next/router';
import JobSimpleBoard from '../../presentational/molecules/JobSimpleBoard';

/**
 * 
 * @author 우세림
 * @summary 개발자들 상세 페이지
 * 
 */

const user_img = {
    height: "auto",
    width: "100%"
}

const user_ok = {
    paddingTop : "1rem",
    display: "grid",
    gridTemplateColumns: "17% 50% 25%",
    gridGap: "0px 30px"
}

const userContent = {
    width: "100%",
    gridArea: "1 / 2 / 2 / 3"
}

const userSub = {
    color: "#6d6d6d",
    gridArea: "1 / 3 / 2 / 4"
}

const userWriteTitle = {
    fontSize: "20px",
    fontWeight: "600",
    marginTop: "2.500em",
    display: "inline-block"
}

const userWriteDiv ={
    height: "100%",
    marginBottom: "100px"
};

const companyarea = {
    marginBottom: "15px",
    display: "inline-block"
};

const endpoint = process.env.NODE_ENV === 'production'? "?" : "?";


class Info extends Component {
     constructor(props){
        super(props);

        this.state = {
            companydata : [],
            jobdata : [],
            userid : 0
        };
    };

    async componentDidMount() {
        let user = Router.query['userid'];
        this.setState({
            userid : user
        })

        await axios.get(endpoint, {
            params : {
                userid : Router.query['userid']
            }
            }).then((Response) => {
                this.setState({
                    companydata : Response.data[0]
                });
            });

        await axios.get(endpoint, {
            params : {
                userid : Router.query['userid'],
                start : 0,
                end : 3
            }
            }).then((Response) => {
                this.setState({
                    jobdata : Response.data
                });
            });
        
    }

    render(){
        function textLengthOverCut(txt, len, lastTxt) {
            if (txt.length > len) {
                txt = txt.substr(0, len) + lastTxt;
            }
            return txt;
        }

        function htmlCut(title) {
            let replytitle = title.replace(/<(\/)?([a-zA-Z]*)(\s[a-zA-Z]*=[^>]*)?(\s)*(\/)?>/ig, "");
            return replytitle;
        }

        function dateType(data) {
            let date = data+"";
            return date.substr(0,10);
        }

        function leadingZeros(data, num) {
            let zero='';
            let str='';
            let result= '';
            if(data!=undefined){
                if (data.toString().length < num) {
                    for (var i = 0; i < num - data.toString().length; i++)
                     zero += '0';
                }
                str= zero + data;
                result += str.substr(0,3);
                result += '-';
                result += str.substr(3,4);
                result += '-';
                result += str.substr(7);
            }
            return result;
       }


        const UserList= this.state.jobdata.map((content, index)=>{ 
            return <JobSimpleBoard key={index}
                            seq={content.id}
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
                            scrap={content.scrap}
            />
        });
             
       
        let {companydata, jobdata} = this.state;
        if(this.state.companydata != null ){

            return (
            <>
                <div style={user_ok}>
                    <div>
                        <UserImageComponent2 css={user_img} imagepath={companydata.logo?companydata.logo:?}  />
                    </div>
                    <div style={userContent}>
                        <UserProfile2 company_name={companydata.company_name?companydata.company_name:"회사이름"}  
                                     homepage_url={companydata.homepage_url?companydata.homepage_url:"홈페이지"}
                                     name={companydata.name?companydata.name:"이름"}
                                     email={companydata.email?companydata.email:"이메일"} />
                    </div> 
                    <div style={userSub}>
                        <UserSub2 tel={leadingZeros(companydata.company_tel,11)}
                                company_email={companydata.company_email} 
                                date_created={dateType(companydata.cdate_created)} 
                                last_updated={dateType(companydata.clast_updated)}/>
                    </div>
                </div>

                <div>
                    <span style={userWriteTitle}>
                        <FontAwesomeIcon icon={ faInfo } style={{width:"7px",height:"auto"}}/>&nbsp; 상세설명
                    </span><hr/>
                    <UserProfile3 company_info={companydata.company_info!=""?companydata.company_info:"등록한 소개가 없습니다."} />
                </div>
                

                <div>
                    <span style={userWriteTitle}>
                        <FontAwesomeIcon icon={ faMapMarkerAlt } style={{width:"15px",height:"auto"}}/>&nbsp; 찾아가는 길
                    </span><hr/>
                    <span style={companyarea}>{companydata.company_area?companydata.company_area:"위치가 없습니다."}</span>
                    
                </div>

                <div style={userWriteDiv}> 
                    <span style={userWriteTitle}>
                        구인공고 게시글
                    </span>
                    &nbsp;({jobdata.length})<hr/>
                        {UserList.length!=0?UserList: "등록한 구인구직이 없습니다."}
                </div>
            </>
            );
        } else{
            return (
                <>
                <div style={{margin: "10% 35%", width: "100%"}}>기업정보를 등록하지 않은 회원입니다.</div>   
                </>
            )
        }
    }
}

export default Info;