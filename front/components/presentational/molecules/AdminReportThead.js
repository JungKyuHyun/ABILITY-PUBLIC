import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare, faEdit} from '@fortawesome/free-solid-svg-icons';
/**
 * 
 * @author 신선하
 * @summary admin 신고내역 테이블 컴포넌트 헤드부분
 * @Usage
 * 
 */
const th_css={
    color:"#5F4B8B"
}
const header={
    borderTop:"2px solid #5F4B8B",
    borderBottom:"2px solid #5F4B8B"
}

const AdminReportThead = (props) => {
    return (
        <>
       
        <tr style={header}>
            <th style={th_css}><FontAwesomeIcon icon={faCheckSquare} style={{paddingLeft:"5px",width:"17px", marginRight:"7px"}}/></th>
            <th style={th_css}>{props.n2}</th>
            <th style={th_css}>{props.n3}</th>
            <th style={th_css}>{props.n4}</th>
            <th style={th_css}>{props.n5}</th>
            <th style={th_css}>{props.n6}</th>
            <th style={th_css}>{props.n7}</th>
            <th style={th_css}>{props.n8}</th>
            <th style={th_css}><FontAwesomeIcon icon={faEdit} style={{fontSize:"14px",paddingLeft:"3px",marginLeft:"5px", width:"20px", marginRight:"7px"}}/></th>
        </tr>
         </>       
    );
};

export default AdminReportThead;