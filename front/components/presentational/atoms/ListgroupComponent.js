import React,{Component} from 'react';
import HireList from '../molecules/HireList'
import ListGroup from 'react-bootstrap/ListGroup'
import Tab from 'react-bootstrap/Tab';
/**
 * @author 정규현
 * @summary 리스트 그룹을 나타내 주는 컴포넌트 입니다. 
 * 
 * @author 정진호
 * @version react-bootstrap 을 이용한 Tab 나누기추가
 */

 const ListgroupComponent = (props) =>{
    return(
        <>
        <div className="list-group list-group-horizontal-sm" id="list-tab" role="tablist" style={props.css}>
            <a className="list-group-item list-group-item-action active" id="list-home-list" data-toggle="list" href="#" role="tab" aria-controls="home">{props.name}</a>
            <a className="list-group-item list-group-item-action" id="list-profile-list" data-toggle="list"  href="#" role="tab" aria-controls="profile">{props.name1}</a>
            <a className="list-group-item list-group-item-action" id="list-messages-list" data-toggle="list" href="#" role="tab" aria-controls="messages">{props.name2}</a>
        </div>
        </>
    )

}


export const ListgroupBoot = () => {
        return(
            <>
 <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
              <ListGroup>
                <ListGroup.Item action href="#link1">
                  Ability
                </ListGroup.Item>
                <ListGroup.Item action href="#link2">
                  New User
                </ListGroup.Item>
                <ListGroup.Item action href="#link3">
                  Name
                </ListGroup.Item>
              </ListGroup>
              <Tab.Content>
                <Tab.Pane eventKey="#link1">
                  안녕1
                </Tab.Pane>
                <Tab.Pane eventKey="#link2">
                  안녕2 
                </Tab.Pane>
                <Tab.Pane eventKey="#link3">
                  안녕3
                </Tab.Pane>
              </Tab.Content>
        </Tab.Container>
            </>
        )
}

export default ListgroupComponent;