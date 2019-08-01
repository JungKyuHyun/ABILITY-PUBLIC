import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ProfileImageUserid from '../../components/presentational/molecules/ProfileImageUserid';
import { InputText } from '../../components/presentational/atoms/InputboxComponent';
import { ButtonComponent } from '../../components/presentational/atoms/ButtonComponent';
import axios from 'axios'; 
import Router from 'next/router';
import dynamic from 'next/dynamic';
import swal from 'sweetalert';
const CkeditorOne2 = dynamic(() =>import('../../components/presentational/atoms/CkeditorOne2'),{
    ssr : false
});
/**
 * 
 * @auth 곽호원 
 * @summary 글쓰기 수정 페이지
 * 
 * @auth 정진호
 * @version selectmenu 반복문처리
 */

const buttoncss = {
    textAlign: "right"
}

const cardcss = {
    margin: "0px",
    padding: "0px"
}

let data = "";
const backUrl = process.env.NODE_ENV === 'production'? "?" : "?";

const plistEndPoint = backUrl;

class Modify extends Component {
    constructor(props) {
        super(props);

        this.state = {
            seq: 0,
            postlist: [],
            title: this.props.title,
            tags: '',
            content: '',
            data: '<p></p>',
            userid : ""
        };
        this.onChangeCk = this.onChangeCk.bind(this);
        this.onChangetitle = this.onChangetitle.bind(this);
        this.onChangetags = this.onChangetags.bind(this);
        this.onClickBack = this.onClickBack.bind(this);
        
    }

    onClickBack(){
        Router.push('/question/content?seq='+Router.query['seq'])
    }

    async componentDidMount() {
        this.setState({
            seq : Router.query['seq'],
            userid : localStorage.getItem("userid")
        })
        data = Router.query['seq'];
        await axios.get(plistEndPoint, {
            params: {
                seq: data
            }
        }).then((response)=> {
            this.setState({
                title : response.data.title,
                tags : response.data.tags,
                data : response.data.content,
                postlist : response.data
            });
        }); // ERROR;

    }
    onChangeCk(e){
        this.setState({
            data : e.editor.getData()
        })
    }
    onChangetitle(e){
        this.setState({
            title : e.target.value
        })
    }
    onChangetags(e){
        this.setState({
            tags : e.target.value
        })
    }
    
    async onSubmit() {
        const contentEndPoint = backUrl;

        let result = 0;
        if(this.state.title !== "" && this.state.title !== " " && !this.state.title.includes("  ") && this.state.data !== "<p></p>" && this.state.tags !== " " && !this.state.tags.includes("  ")){
            let Forms = new FormData();
            Forms.append("tags",this.state.tags);
            Forms.append("title",this.state.title);
            Forms.append("seq",Router.query['seq']);
            Forms.append("content",this.state.data);
            await axios({
                method :'put',
                baseURL : backUrl,
                url :"/question/modifyWriteOk",
                data : Forms
            }).then((response)=>{
                result = response.data
                if (result > 0) {
                    Router.push('/question/content?seq='+Router.query['seq']);
                } else {
                    swal({
                        title: "등록 실패",
                        text: "글쓰기 양식에 맞지 않습니다.",
                        icon: "/static/image/Logo2.png",
                    });
                }
           }).catch((xhr)=>{
             console.log(xhr);
         });
    }else{
        swal({
            title: "등록 실패",
            text: "글쓰기 양식에 맞지 않습니다.",
            icon: "/static/image/Logo2.png",
          });
        return
    }
    }
    render() {
        const { postlist } = this.state;
        if (postlist !== null && this.state.data !=="<p></p>" && this.state.userid !== "") {
            return (
                <>
                {postlist.userid == this.state.userid ?
                        <Container >
                            <br />
                            <h3 className="title">#질의응답</h3>
                            <br />
                            <div className="tab-content" id="nav-tabContent">
                                <div key="1" className="tab-pane fade show active" id="question" role="tabpanel" aria-labelledby="board-list-question">
                                    <Row>
                                        <Col>
                                            <div className="tab-content" id="nav-tabContent">
                                                <form action="" method="post">
                                                    <div id="dropdown-item">
                                                        <ProfileImageUserid style={cardcss} writer={postlist.nick_name} />
                                                    </div>
                                                    <InputText id="title" value={this.state.title} onChange={this.onChangetitle} maxLength="35"/>
                                                     <small style={{position:"absolute",left:"85%",top:"89px", color:"grey"}}>({this.state.title.length}/35)</small>
                                                    <InputText id="tags" value={this.state.tags} onChange={this.onChangetags} maxLength="30"/>
                                                     <small style={{position:"absolute",left:"85%",top:"159px", color:"grey"}}>({this.state.tags.length}/30)</small>
                                                    <CkeditorOne2 id="content" data={this.state.data} onChange={this.onChangeCk} />
                                                    <hr />
                                                    <div style={buttoncss}>
                                                        <ButtonComponent name="이전" variant="info" onclick={this.onClickBack}  /> &nbsp;&nbsp;
                                                        <ButtonComponent name="수정" onclick={this.onSubmit.bind(this)} />
                                                    </div>
                                                </form>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                            <br />
                        </Container>
                        : "잘못된 접근입니다."
                    }
                </>

            )
        } else {
            return (
                <>
                
                    <h6> </h6>
                </>
            )
        }
    }
}
export default Modify;


