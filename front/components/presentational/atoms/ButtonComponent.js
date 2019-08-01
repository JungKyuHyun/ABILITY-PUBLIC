import React from 'react';
import {Button} from 'react-bootstrap';

/**
 * @author 정규현
 * @summary 버튼을 만드는 컴포넌트 
 */

export const ButtonComponent=(props)=>{
    return(
        <Button as="input"
                key={props.key}
                variant={props.variant ? props.variant : "primary"} 
                onClick={props.onclick} 
                style={props.css}
                id={props.id}
                value={props.name}
                size={props.size} disabled={props.disabled}
                 >
        </Button>
    );
}
export const ButtonComponent2=(props)=>{
    return(
        <Button as="input"
                key={props.key}
                variant={props.variant ? props.variant : "light"} 
                onClick={props.onclick} 
                style={props.css}
                id={props.id}
                value={props.name}
                size={props.size} disabled={props.disabled}
                 >
        </Button>
    );
}
export const ButtonComponentCustom = (props)=>
    <Button variant="primary" size={props.size} style={props.css}><b>{props.name}</b></Button>