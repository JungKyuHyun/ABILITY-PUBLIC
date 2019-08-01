import React , {Component} from 'react';
import Highcharts from 'react-highcharts';
import Router from 'next/router';
import axios from 'axios';

const endpoint = process.env.NODE_ENV === 'production'? "?" : "?";


class PostChart extends Component {
    constructor(props){
        super(props);

        this.state = {
            userid : 0,
            chartdata : []
        };
    };

    async componentDidMount() {
        let user = Router.query['userid']; 
        this.setState({
            userid : user
        })
        await axios.get(endpoint+'/postChart', {
            params : {
                userid : Router.query['userid']
            }
            }).then((Response) => {
                this.setState({
                    chartdata : Response.data
                });
            });
    }


    render() {
        let {chartdata} = this.state;
        let boardDay =[];
        let category_id =[];
        let postCount =[];
        
        for(var i=0; i<chartdata.length; i++){
            boardDay[i] = this.state.chartdata[i].boardDay;
            category_id[i] = this.state.chartdata[i].category_id;
            postCount[i] = this.state.chartdata[i].postCount;
        }

        let dayArr= [];
        let sampleArr = [];
        var date = new Date();
        var year = ''+date.getFullYear();
        var month = date.getMonth()+1;
        var day = date.getDate();

        year =year.slice(2,4);
        if(month <10) month="0"+month;
        for(var i=0; i<7; i++){
            day = date.getDate()-i;
            if(day <10) day="0"+day;
            dayArr[i] =year+"."+month+"."+day;
            sampleArr.push(dayArr[i]);
        }
        sampleArrSort =sampleArr.sort();

        let postCountResult_1=[];
        let postCountResult_2=[];
        let postCountResult_7=[];

        for(var i=0; i<sampleArr.length; i++){//2
            postCountResult_1[i] = 0;
            for(var j=0; j<boardDay.length; j++){//4
                if(sampleArr[i]==boardDay[j]){
                    if(category_id[j]==1){
                        postCountResult_1[i] = postCount[j];
                    } 
                } 
            }
        }
        for(var i=0; i<sampleArr.length; i++){//2
            postCountResult_2[i] = 0;
            for(var j=0; j<boardDay.length; j++){//4
                if(sampleArr[i]==boardDay[j]){
                    if(category_id[j]==2){
                        postCountResult_2[i] = postCount[j];
                    } 
                } 
            }
        }
        for(var i=0; i<sampleArr.length; i++){//2
            postCountResult_7[i] = 0;
            for(var j=0; j<boardDay.length; j++){//4
                if(sampleArr[i]==boardDay[j]){
                    if(category_id[j]==7){
                        postCountResult_7[i] = postCount[j];
                    } 
                } 
            }
        }

        


        const config = {
            chart: {
                type: 'column',
                height: '300px'
            },
            title: {
                text: '사용자의 최근 일주일 활동 정보',
                style: {
                    fontWeight: 'bold',
                    fontSize: '20px'
                }
            },
            xAxis: {
                categories: sampleArr
            },
            yAxis: {
                allowDecimals: false,
                min: 0,
                title: {
                    text: ''
                },
                stackLabels: {
                    enabled: true,
                    style: {
                        fontWeight: 'bold',
                        color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                    }
                }
            },
            legend: {
                align: 'right',
                x: -30,
                verticalAlign: 'top',
                y: 25,
                floating: true,
                backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
                shadow: false
            },
            tooltip: {
                headerFormat: '<b>Total: {point.stackTotal}</b><br/>',
                pointFormat: '{series.name}: {point.y}'
            },
            plotOptions: {
                column: {
                    stacking: 'normal',
                    dataLabels: {
                        enabled: true,
                        color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'whiblate'
                    }
                }
            },
            series: [{
                name: '질의응답',
                color: '#d8bfd9',
                data: postCountResult_1
            }, {
                name: '자유게시판',
                color: '#e3e3e3',
                data: postCountResult_7
            }, {
                name: '프로젝트',
                color: '#aed1b3',
                data: postCountResult_2
            }]
        };

        return (
            <>
                <Highcharts config={config}></Highcharts>
            </>
        );
    }
}

export default PostChart;