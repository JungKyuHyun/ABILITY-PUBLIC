import React from 'react';
import {Badge} from 'react-bootstrap';

/**
 * @author 정규현
 * @summary 태그용 라이브러리 
 */

 const css={
     backgroundColor:"#c6badf",
     color:"#ffffff",
     marginRight : "4px"
 }

export const Tag = (props) =>
    <Badge pill variant="secondary" style={css}>
        {props.tag}&nbsp;
    </Badge>
