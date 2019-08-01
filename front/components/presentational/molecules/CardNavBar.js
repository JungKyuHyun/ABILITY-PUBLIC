import React from 'react';
import {Container,Row,Col} from 'react-bootstrap';
import {ButtonComponent} from '../atoms/ButtonComponent'
import {ProfileNav} from '../atoms/ProfileNavComponent'
import {NavLink} from 'react-router-dom';

/**
 * 
 * @author 정진호
 * @summary 구인구직 컨텐츠 상단바
 * @todo ,기준으로 여러 카드 생성가능 -- Nav카드 라우터 적용 완료
 */


const containercss = {
    marginTop : "1.5rem"
}

const btncss ={
    float :"right",
    marginBottom : "0.8em",
    width :"99.6px",
    marginRight: "0px"
}


const CardNavBar =(props) => {
    return(
        <Container style={containercss}>
        <Row>
            <Col>
                <ProfileNav css={props.css} card={props.navname} href={props.href}/>
            </Col>
            <Col sm={2}>
                <NavLink to={props.to}>
                    <ButtonComponent css={btncss} name={props.btnname}/>
                </NavLink>
                
            </Col> 
        </Row>
        <hr></hr>
    </Container>
    )
}

export default CardNavBar;