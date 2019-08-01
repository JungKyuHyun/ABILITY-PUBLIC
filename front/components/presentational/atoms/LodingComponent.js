import React, {Component} from 'react';

/**
 * @author 정규현
 * @summary 로딩 아이콘 구현
 */



  const opts2 = {
    top: '30%', // Top position relative to parent
    left: '50%', // Left position relative to parent
    shadow: '0 0 1px transparent', // Box-shadow for the lines
    position: 'absolute' // Element positioning
  };
class LodingComponent extends Component{

  render(){
    return(
      <div>
        <img id="loading" src="/static/image/loding.gif" style={opts2} alt="loading"/>
      </div>
    );
  }
};
  

export default LodingComponent;