import React from 'react';
import './css/Icon.css';
/**
* @author 정진호
* @summary ABility Main Icon 생성 className에 맞는 CSS컴포넌트
**/ 

export const AbilityIcon = (props)=>
    <div className={props.name}>
        <a href="/"><img src="/Image/LogoIcon.jpg" alt="로고아이콘"/></a>
    </div>

export const SeachIcon = (props)=>
    <div className = {props.name}>
            <a href="/"><img src="/Image/SeachIcon.png" alt="검색아이콘"/></a>
    </div>