import React from 'react';
import { SingleSeachbarComponent , SingleButtonComponent } from '../atoms/SearchbarComponent';
import ListgroupComponent , {ListContent} from '../atoms/ListgroupComponent';
import { FormControl, Container, Row, Col } from 'react-bootstrap';

/**
 * @author  정진호
 * @summary 구인구직 게시판  
 */


const fromcss = {
    display:"flex"
}
const ListContents = {
    marginTop : "1.5rem"
}
const css = {
    width : "auto"
}
const containercss ={
    width : "100%"
}
const listcss = {
    float : "right",
    width : "70%",
    textAlign: "center"
}
export const FromComponent = (props) => {
    return(
      <FormControl
      placeholder={props.content}
      aria-label={props.content}
      aria-describedby="basic-addon2"
      />
    )
  
}

const HireBoard = (props) => {
    return(
        <>
        <Container style={containercss}>
        <Row>
            <Col sm={6}>
                 <div style={css}>
                     <form action={props.action} method={props.method} style={fromcss}>
                         <FromComponent content="언어 별 검색"/>
                         <SingleSeachbarComponent content="지역 별 검색">
                         </SingleSeachbarComponent>
                         <SingleButtonComponent id="sc_Btn"/>
                     </form>
                 </div>
             </Col>
             <Col lg={6}>
                 <ListgroupComponent css={listcss}/>
             </Col>
         </Row>
        </Container>
        <Container>
            <div style={ListContents}>
            <Row>
                <div className="col-12">
                    <ListContent/>
                </div>
            </Row>
            </div>
        </Container>
        </>
    )

}


export default HireBoard;