import React, { Component } from 'react';
import ReactHighcharts from 'react-highcharts';
/**
 * 
 * @author 강기훈
 * @summary admin 메인 페이지에 사용하는 원형그래프 입니다.
 * 
 */

 
 class ChartRadius extends Component {
     constructor(props){
         super(props);
         
         this.props = props;
         this.state={
             question:0,
             freeboard:0,
             project:0,
             job:0
         }
         
     }
    async componentWillReceiveProps(props) {
        await this.setState({
            question: props.question,
            freeboard: props.freeboard,
            project: props.project,
            job: props.job
            
        })
      }    
     render(){
        const config ={
            chart: {
                styledMode: true
            },
        
            title: {
                text: '총 게시물 통계 ',
                style:{
                    color:'#5F4B8B',
                    fontWeight:'bold',
                    fontFamily:'sans-serif'
                }
            },
        
            series: [{
                type: 'pie',
                allowPointSelect: true,
                keys: ['name', 'y', 'selected', 'sliced'],
                data: [
                    ['질의응답', this.state.question , false],
                    ['프로젝트', this.state.project, false],
                    ['자유게시판', this.state.freeboard, false],
                    ['구인구직', this.state.job, true,true],
                ],
                showInLegend: true
            }]
        }
        return(
            <ReactHighcharts config={config}></ReactHighcharts>
        );
     }
 }

 export default ChartRadius;