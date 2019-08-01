import React, { Component } from 'react';
import {Dropdown, DropdownButton} from 'react-bootstrap'
/**
 * 
 * @author 강기훈
 * @summary 정렬기준 셀렉트 컴포넌트
 */

 

export class SortComponent extends Component{
  constructor(props){
    super(props)
    this.state = {
      values : this.props.value
    }
    this.values = this.HandleChange.bind(this)
  }
  HandleChange=(e)=>{
    this.setState({values: e.target.name})
  }
  render(){
    return(
      <>
    
      <Dropdown id="SortSelect" >
        <DropdownButton title={this.state.values} value={this.state.values} id= "dropdown-basic">
         <Dropdown.Item  value={this.props.value} name={this.props.name} onClick={this.HandleChange}>{this.props.name}</Dropdown.Item>
          <Dropdown.Item  value={this.props.value2} name={this.props.name2} onClick={this.HandleChange}>{this.props.name2}</Dropdown.Item>
          </DropdownButton>
        </Dropdown>
        </>
    )
  }
}