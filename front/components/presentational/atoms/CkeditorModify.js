import React,{Component}from'react';
import CKEditor from'ckeditor4-react';
const ckdivcss={
    display : "none"
}

class CkeditorModify extends Component{
    constructor(props){
        super(props);
        this.state={
            data:'<p></p>'
        };
        this.handleChange=this.handleChange.bind(this);
        this.onEditorChange=this.onEditorChange.bind(this)};
        onEditorChange(evt){
            this.setState({
                data:evt.editor.getData()
            })
        };
        handleChange(changeEvent){
            this.setState({data:changeEvent.target.value})
        };
        render(){
            return(
            <div>
                <div style={{overflow:'auto'}}>
                    <CKEditor config={{toolbar:[ { name: 'align', items: [ 'JustifyLeft','JustifyCenter','JustifyRight','JustifyBlock'] },  { name: 'basicstyles', items: [ 'Font','FontSize','Bold','Italic','Underline','Strike','Blockquote','Subscript','Superscript'] },
{ name: 'insert', items: ['Table','Mathjax','Smiley','SpecialChar'] },{ name: 'colors', items: [ 'TextColor', 'BGColor' ] },['NumberedList','BulletedList','Clipboard','Undo','Redo','editing','HorizontalRule','Source','CodeSnippet']],extraPlugins:'codesnippet, easyimage,sourcedialog,justify,embed,autoembed,image2,autogrow,font,colorbutton,colordialog,tableresize,mathjax',uiColor:'#c6badf',height:'200px',width:'99.7%',resize_enabled:true,codeSnippet_theme:'atelier-heath.light',contentsCss:['http://cdn.ckeditor.com/4.11.4/full-all/contents.css'], mathJaxLib: 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.4/MathJax.js?config=TeX-AMS_HTML',embed_provider:'//ckeditor.iframe.ly/api/oembed?url={url}&callback={callback}',image2_alignClasses:['image-align-left','image-align-center','image-align-right'],image2_disableResizer:true,removePlugins:'resize, image'}} data={this.props.data} onChange={this.onEditorChange} style={this.props.css}/>
</div>
<div style={ckdivcss} id="ckvalue" dangerouslySetInnerHTML={{__html:this.state.data}}></div>
</div>)
}
};
export default CkeditorModify;