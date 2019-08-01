/**
 * @author 정규현
 * @summary ckeditor 커스텀 / 미리보기 구현
 */
import React,{Component}from'react';
import CKEditor from'ckeditor4-react';

class CkeditorTwoHorizon extends Component{
    constructor(props){
        super(props);
        this.state={
            data:'<p> </p>'
        };
        this.handleChange=this.handleChange.bind(this);
        this.onEditorChange=this.onEditorChange.bind(this)
    };
        onEditorChange(evt){
            this.setState({data:evt.editor.getData()})
        };
        handleChange(changeEvent){
            this.setState({
                data:changeEvent.target.value})
            };
            render(){
                return(
                <div>
                    <div className="row"style={{overflow:'auto'}}>
                        <div className="col-6">
                            <CKEditor config={{toolbar:[['Bold','Italic','Strike','Blockquote','uploadImage','Styles','Format','-','Image','Table','Indent','-','NumberedList','BulletedList','Clipboard','Undo','Redo','editing','HorizontalRule','SpecialChar','Source','CodeSnippet']],extraPlugins:'codesnippet, easyimage,sourcedialog,justify,embed,autoembed,image2,autogrow ',uiColor:'#c6badf',height:'200px',width:'99.7%',resize_enabled:true,codeSnippet_theme:'atelier-heath.light',contentsCss:['http://cdn.ckeditor.com/4.11.4/full-all/contents.css','https://ckeditor.com/docs/vendors/4.11.4/ckeditor/assets/css/widgetstyles.css',],embed_provider:'//ckeditor.iframe.ly/api/oembed?url={url}&callback={callback}',image2_alignClasses:['image-align-left','image-align-center','image-align-right'],image2_disableResizer:true,removePlugins:'resize, image'}}data={this.state.data}onChange={this.onEditorChange}/>
                            </div>
                            <div className="col-6"><EditorPreview data={this.state.data}/>
                            </div>
                            </div>
                            </div>)
                            }
                        };
                        class EditorPreview extends Component{
                            render(){
                                return(
                                <div className="editor-preview"style={{background:"white",border:"1px solid #b0aabc",overflow:'auto'}}>
                                    <h6 style={{textAlign:"center",marginTop:"0.5rem",marginBottom:"0.5rem"}}>미리보기</h6>
                                    <hr/>
                                    <div dangerouslySetInnerHTML={{__html:this.props.data}}>
                                        </div>
                                        </div>
                                        )
                                        }
                                        };
                                        
                                        export default CkeditorTwoHorizon;