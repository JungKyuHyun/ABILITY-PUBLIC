import React, { Component } from 'react';
import ReactHighcharts from 'react-highcharts';
import axios from 'axios'

/**
 * @author 신선하
 * @summary admin 메인 페이지에 사용하는 라인그래프 입니다.
 */

const EndPoint = process.env.NODE_ENV === 'production'? "?/test" : "?/test";

class ChartLine extends Component {
 constructor(props){
     super(props);
     this.state = {
        monthjoin:[],
        monthleave:[],
        montharray:[],
        joindata:[],
        leavedata:[]
     }
 }

 async componentDidMount(){
 await axios.get(EndPoint).then(response =>{
     const now = new Date();
     const month = now.getMonth()+1;
     const montharr = [];
     const data = [];
     const montharr2=[];
     for(let i=0;i<month;i++){
         montharr[i]=(i+1)+"월";
         montharr2[i]=i+1;
     }
    this.setState({
     monthjoin:response.data,
     montharray:montharr
    })
    for(let i = 0;i<montharr.length;i++){
       a:for(let j=0;j<this.state.monthjoin.length;j++){
           if(montharr2[i] == this.state.monthjoin[j].monthlydate){
               data[i]= this.state.monthjoin[j].usercount;
               break a;
            }
              data[i]=0;
        }
    }
    this.setState({
        joindata:data
    })
  });
   
  await axios.get(EndPoint).then(response =>{
    const now = new Date();
    const month = now.getMonth()+1;
    const montharr = [];
    const data = [];
    const montharr2=[];
    for(let i=0;i<month;i++){
        montharr2[i]=i+1;
    }
   this.setState({
    monthleave:response.data,
   })
   for(let i = 0;i<this.state.montharray.length;i++){
      a:for(let j=0;j<this.state.monthleave.length;j++){
          if(montharr2[i] == this.state.monthleave[j].monthlydate){
              data[i]= this.state.monthleave[j].usercount;
              break a;
           }
             data[i]=0;
       }
   }
   this.setState({
       leavedata:data
   })
});
 }

    render(){
       const config= {  
            chart: {
                type: 'line',
                width:'850',
                height:'400'
            },
            title: {
                text: 'Ability 신규 가입 & 탈퇴  ',
                style:{
                    color:'#5F4B8B',
                    fontWeight:'bold',
                    fontFamily:'sans-serif'
                }
            },
            subtitle: {
                text:'월 통계'
            },
            xAxis: {
                categories: this.state.montharray
            },
            yAxis: {
                title: {
                     text: '인원 수'
                }
            },
            plotOptions: {
                line: {
                    dataLabels: {
                        enabled: true
                    } ,
                    enableMouseTracking: false
                }
            },
            series: [{
                name: '신규회원수',
                color:'#f9ca24',
                data: this.state.joindata
            }, {
                name: '탈퇴회원수',
                color: '#0984e3',
                data: this.state.leavedata
            }]
        }
        return (           
            <ReactHighcharts config={config}></ReactHighcharts>
        );
    }
 }
 
export default ChartLine;