/**
 * @author 정규현
 * @summary ckeditor 커스텀 / 코드스니핏 구현
 * 
 * @author 정진호
 * @version mentions 구현
 */
import React,{Component} from 'react';
import CKEditor from 'ckeditor4-react';

const ckdivcss={
    display : "none"
}

class CkeditorOne extends Component{
    constructor(props){
        super(props);
        this.state={
            data:'<p></p>',
            list : this.props.list
        };
        this.onEditorChange=this.onEditorChange.bind(this);
        this.dataFeed=this.dataFeed.bind(this);
    };
        onEditorChange(evt){      
            this.setState({
                data:evt.editor.getData()
            })
        };
        dataFeed(opts, callback) {
            var matchProperty = 'name',
              data = this.state.list.filter((item,index)=> {
                return item[matchProperty].indexOf(opts.query.toLowerCase()) === 0;
              });
        
            data = data.sort(function(a, b) {
              return a[matchProperty].localeCompare(b[matchProperty], undefined, {
                sensitivity: 'accent'
              });
            });
            callback(data);
        };
        render(){
            return(
                <>
            <div>
                <div style={{overflow:'auto'}}>
                    <CKEditor config={{toolbar:[ 
                        { name: 'align', 
                          items: [ 'JustifyLeft','JustifyCenter','JustifyRight','JustifyBlock']     
                        },  {
                             name: 'basicstyles',
                              items: [ 'Font','FontSize','Bold','Italic','Underline','Strike','Blockquote','Subscript','Superscript']
                             },
                        { name: 'insert',
                         items: ['Table','Mathjax','Smiley','SpecialChar'] 
                         },{ 
                             name: 'colors',
                              items: [ 'TextColor', 'BGColor' ] 
                              },['NumberedList','BulletedList','Clipboard','Undo','Redo','editing','HorizontalRule','Source','CodeSnippet']],
                              extraPlugins:'mentions, codesnippet, easyimage,sourcedialog,justify,embed,autoembed,image2,autogrow,font,colorbutton,colordialog,tableresize,mathjax',
                              uiColor:'#c6badf',
                              height:'200px',
                              width:'99.7%',
                              resize_enabled:true,codeSnippet_theme:'atelier-heath.light',
                              contentsCss:['http://cdn.ckeditor.com/4.11.4/full-all/contents.css'],
                              mathJaxLib: 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.4/MathJax.js?config=TeX-AMS_HTML',
                              embed_provider:'//ckeditor.iframe.ly/api/oembed?url={url}&callback={callback}',
                              image2_alignClasses:['image-align-left','image-align-center','image-align-right'],
                              mentions: [ { feed:this.dataFeed , 
                                            itemTemplate : '<li data-id={id}>' +
                                                            '<img style="width: 32px; height: 32px; border: 1px solid rgb(205, 206, 207); margin-right: 0.5rem;" src={image} />' +
                                                            '<strong class="username">{name}</strong>'+
                                                            '</li>',
                                            outputTemplate :'<a href="/developer/Page?userid={id}" >'
                                                            +'<strong>'
                                                            +'<span style="color:#5f4b8b;">'
                                                            +'{name}'
                                                            +'</span>'
                                                            +'</strong>'
                                                            +'</a>',
                                            minChars: 0 } ],
                              allowedContent : true,
                              image2_disableResizer:true,removePlugins:'resize, image'}}
                              data={this.state.data} onChange={this.onEditorChange}/>
                      </div>
                        <div style={ckdivcss} id="ckvalue" dangerouslySetInnerHTML={{__html:this.state.data}}></div>
                      </div>
                  </>
            )

        }
};
export default CkeditorOne;