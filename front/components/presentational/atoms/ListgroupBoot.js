import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup'
import Tab from 'react-bootstrap/Tab';
import {Container,Row,Col} from 'react-bootstrap';
import { UserSearchbarComponent } from './SearchbarComponent';

/**
 * @author 정진호
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
const ListgropBoot =(props) => {
        return(
            <>
           
            <Container id="contentRow" >
             <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
             <Row style={css1}>
                <Col style={colcss} md={6} id="contentcol">
              <ListGroup id="sortbar">
                <ListGroup.Item style={left} action href="#link1">
                  {props.list1}
                </ListGroup.Item>
                <ListGroup.Item style={left} action href="#link2">
                  {props.list2}
                </ListGroup.Item>
                <ListGroup.Item style={left} action href="#link3">
                  {props.list3}
                </ListGroup.Item>
              </ListGroup>
              </Col>
              <Col md={{span:3,offset :3}}>
                <Row style={padding} id="searchrow">
                   <UserSearchbarComponent onChange={props.onChange} onKeyPress={props.onKeyPress} value={props.value} onClick={props.onClick} content={props.placeholder} inputId={props.inputid}/>
                </Row>
              </Col>
            </Row>
            <Row id="contentRow">
                <Col >
                    {props.children}
                </Col>
            </Row>
         </Tab.Container>
        </Container>
            </>
        )
}

export default ListgropBoot;

