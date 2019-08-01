/* global google */
import React ,{Component}from 'react';
import { UserImageComponent2 } from '../../components/presentational/atoms/UserImageComponent';
import { InputTextBox, InputText } from '../../components/presentational/atoms/InputboxComponent';
import { ButtonComponent } from '../../components/presentational/atoms/ButtonComponent';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import Router from 'next/router';
import dynamic from 'next/dynamic';
import UserDeleteModal from '../../components/presentational/atoms/UserDeleteModal';
import UserUpdateModal from '../../components/presentational/atoms/UserUpdateModal';
import TitleComponent from '../../components/presentational/atoms/TitleComponent';
import { Button } from 'react-bootstrap';
import swal from 'sweetalert';
import GoogleSuggest from '../../components/presentational/atoms/GoogleSuggest';
const CkeditorOne2 = dynamic(() =>import('../../components/presentational/atoms/CkeditorOne2'),{
    ssr : false
});

/**
 * @author 우세림
 * @summary 개발자들 정보수정
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
    width: "80px",
    marginRight: "5px"
}

const user_md_profile_span3 =  {
    display: "inline-block",
    padding: "0.500em",
    color: "rgb(71, 71, 71)",
    textAlign: "right",
    fontWeight: "500",
    width: "60px",
    marginRight: "5px"
}

const user_md_btn = {
    display: "flex",
    marginTop: "3.000em",
    justifyContent: "space-between"
}

const EndPoint = process.env.NODE_ENV === 'production'? "?" : "?";

const backUrl = process.env.NODE_ENV === 'production'? "?" : "?";

class Update extends Component {
    constructor(props){
        super(props); 

        this.state = {
            userid : 0,
            userlist: [],
            userdata : [],
            result : 0,
            image : '',
            tel: '',
            area: '',
            tags: '',
            user_info: '',
            image: '',
            imagePreviewUrl: '',
            isEdit:true,
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.onCancle = this.onCancle.bind(this);
        this.Onchangeimg = this.Onchangeimg.bind(this);
        this.saveImg = this.saveImg.bind(this);
        this.onChangeTel = this.onChangeTel.bind(this);
        this.onChangeTags = this.onChangeTags.bind(this);
        this.onChangeCk = this.onChangeCk.bind(this);
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
                isEdit:false,
                image: res.data,
             });
        });

        reader.onloadend = () => {
             this.setState({
                imagePreviewUrl: reader.result,
                isEdit:false,
             });
        }
        reader.readAsDataURL(file)
    }

    saveImg(){
        axios.post(backUrl+"/user/register",{
            file:this.state.image,
            userid:Router.query['userid']
        })
        .then((res)=>{
            this.setState({
                isEdit:true,
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
        await axios.get(EndPoint+"/users", {
            params : {
                userid : Router.query['userid']
            }
            }).then((Response) => {
                this.setState({
                    userdata : Response.data,
                    tel: Response.data.tel,
                    tags: Response.data.tags,
                    user_info: Response.data.user_info,
                    
               });
        });
    }

    onChangeTel(e){
        this.setState({
            tel : e.target.value
        })
    }
  
    onChangeTags(e){
        this.setState({
            tags : e.target.value
        })
    }

    onChangeCk(e){
        this.setState({
            user_info : e.editor.getData()
        })
    }

    async onSubmit() {
        const telrex =  /^[0-9\b]+$/; 
        const tagrex = /^[ㄱ-ㅎ가-힣a-zA-Z0-9,-\s]+$/;
      
        let tel = document.getElementById('tel').value;
        let area = document.getElementById('area').value;
        let tags = document.getElementById('tags').value;
        let user_info = this.state.user_info;

        if(!area){
            area = document.getElementById('area').placeholder;
        }
        if (telrex.test(tel)){
            if(tagrex.test(tags)){
                let result = 0;
                    let Forms = new FormData();
                    Forms.append("userid", Router.query['userid']);
                    Forms.append("tel", tel);
                    Forms.append("area",area);
                    Forms.append("tags",tags);
                    Forms.append("user_info",user_info);
                    await axios({
                        method :'put',
                        baseURL :EndPoint,
                        url :"/users/modify",
                        data : Forms
                    }).then((Response)=>{
                    result = Response.data;
                    if (result > 0) {
                        swal({
                            text: "프로필이 수정되었습니다.",
                            title: "프로필 수정",
                            timer: "3000",
                            icon: "/static/image/Logo2.png"
                         });
                        Router.push("/developer/page?userid="+Router.query['userid'],"/developer/page/"+Router.query['userid']);
                    } 
                })
            }else {
                swal({
                    text: "태그는 [한글], [영문], [-]만 가능하며 콤마(,)로 구분됩니다.",
                    title: "태그 오류",
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
    }

    async onCancle() {
        Router.push("/developer/page?userid="+Router.query['userid'], "/developer/page/"+Router.query['userid']);
    };

    render(){
        let {userdata} = this.state;
        let {imagePreviewUrl} = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
            $imagePreview = (<UserImageComponent2 id="image" css={user_img} imagepath={imagePreviewUrl} />);
        } else {
            $imagePreview = (<UserImageComponent2 id="image" css={user_img} imagepath={userdata.user_image} />);
        }

        if(this.state.userdata !== null && this.state.userid > 0){
            return (
                <>
                <TitleComponent title="개발자들 정보수정">
                    <FontAwesomeIcon icon={faUsers} style={{width:"1em",height:"auto"}}/>
                </TitleComponent>
              
                    <div style={user_md} id="info_main">
                        <div>
                            <div className="imgPreview">
                                {$imagePreview}
                            </div>
                        {this.state.isEdit ?     
                            <b>
                             <InputText label="프로필 이미지 업로드" id="user_image" name="user_image" accept=".jpg, .gif, .png"
                                        className="user_image" for="user_image" type="file" onChange={this.Onchangeimg}/>
                            </b>
                            :
                            <Button block="true" variant="danger" onClick={this.saveImg} style={{marginTop:"2px"}}>변경한 이미지 저장</Button>
                        }    
                        </div>
                        
                        <div style={user_md_profile}>
                            <div id="keyword" style={user_md_profile_div}>
                                <span id="ment" style={user_md_profile_span}>전화번호</span>
                                <InputTextBox type="tel" id="tel" value={this.state.tel} maxLength="11" formcss={user_mod_input_css} onChange={this.onChangeTel}/>
                            </div>
                            <div id="keyword" style={user_md_profile_div}>
                                <span id="ment" style={user_md_profile_span}>위치</span>
                                <GoogleSuggest id="area" value={this.state.area} onChange={this.onChangeArea} placeholder={userdata.area} />
                            </div>
                            <div id="keyword"style={user_md_profile_div}>
                                <span id="ment" style={user_md_profile_span}>태그</span>
                                <InputTextBox id="tags" value={this.state.tags} formcss={user_mod_input_css} onChange={this.onChangeTags}/>
                            </div>
                            <div id="keyword" style={user_md_profile_div}>
                                <span id="ment" style={user_md_profile_span3}></span>
                                <div style={user_mod_input_css} >&nbsp;&nbsp;&nbsp;- 관심있는 키워드를 ,로 구분하여 입력해주세요.</div>
                            </div>
                            <div id="ckdiv" style={user_md_profile_div}>
                                <span id="ment" style={user_md_profile_span}>소개</span>
                                <CkeditorOne2  id="ckvalue" data={this.state.user_info} onChange={this.onChangeCk} />
                            </div>
                        </div> 
                    </div>

                    <div style={user_md_btn}>
                        <div>
                        <UserDeleteModal /> &nbsp;&nbsp;
                        <UserUpdateModal />
                        </div>
                        <div id="developer_btn">
                            <ButtonComponent name="뒤로가기" onclick={this.onCancle} variant="info"/> &nbsp;&nbsp;
                            <ButtonComponent name="저장" onclick={this.onSubmit}/>
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

export default Update;