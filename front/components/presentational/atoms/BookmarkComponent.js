import React from 'react';
import {Button, Table, Badge} from 'react-bootstrap';

/**
 * 
 * @author 강기훈
 * @summary 즐겨찾기를 만드는 컴포넌트 
 */

const css ={
  display:"block",
  width:"110px",
  height:"40px",
  border: "1px solid #c6badf",
  borderRadius:"6px",
  fontFamily:"sans-serif"
}

export const BookmarkComponent=(props)=>
<div id="Bookmark">
<Button style={css} onClick={function(e){}.bind(this)}><i className="fas fa-star"></i> 즐겨찾기</Button>
<Table striped bordered hover>
  <thead>
    <tr>
      <th colSpan="4"><i className="fas fa-star"></i> 즐겨찾기</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><a href="">웹퍼블리셔 모집</a></td>
      <td>신입,경력</td>
      <td>우아한 형제들</td>
      <td>6/16~6/24</td>
      
    </tr>
    <tr>
      <td><a href="">풀스택개발자 모집</a></td>
      <td>신입,경력</td>
      <td>우아한 형제들</td>
      <td>6/16~6/24</td>
    </tr>
    <tr></tr>
  </tbody>
</Table>

</div>