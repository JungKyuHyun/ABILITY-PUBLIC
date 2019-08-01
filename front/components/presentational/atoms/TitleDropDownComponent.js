import React, { Component } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

/**
 * 
 * @author 곽호원
 * @summary 게시판 만드는 컴포넌트 
 *  
 */
const dropcss = {
    width : "100%",
    textAlign : "center"
}

export class TitleDropDownComponent extends Component {
  constructor(props){
    super(props)

    this.state = {
      values : "게시판을 선택해주세요"
    }
    this.values = this.HandleChange.bind(this)
  }
  HandleChange=(e)=>{
    this.setState({values: e.target.name})
  }

  render(){
    return(
      <Dropdown id="titleSelect" >
      <Dropdown.Toggle style={dropcss} variant="primary" id="dropdown-basic" >
       {this.state.values}
      </Dropdown.Toggle>

      <Dropdown.Menu  style={dropcss}>
       <Dropdown.Item eventKey="1" value={this.props.value} name={this.props.name} onClick={this.HandleChange}>{this.props.name}</Dropdown.Item>
        <Dropdown.Item eventKey="2" value={this.props.value2} name={this.props.name2} onClick={this.HandleChange}>{this.props.name2}</Dropdown.Item>
        <Dropdown.Item eventKey="3" value={this.props.value3} name={this.props.name3} onClick={this.HandleChange}>{this.props.name3}</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    )
  }
}

