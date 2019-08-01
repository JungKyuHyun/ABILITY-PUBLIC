import React from 'react';
import Form from 'react-bootstrap/Form';
import {InputGroup, FormControl, Button} from 'react-bootstrap';

/**
 * 
 * @author 우세림
 * @summary 20190616, 우세림, 20190616
 * @see 정규현 InputText 에 온체인지 추가
 */

 
export const InputText = (props)=>
<Form.Group>
    <Form.Label className={props.className} htmlFor={props.for}>{props.label}</Form.Label>
    <Form.Control id={props.id} type={props.type} defaultValue={props.defaultValue} name={props.name} placeholder={props.content} style={props.css} value={props.value} onChange={props.onChange} onClick={props.onClick} maxLength={props.maxLength} accept={props.accept} checked={props.checked}/>
</Form.Group>

export const InputTextBtn = (props)=>
<InputGroup >
    <FormControl placeholder={props.content} maxLength={props.maxLength} style={props.css}/>
    <InputGroup.Append>
      <Button variant="outline-secondary" style={props.css9}>{props.name}</Button>
    </InputGroup.Append>
</InputGroup>


// check, radio
export const InputCheck = (props)=>
    <Form.Check inline type={props.type} label={props.label} name={props.name}/>

export const InputSelect = (props)=>
<Form.Group>
    <Form.Label>{props.label}</Form.Label>
    <Form.Control as="select">
      <option>{props.option1}</option>
      <option>{props.option2}</option>
    </Form.Control>
</Form.Group>

export const InputTextarea = (props)=>
<Form.Group style={props.formcss}>
    <Form.Control id={props.id} as="textarea" rows={props.row} placeholder={props.placeholder}/>
</Form.Group>

export const InputTextBox = (props)=>
<Form.Group style={props.formcss}>
    <Form.Control id={props.id} name={props.name} style={props.css} 
                  maxLength={props.maxLength} placeholder={props.placeholder}
                  onKeyPress={props.onKeyPress} onKeyUp={props.onKeyUp} 
                  type={props.type} defaultValue={props.defaultValue} onChange={props.onChange} value={props.value}
    />
</Form.Group>

export const InputTextBoxReadonly = (props)=>
<Form.Group style={props.formcss}>
    <Form.Control style={props.css} placeholder={props.placeholder} readOnly />
</Form.Group>