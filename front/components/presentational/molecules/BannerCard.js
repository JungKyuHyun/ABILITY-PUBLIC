import React, { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * @author 강기훈
 * @summary 배너 조회 게시판 배너 카드 컴포넌트 
 */

const endpoint = process.env.NODE_ENV === 'production'? "?" : "?";

const container = {
    display: "flex",
    justifyContent: "space-around",
    marginBottom: "50px"
}

const banner_info = {
    display: "flex",
    flexDirection: "column",
}

const image = {
    width: "500px",
    height: "250px"
}

const info_css = {
    marginBottom: "10px",
    fontFamily: "sans-serif",
    color: "#636e72"
}

const info_title = {
    marginBottom: "10px",
    fontFamily: "sans-serif",
    color: "#5F4B8B",
    fontWeight: "bold",
    fontSize: "36px"
}

const hrCss = {
    borderTop: "1px solid #dfe6e9",
    marginBottom: "50px",
    width: "95%",
    marginLeft: "15px"
}

const price = {
    fontWeight: "bold",
    color: "#5F4B8B",
    fontSize: "20px"
}

const link = {
    color: "#0984e3",
    fontWeight: "bold"
}

const font_css = {
    fontWeight: "bold",

}
function date(date_created) {
    let year = date_created.substring(0, 4);
    let month = date_created.substring(5, 7);
    let day = date_created.substring(8, 10);
    let edit_created = `${year}-${month}-${day}`;
    return edit_created;
}

const BannerCard = (props) => {
    const [todayCount, setTodayCount] = useState(0);
    const [bannerId, setBannerId] = useState(props.id);

   useEffect(() => {
        axios.get(endpoint + "/clicktoday", {
            params: {
                id: bannerId
            }
        }).then(response => {
            setTodayCount(response.data.count);
        })
    },[bannerId])

    return (
        <>
        <div style={container}>
            <img style={image} src={props.image} />
            <div style={banner_info}>
                <span style={info_title}>{props.title}</span>
                <span style={info_css}>{props.description ? props.description : "등록된 소개가 없습니다."}</span>
                <span style={info_css}><span style={font_css}>광고주 : </span>{props.client}</span>
                <span style={info_css}><span style={font_css}>누적 클릭수 : </span>{props.click_count}</span>
                <span style={info_css}><span style={font_css}>금일 클릭수 : </span>{todayCount}</span>
                <span style={info_css}><span style={font_css}>등록일 : </span>{date(props.date_created)}</span>
                <span style={info_css}><span style={font_css}>URL : </span><a style={link} href={props.url}>{props.url ? props.url : "등록된 url이 없습니다."}</a></span>
                <span style={info_css}><span style={font_css}>광고이익 : </span> (클릭수*1) -> <span style={price}>{props.click_count * 1}원</span></span>
            </div>
    
        </div>
         <div style={hrCss}></div>
         </>
    )
}
export default BannerCard