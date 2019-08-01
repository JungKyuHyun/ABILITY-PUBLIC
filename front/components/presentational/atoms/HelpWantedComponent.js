import React from 'react';
import {InputTextBox} from './InputboxComponent';

/**
 * 
 * @author 곽호원
 * @summary 구인공고 폼 테이블 컴포넌트 
 */
const textcss = {
    marginLeft : "5px",
    marginTop : "5px",
    width : "70%",
    height : "25px"
}

const icon= {
    tdor : "red"
}

const tablecss = {
    marginTop : "1.5rem",
    marginLeft : "0.625rem",
    border : "1px solid #f2f2f2",
    width : "100%",
    height : "30%",
    padding : "20px"
}

const selectcss = {
    width : "40%",
    height : "60%",
    fontFamily : "Arial",
    backgroundtdor : "#f6f6f6",
    overflow : "hidden",
    borderRadius : "5px",
    outline: "none",
    tdor : "#666",
    cursor : "pointer"

}

const datecss = {
    "-webkitAppearance": "none",
    "-mozAppearance" : "none",
    "appearance" : "none",
    "width" : "45%",
    "padding" : "9px 9px 11px 13px",
    "backgroundtdor" : "#f3f3f3",
    "border" : "none",
    "borderRadius" : "3px",
    "outline" : "none",
    "font": "15px Open Sans sans-serif",
    "tdor" : "#666",
    "cursor" : "pointer"
}

const filecss = {
    display : "none"

}

const labelcss = {
    "padding" : ".5em .75em", 
    "tdor" : "#ffffff", 
    "verticalAlign" : "middle", 
    "backgroundtdor" : "#5f4b8b", 
    "cursor" : "pointer", 
    "border" : "1px solid #ebebeb", 
    "borderBottomtdor" : "#e2e2e2", 
    "borderRadius" : ".25em",
    boxShadow : "3px 2px 3px #e2e2e2"
}

export const HelpWantedComponent = (props) => 
<table style={tablecss}>
          <tr>
              <td><span style={icon}>*</span>제목 </td>
              <td><span style={icon}>*</span>직종 / 직무</td>
          </tr>
          <tr>
              <td><InputTextBox css={textcss}>{props.title}</InputTextBox></td>
              <td><InputTextBox css={textcss}>{props.deptartment}</InputTextBox></td>
          </tr>
          <tr>
              <td><span style={icon}>*</span>고용 형태</td>
              <td>모집 인원</td>
          </tr>
          <tr>
              <td><InputTextBox css={textcss}>{props.employment}</InputTextBox></td>
              <td><InputTextBox css={textcss}>{props.recruitNumber}</InputTextBox></td>
          </tr>
          <tr>
          <td><span style={icon}>*</span>급여</td>
              <td><span style={icon}>*</span>학력</td>
        
          </tr>
          <tr>
              <td><InputTextBox css={textcss}>{props.salary}</InputTextBox></td>
              <td><select style={selectcss}>
                    <option value="highschool">고졸</option>
                    <option value="associate">초대졸</option>
                    <option value="bachelor">대졸</option>
                  </select></td>
          </tr>
          <tr>
              <td><span style={icon}>*</span>접수 기간</td>
              <td><span style={icon}>*</span>이력서 양식</td>
             
          </tr>
          <tr>
              <td><input type="date" style={datecss}></input> - <input type="date" style={datecss}></input></td>
              <td><label for="filebtn" style={labelcss}>업로드</label><input type="file" id="filebtn" style={filecss}></input></td>
          </tr>
          <tr>
              <td><span style={icon}>*</span>담당자 연락처</td>
              <td><span style={icon}>*</span>담당자 이메일</td>
          </tr>
          <tr>
              <td><InputTextBox css={textcss}>{props.managerPhone}</InputTextBox></td>
              <td><InputTextBox css={textcss}>{props.managerEmail}</InputTextBox></td>
          </tr>
      </table>
    
