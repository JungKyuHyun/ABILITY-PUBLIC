import React ,{Component}from 'react';
import { UserImageComponent2 } from '../../../components/presentational/atoms/UserImageComponent';
import { InputTextBox, InputText } from '../../../components/presentational/atoms/InputboxComponent';
import { ButtonComponent } from '../../../components/presentational/atoms/ButtonComponent';
import axios from 'axios'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import Router from 'next/router';
import dynamic from 'next/dynamic';
import TitleComponent from '../../../components/presentational/atoms/TitleComponent';
import { Button } from 'react-bootstrap';
import swal from 'sweetalert';
import ReactGoogleMapLoader from "react-google-maps-loader"
import ReactGooglePlacesSuggest from "react-google-places-suggest"
import Geocode from "react-geocode";
const CkeditorOne2 = dynamic(() =>import('../../../components/presentational/atoms/CkeditorOne2'),{
    ssr : false
});

/**
 * @author 우세림
 * @summary 기업정보수정
 */

const user_mod_input_css ={
    height: "35px",
    width: "100%",
    color: "gray"
}

const user_img = {
    width: "100%",
    height:"auto"
}

const user_md =  {
    paddingTop : "1rem",
    display: "grid",
    gridTemplateColumns: "18% 82%",
    marginBottom: "10px"
}

const user_md_profile = {
    paddingLeft: "15px",
}

const user_md_profile_div =  {
    display: "flex"
}

const user_md_profile_span =  {
    display: "inline-block",
    padding: "0.500em",
    color: "rgb(71, 71, 71)",
    textAlign: "right",
    fontWight: "500",
    width: "120px",
    marginRight: "5px"
}

const user_md_profile_span2 =  {
    display: "inline-block",
    padding: "0.500em",
    color: "rgb(71, 71, 71)",
    textAlign: "right",
    fontWight: "500",
    width: "135px",
    marginRight: "5px"
}

const user_md_btn = {
    display: "flex",
    marginTop: "3.000em",
    justifyContent: "space-between"
};


class CUpdate extends Component {
    constructor(props){
        super(props);

        this.state = {
            userid : 0,
            userlist: [],
            companydata : [],
            result : 0,
            image : '',
            company_tel: '',
            company_area: '',
            company_email: '',
            homepage_url: '',
            company_info: '',
            image: '',
            imagePreviewUrl: '',
            isEdit: false,
            value : "",
            search : ""
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.Onchangeimg = this.Onchangeimg.bind(this);
        this.saveImg = this.saveImg.bind(this);
        this.onChangeTel = this.onChangeTel.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangehomepage = this.onChangehomepage.bind(this);
        this.onChangeCk = this.onChangeCk.bind(this); 
        this.onChangeArea=this.onChangeArea.bind(this);
        this.handleSelectSuggest=this.handleSelectSuggest.bind(this);
        this.handleNoResult = this.handleNoResult.bind(this);
        this.handleStatusUpdate = this.handleStatusUpdate.bind(this);
    };
   
      
    Onchangeimg(e){
        let reader = new FileReader();
        let file = e.target.files[0];
        
        const imageFormData = new FormData();

        [].forEach.call(e.target.files, (f)=>{
            imageFormData.append('image', f);
        });

        axios.post(backUrl,
            imageFormData,
        )
        .then((res)=>{
            this.setState({
                isEdit:true,
                image: res.data,
             });
        });

        reader.onloadend = () => {
             this.setState({
                imagePreviewUrl: reader.result,
                
             });
        }
        reader.readAsDataURL(file)
    }

    saveImg(){
        axios.post(backUrl2,{
            file:this.state.image,
            userid:Router.query['userid']
        })
        .then((res)=>{
            this.setState({
                isEdit:false,
            });
            swal({
                    text: "이미지가 저장되었습니다.",
                    title: "이미지 저장",
                    timer: "3000",
                    icon: "/static/image/Logo2.png"
                });
            return;
        })
    }

    async componentDidMount() {
        let user = Router.query['userid'];
        this.setState({
            userid : user
        })
        
        await axios.get(EndPoint, {
            params : {
                userid : Router.query['userid']
            }
            }).then((Response) => {
                this.setState({
                    companydata : Response.data[0],
                    company_tel : Response.data[0].company_tel,
                    company_email : Response.data[0].company_email,
                    homepage_url : Response.data[0].homepage_url,
                    company_info : Response.data[0].company_info,
                    company_area : Response.data[0].company_area
               });
        });
    }

    onChangeTel(e){
        this.setState({
            company_tel : e.target.value
        })
    }

    onChangeEmail(e){
        this.setState({
            company_email : e.target.value
        })
    }

    onChangehomepage(e){
        this.setState({
            homepage_url : e.target.value
        })
    }

    onChangeCk(e){
        this.setState({
            company_info : e.editor.getData()
        })
    }

    onChangeArea(e){
        this.setState({search: e.target.value, value: e.target.value});
    }
 
    handleSelectSuggest = (geocodedPrediction, originalPrediction) => {
        this.setState({
            search: "",
            value: geocodedPrediction.formatted_address,
        });
    }

    
    async onSubmit() {
        const telrex =  /^[0-9\b]+$/; 
        const emailrex = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
        let tel = this.state.company_tel;
        let email = this.state.company_email;
        let homepage = this.state.homepage_url;
        let info = this.state.company_info;
        
        Geocode.setApiKey("?");
        Geocode.enableDebug();
        Geocode.fromAddress(this.state.value.replace(/[\s]/g,"").length >0 ? this.state.value : this.state.company_area).then(
            response => {
              const { lat, lng } = response.results[0].geometry.location;
              if (telrex.test(tel)){
                if(emailrex.test(email)){

                    let result = 0;
                    let Forms = new FormData();
                    Forms.append("userid", Router.query['userid']);
                    Forms.append("company_tel", tel);
                    Forms.append("company_email", email);
                    Forms.append("company_area",this.state.value.replace(/[\s]/g,"").length >0 ? this.state.value : this.state.company_area);
                    Forms.append("homepage_url",homepage);
                    Forms.append("xloc",lat);
                    Forms.append("yloc",lng);
                    Forms.append("company_info",info);
                    axios({
                        method :'put',
                        baseURL : EndPoint,
                        data : Forms
                    }).then((Response)=>{
                       result = Response.data;
                       if (result > 0) {
                           swal({
                               text: "기업 프로필이 수정되었습니다.",
                               title: "기업 프로필 수정",
                               timer: "3000",
                               icon: "/static/image/Logo2.png"
                            });
                           Router.push("/developer/page?userid="+Router.query['userid'], "/developer/page/"+Router.query['userid']);
                       } else {
                           alert("ddd");
                       }
                   });
                }else {
                    swal({
                        text: "이메일 양식을 확인해주세요.",
                        title: "이메일 오류",
                        timer: "3000",
                        icon: "/static/image/Logo2.png"
                     });
                    return;
                }
            } else {
                swal({
                    text: "전화번호는 [숫자] 11자리 이하로 입력해주세요.",
                    title: "전화번호 오류",
                    timer: "3000",
                    icon: "/static/image/Logo2.png"
                 });
                document.getElementById('tel').value ="";
                document.getElementById('tel').focus();
                return;
            }
            },
            error => {
              console.error(error);
            }
          );
        
    }

    async onCancle() {
        Router.push("/developer/page?userid="+Router.query['userid'], "/developer/page/"+Router.query['userid']);
    };


    render(){
        let {companydata} = this.state;
        let {imagePreviewUrl} = this.state;
        let $imagePreview = null;

        if (imagePreviewUrl) {
            $imagePreview = (<UserImageComponent2 id="image" css={user_img} imagepath={imagePreviewUrl} />);
        } else {
            $imagePreview = (<UserImageComponent2 id="image" css={user_img} imagepath={companydata.logo} />);
        }

        
        if(this.state.companydata !== null && this.state.userid > 0){
            return (
                <>
        
                <TitleComponent title="기업 정보수정">
                    <FontAwesomeIcon icon={faUsers} style={{width:"1em",height:"auto"}}/>
                </TitleComponent>
              
                    <div style={user_md}  id="info_main">
                        <div>
                            
                                <div className="imgPreview">
                                    {$imagePreview}
                                </div>
                        {!this.state.isEdit ? 
                            <b>
                             <InputText label="로고 업로드" id="user_image" name="user_image" accept=".jpg, .gif, .png"
                                        className="user_image" for="user_image" type="file" onChange={this.Onchangeimg}/>
                            </b>
                        :
                            <Button block="true" variant="danger" onClick={this.saveImg} style={{marginTop:"2px"}}>변경한 로고 저장</Button>
                        }    
                            
                        </div>
                        
                        <div style={user_md_profile}>
                            <div id="keyword" style={user_md_profile_div}>
                                <span id="ment" style={user_md_profile_span}>회사 전화번호</span>
                                <InputTextBox type="tel" id="tel" value={this.state.company_tel} maxLength="11" formcss={user_mod_input_css} onChange={this.onChangeTel}/>
                            </div>
                            <div id="keyword" style={user_md_profile_div}>
                                <span id="ment" style={user_md_profile_span}>회사 이메일</span>
                                <InputTextBox id="email" value={this.state.company_email} formcss={user_mod_input_css} onChange={this.onChangeEmail}/>
                            </div>
                            <div id="keyword" style={user_md_profile_div}>
                                <span id="ment" style={user_md_profile_span}>회사 위치</span>
                                <ReactGoogleMapLoader
                                        params={{
                                            key: "",
                                            libraries: "places,geocode",
                                        }}
                                        render={googleMaps =>
                                            googleMaps && (
                                                <ReactGooglePlacesSuggest
                                                    googleMaps={googleMaps}
                                                    autocompletionRequest={{
                                                        input: this.state.search,
                                                    }}
                                                    onNoResult={this.handleNoResult}
                                                    onSelectSuggest={this.handleSelectSuggest}
                                                    onStatusUpdate={this.handleStatusUpdate}
                                                    textNoResults="My custom no results text" 
                                                    customRender={prediction => (
                                                        <div className="customWrapper">
                                                            {prediction
                                                                ? prediction.description
                                                                : "My custom no results text"}
                                                        </div>
                                                    )}
                                                >
                                                    <InputTextBox type="text"
                                                                value={this.state.value}
                                                                onChange={this.onChangeArea}
                                                                id="area"
                                                                placeholder={companydata.company_area}
                                                    /> 
                                                </ReactGooglePlacesSuggest>
                                            )
                                        }
                                    />
                            </div>
                            <div id="keyword" style={user_md_profile_div}>
                                <span id="ment" style={user_md_profile_span}>홈페이지</span>
                                <InputTextBox id="homepage" value={this.state.homepage_url} formcss={user_mod_input_css} onChange={this.onChangehomepage}/>
                            </div>
                            <div id="keyword" style={user_md_profile_div}>
                                <span id="ment" style={user_md_profile_span2}>회사 소개</span>
                                <CkeditorOne2 id="ckvalue" data={this.state.company_info} onChange={this.onChangeCk} />
                            </div>
                        </div> 
                    </div>

                    <div style={user_md_btn}>
                        <div>
                        </div>
                        <div>
                            <ButtonComponent name="뒤로가기" onclick={this.onCancle} variant="info"/> &nbsp;&nbsp;
                            <ButtonComponent name="확인" onclick={this.onSubmit}/>
                        </div>
                    </div>
                </>
            )
        }else {
            return (
                <>
                    <h6> </h6>
                </>
            )
        }
    }
}

export default CUpdate;