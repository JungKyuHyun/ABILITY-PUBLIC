import React from 'react';
import './css/SelectMenu.css'

/**
 * 
 * @auth 곽호원
 * @summary 메뉴 셀렉트 박스 만드는 컴포넌트
 * 
 */
const SelectMenuComponent = (props) => {
  const selectlist = [];
  if(props.menu !== null && props.menu !== "" && props.menu !== undefined){
      const list = props.menu.split(',');
      for(var i=0; i<list.length; i++){
          selectlist.push(list[i]);
      }
      const selectmenu = selectlist.map((value, index)=>(<option value={index}>{value}</option>));
  return (
    <select className="custom-select">
          <option>{props.title}</option>
          {selectmenu}
        </select>
    );
  };
}

export default SelectMenuComponent;