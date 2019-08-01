import React from 'react';
import { AbilityComponent } from './AbilityComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import TimeAgo from 'react-timeago';
import ko from 'react-timeago/lib/language-strings/ko';
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter';
const formatter = buildFormatter(ko);

/**
 * @author  정규현
 * @summary 작성일 컴포넌트(DateCreatedComponent), 작성자 컴포넌트(WriterComponent), 
 *          수정일 컴포넌트(ModifiedDateComponent) 작성 
 */


export const DateCreatedComponentability = (props)=>
    <div className="date_created">
        <p style={textcss}><FontAwesomeIcon style={{width:"10px",height:"10px"}} icon={faClock}/>
                 {' '}<TimeAgo date={props.label} formatter={formatter} />
                    &nbsp;&nbsp;<AbilityComponent val={props.reputation}/>
        </p>
    </div>
export const DateCreatedComponent = (props)=>
    <div className="date_created">
        <i className="fas fa-clock"></i>{' '}{props.label}
    </div>
export const WriterComponent = (props)=>
    <div className="writer">
        <i className="fas fa-pencil-alt"></i>{' '}{props.label}
    </div>

export const ModifiedDateComponent = (props) =>
    <div className="modified_date">
        <i className="fas fa-history"></i>{' '}{props.label}
    </div>