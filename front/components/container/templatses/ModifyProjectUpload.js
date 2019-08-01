import React from 'react';
import { GridArea } from '../organisms/GridArea';
import { Form, InputGroup, FormControl } from 'react-bootstrap';
import VideoComponent from '../../presentational/atoms/VideoComponent';
import { ButtonComponent } from '../../presentational/atoms/ButtonComponent';

/**
 * @author  곽호원
 * @summary  프로젝트 보기 수정 페이지
 * @usage
 **/

const placeholder ={
    fontSize: '90%'                        
};


const ModifyProjectUpload = () => {
    return (
        <GridArea>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-4">
                    동영상 미리보기<br></br>
                    <VideoComponent vidoeId="LaW8Sc2MTMk"/><br></br>
                    동영상 업로드 완료... <br></br>
                    동영상 url = www.naver.com <br></br><br></br><br></br><br></br>
                    파일첨부 버튼
                    </div>
                    
                    <div className="col-8">
                    <Form>
                        <Form.Group controlId="title">
                            <Form.Label>제목</Form.Label>
                            <Form.Control style={placeholder} placeholder="제목을 입력해주세요" />
                        </Form.Group>
                    </Form>

                        <label htmlFor="basic-url">유튜브 비디오ID</label>
                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon3" style={placeholder}>
                                https://www.youtube.com/watch?v=
                                </InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl id="basic-url" aria-describedby="basic-addon3" 
                                             placeholder="유튜브 비디오아이디입력" style={placeholder} />
                            </InputGroup>
                    <Form>
                        <Form.Group controlId="decs">
                            <Form.Label>상세설명</Form.Label>
                            <Form.Control style={placeholder} placeholder="상세설명을 입력해주세요"
                                          as="textarea" rows="5" />
                        </Form.Group>
                        <Form.Group controlId="tags">
                            <Form.Label>태그</Form.Label>
                            <Form.Control style={placeholder} placeholder="태그를 입력해주세요" />
                        </Form.Group>
                    </Form>
                    </div>
                    <div className="col-12" style={{textAlign:'right'}}>
                        <ButtonComponent name="돌아가기" />&nbsp;&nbsp;
                        <ButtonComponent name="수정" />
                    </div>
                </div>
            </div>
        </GridArea>
    );
};

export default ModifyProjectUpload;