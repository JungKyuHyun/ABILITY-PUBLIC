import React from 'react';

/**
 * 
 * @author 강기훈
 * @summary 마이페이지 프로필 이미지 컴포넌트  
 */
const css ={
    display:"inline-block",
    verticalAlign: "middle",
    padding: "12px",
    border: "1px solid #CDCECF",
    backgroundColor: "#FFF",
    cursor:"pointer",
    width:"186px",
    height:"210px",
    textAlign:"center",
    borderRadius:"6px"
  }


  const css_image ={     
    width:"150px",
    height:"150px",
  }

  const css_file ={
      width: "1px",
      height: "1px",
      border:"0px",
      margin:"-1px",
      overflow:"hidden",
      padding:"0px",
      clip: "rect(0px, 0px, 0px, 0px)", 
  }

  const css_label ={
    display:"inline-block",
    padding:".5em .75em",
    color: "#fff",
    fontSize: "inherit",
    lineHeight:"normal",
    verticalAlign:"middle",
    backgroundColor:"#5F4B8B",
    cursor: "pointer",
    border: "1px solid",
    borderRadius:".25em",
    transition: "background-color 0.2s"
  }
 
export const ProfileImageEditComponent=()=>
<div className="ProfileImage" style={css}>
      <img style={css_image} src="https://i2.wp.com/bugsy-net.com/diet/wp-content/plugins/speech-bubble/img/blank-profile.png?w=840&ssl=1"/>
      <label for="file" style={css_label}>사진변경</label>
      <input type="file" style={css_file} id="file"></input>
</div>