
import React from 'react';
import Nav from 'react-bootstrap/Nav';
import {NavLink} from 'react-router-dom';

/**
 * 
 * @author 우세림
 * @summary 20190615, tab navmenu UI
 * @version 수정 정진호 -- 필요한 갯수에 따라 카드 생성
 */

export const ProfileNav = (props)=>{
    const cardlist = [];
    if(props.card !== null && props.card !== ""){
        let list = props.card.split(',');
        for(var i=0; i<list.length; i++){
            cardlist.push(list[i]);
        }
    }
    const cards = cardlist.map((label, index)=>(           
                                        <Nav.Item id="card_nav" key={index}>
                                            <NavLink to={props.href} >{label}</NavLink>
                                        </Nav.Item>)
                                       );
        return(
        <Nav fill variant="tabs" defaultActiveKey={props.href} style={props.css}>
            {cards}
        </Nav>
    
    )
}
