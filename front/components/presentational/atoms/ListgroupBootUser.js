import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup'
import Tab from 'react-bootstrap/Tab';
import { Container, Row, Col } from 'react-bootstrap';
import { UserSearchbarComponent } from './SearchbarComponent';
import { SortComponent } from './SortComponent';

/**
 * @author 강기훈
 */


const colcss = {
  minHeight: "80px",
  padding:"0 14px"
}

const left = {
  display: "inline"
}

const Search_css = {
  marginTop: "40px",
  display: "grid",
  gridTemplateColumns: "35% 40%",
  justifyContent: "space-between"
}

const search_bar ={
   display: "flex"
}


const ListgropBootUser = (props) => {

  return (
    <>
   
      <Container id="contentRow" >
        <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
            <Row>
              <Col style={colcss} md={6}>
                <ListGroup id="sortbar">
                  <ListGroup.Item style={left} action href="#link1" onClick={props.clickEvent}>
                    {props.list1}
                  </ListGroup.Item>
                  <ListGroup.Item style={left} action href="#link2" onClick={props.clickEvent}>
                    {props.list2}
                  </ListGroup.Item>
                  <ListGroup.Item style={left} action href="#link3" onClick={props.clickEvent}>
                    {props.list3}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
              <Col md={{span:4,offset :2}} style={{disply:"flex"}}>
                <Row id="searchrow">
                  <div style={search_bar}>
                <SortComponent value="닉네임" name="닉네임" value2="태그" name2="태그" />
                <UserSearchbarComponent onChange={props.onChange} onClick={props.onClick} content={props.placeholder} inputId={props.inputid}/>
                </div>
              </Row>
            </Col>
            </Row>
          <Row id="contentRow">
            <Col>
              {props.children}
            </Col>
          </Row>
        </Tab.Container>
      </Container>
    </>
  )
}

export default ListgropBootUser;

