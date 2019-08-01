import React from 'react';
import CKEditor from 'ckeditor4-react';
/**
 * 
 * @auth 곽호원
 * @summary CkEditor 컴포넌트
 * 
 */
export const CkeditorComponent = (props) =>
    <CKEditor data={props.data}
    config = {{
        toolbar : [['Bold', 'Italic', 'Strike','Blockquote','uploadImage','-', 'Styles' ,'Format', '-','Image', 'Table', 'Indent','-','NumberedList', 'BulletedList', 'Clipboard', 'Undo','Redo', 'editing','HorizontalRule','SpecialChar','Source']],
        extraPlugins : 'codesnippet'

    }} 
    />