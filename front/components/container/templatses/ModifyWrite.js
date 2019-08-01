import React, { Component } from 'react';
import { GridArea } from "../organisms/GridArea"
import { Container, Row, Col } from 'react-bootstrap';
import ProfileImageUserid from '../../presentational/molecules/ProfileImageUserid';
import { InputText } from '../../presentational/atoms/InputboxComponent';
import CkeditorModify from '../../presentational/atoms/CkeditorModify';
import { ButtonComponent } from '../../presentational/atoms/ButtonComponent';
import axios from 'axios';
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
const plistEndPoint = process.env.NODE_ENV === 'production'? "?" : "?";


class ModifyWrite extends Component {
    constructor(props) {
        super(props);

        this.state = {
            seq: props.match.params.seq,
            postlist: [],
            title: this.props.title,
            tags: '',
            content: '',
        };
    }

    async componentDidMount() {

        data = this.state.seq;
        let { data: postlist } = await axios.get(plistEndPoint, {
            params: {
                seq: data
            }
        }); // ERROR;
        this.setState({
            postlist
        });
    };

    async onSubmit() {
        const contentEndPoint = process.env.NODE_ENV === 'production'? "?" : "?";
        let id = document.getElementById('id').value;
        let title = document.getElementById('title').value;
        let tags = document.getElementById('tags').value;
        let con = document.getElementById('ckvalue').innerHTML;
        if (document.getElementById('title') !== null || document.getElementById('title') !== "" || document.getElementById('title') !== undefined) {
            title = document.getElementById('title').value;
        } else {
            alert("제목을 입력해주세요.");
            return
        }
        if(document.getElementById('ckvalue').innerHTML !== null || document.getElementById('ckvalue').innerHTML !== "" || document.getElementById('ckvalue').innerHTML !== undefined) {
            con =  document.getElementById('ckvalue').innerHTML;
         }
        if (document.getElementById('tags') !== null || document.getElementById('tags') !== "" || document.getElementById('tags') !== undefined) {
            tags = document.getElementById('tags').value;
        }
        let { data: result } = await axios.get(contentEndPoint, {
            params: {
                seq : id,
                userid: 58,
                title: title,
                content: con,
                tags: tags
            }
        });
        if (result > 0) {
            alert("수정 성공");
            window.history.go(-1);
        } else {
            alert("수정 실패");
        }
    }
    render() {
        const { postlist } = this.state;
        if (postlist !== null) {
            return (
                <>
                    <GridArea >
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
                                                    <InputText id="title" content={postlist.title} />
                                                    <InputText id="tags" content={postlist.tags} />
                                                    <CkeditorModify id="content" data={postlist.content} />
                                                    <input type="hidden" id="id" value={this.state.seq} />
                                                    <hr />
                                                    <div style={buttoncss}>
                                                        <ButtonComponent name="취소" /> &nbsp;&nbsp;
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
                    </GridArea>
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
export default ModifyWrite;


