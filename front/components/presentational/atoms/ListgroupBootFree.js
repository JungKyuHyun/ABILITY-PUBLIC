import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup'
import Tab from 'react-bootstrap/Tab';
import {Container,Row,Col} from 'react-bootstrap';
import { UserSearchbarComponent } from './SearchbarComponent';

/**
 * @author 정규현
 * @see 정규현 UserSearchbarComponent 컴포넌트 리펙토링, 필요한 값이 props로 전달이 안됨 
 */
const css1 = {
    borderBottom : "2px solid #eaeaea",
}
const padding = {
    paddingTop: "22px"
}
const colcss ={
    minHeight:"80px"
}

const left = {
    display : "inline"
}
const ListgropBootFree =(props) => {
        return(
            <>
         
            <Container id="contentRow2" >
             <Tab.Container id="list-group-tabs-community" defaultActiveKey="#cdata1">
              <Row style={css1}>
                  <Col style={colcss} md={6}>
                <ListGroup id="sortbar2">
                  <ListGroup.Item style={left} action href="#cdata1">
                    {props.list1}
                  </ListGroup.Item>
                  <ListGroup.Item style={left} action href="#cdata2">
                    {props.list2}
                  </ListGroup.Item>
                  <ListGroup.Item style={left} action href="#cdata3">
                    {props.list3}
                  </ListGroup.Item>
                </ListGroup>
                </Col>
                <Col md={{span:3,offset :3}}>
                  <Row style={padding}>
                    <UserSearchbarComponent onChange={props.onChange} onClick={props.onClick} content={props.placeholder}/>
                  </Row>
                </Col>
              </Row>
              <Row id="contentRow2">
                  <Col>
                      {props.children}
                  </Col>
              </Row>
         </Tab.Container>
        </Container>
            </>
        )
}

export default ListgropBootFree;

