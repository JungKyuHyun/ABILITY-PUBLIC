import React, { Component } from 'react';
import ReactHighcharts from 'react-highcharts';
import axios from 'axios';

/**
 * 
 * @author 신선하
 * @summary admin 메인 페이지에 사용하는 바그래프 입니다.
 * @see 정규현 리펙토링 
 */

const endpoint = process.env.NODE_ENV === 'production'? "?" : "?";
 
class ChartBar extends Component {
    constructor(props){
        super(props);
        this.props = props;
        this.state={
            reply:[],
            month:[]
        }
    }

   async componentDidMount(){
    const now = new Date();
    const month = now.getMonth()+1;
    const montharr = [];
    const montharr2 = [];
    const data=[];
    for(let i=0;i<month;i++){
        montharr[i]=(i+1)+"월";
        montharr2[i]=(i+1);
    }
     
       await axios.get(endpoint).then(response => {
            for(let i = 0;i<montharr.length;i++){
                a:for(let j=0;j<response.data.length;j++){
                    if(montharr2[i] == response.data[j].monthlydate){
                        data[i]= response.data[j].postcount;
                        break a;
                     }
                       data[i]=0;
                 }
             }
             this.setState({
                reply:data,
                month:montharr
            })
        })

        
    }
     

    render() {
        const config = {  
            chart: {
                type: 'column'
            },
            title: {
                text: '월간 답변률',
                style:{
                    color:'#5F4B8B',
                    fontWeight:'bold',
                    fontFamily:'sans-serif'
                }
            },
            xAxis: {
                categories: this.state.month
            },
            yAxis: {
                title: {
                    text: 'percent(%)'
                }
        
            },
            legend: {
                enabled: true
            },
            plotOptions: {
                    series: {
                        borderWidth: 0,
                        dataLabels: {
                            enabled: true,
                            format: '{point.y:.0f}%'
                        }
                    }
                },
        
            tooltip: {
                    pointFormat: '<span style="color:{point.color}"><b>{point.y:.0f}%</b><br/>'
                },
        
            series: [
                    {
                        name: "질의응답 게시판 기준",
                        colorByPoint: true,
                        data:this.state.reply
                },
                
            ],
        };
        return (           
            <ReactHighcharts config={config}></ReactHighcharts>
        );
    }
}
 
export default ChartBar;