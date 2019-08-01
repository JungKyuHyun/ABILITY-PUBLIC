import React from 'react';
import {ButtonGroup,Button} from 'react-bootstrap'

/**
 * 
 * @author 강기훈 
 * @summary 유저게시판 정렬 선택바를 만드는 컴포넌트
 */

 
 export const SortbarComponent=(props)=> 
 <ButtonGroup id="sortbar" style = {props.css}>
  <Button variant="success" value={props.value}>{props.name}</Button>
  <Button variant="success" value={props.value1}>{props.name1}</Button>
  <Button variant="success" value={props.value2}>{props.name2}</Button>
</ButtonGroup>
