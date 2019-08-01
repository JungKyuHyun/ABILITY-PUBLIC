import React from 'react';
import { InputGroup, FormControl } from 'react-bootstrap';
import { VideoId } from '../molecules/ProjectDetails';

/**
 * @author  신선하
 * @summary 프로젝트보드 내 input박스 모음
 * @usage
 **/

const ph ={
    fontSize: '90%'                        
};

export const InputLabelDefault = (props) => {
    return (
        <>
        <label>{props.label}</label>
        <InputGroup className="mb-3">
            <FormControl 
                style={ph}
                id={props.id} 
                type={props.type} 
                name={props.name} 
                placeholder={props.placeholder} 
                defaultValue={props.value} 
                onChange={props.onChange} 
                onClick={props.onClick} 
                maxLength={props.maxLength}
                />
        </InputGroup>
        </>
    );
}


export const InputLabelText = (props) => {
    return (
        <>
        <label>{props.label}</label>
        <InputGroup className="mb-3">
            <InputGroup.Prepend>
                <InputGroup.Text style={ph}>
                    {props.text}
                </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl 
                style={ph}
                type={props.type}
                id={props.id}                    
                name={props.name}
                placeholder={props.placeholder}
                defaultValue={props.value} 
                onChange={props.onChange}
                onClick={props.onClick} 
                maxLength={props.maxLength}
                />
        </InputGroup>
        </>
    );
}

export const InputLabelTextarea = (props) => {
    return (
        <>
        <label>{props.label}</label>
        <InputGroup className="mb-3">                
            <FormControl 
                style={ph}
                as="textarea"   
                rows={props.rows}
                id={props.id} 
                name={props.name}
                placeholder={props.placeholder}                    
                value={props.value}
                onChange={props.onChange}
                onClick={props.onClick} 
                maxLength={props.maxLength}
                />
        </InputGroup>
        </>
    );
}

export const VideoPreview = (props) => {
    return (
        <>
        <label>{props.label}</label>
        <VideoId
            file_path={props.file_path}   
            onChange={props.onChange}
            style={props.style}
        />
        </>
    );
}
