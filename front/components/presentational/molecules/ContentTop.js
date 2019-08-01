import React from 'react';
import ListgroupComponent from '../../presentational/atoms/ListgroupComponent';
import {ButtonComponent} from '../../presentational/atoms/ButtonComponent';
import {Container,Row,Col} from 'react-bootstrap';
import Link from 'next/link';

/**
 * 
 * @author 정진호
 * @summary 컨텐츠 상단에 최신순 ,조회순 ,추천순.. 글쓰기 버튼을 구현하는 블록
 * 
 */
const css = { 
    width : "90px"
}
const css1 = {
    display :"inline-block",
    borderBottom : "2px solid #eaeaea",
    paddingBottom : "1rem",
    width : "100%"
}

const sortbar = {
    width :"295px",
    textAlign:"center"
}


const ContentTop = () => {
    return (
        <>
    
        <Container style={css1} id="Question_Borad_Top">
        <Row id="Question_row">
          <Col xs={{offset: 0}}><ListgroupComponent css={sortbar} name="최신순" name1="조회순" name2="댓글순" /></Col>
          <Col xs={{ span: 2 , offset: 2}}>
              <Link href="/question/write">
                  <ButtonComponent css={css} name = "글쓰기" />
              </Link>
            </Col>
        </Row>
        </Container>
        </>
    )
}


export default ContentTop;