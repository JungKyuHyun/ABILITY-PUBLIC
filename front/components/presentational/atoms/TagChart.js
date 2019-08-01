import React , {Component} from 'react';
import ReactHighcharts from 'react-highcharts';
import HighchartsMore from 'highcharts-more'

const config = {
    chart: {
        plotBorderWidth: 0,
        animation: true
    },
    series: [{
    type: "wordcloud",
    rotation: {
            from: 0,
            to: 0
    },
    spiral: 'rectangular',
    placementStrategy: 'center',
    data: [{
        name: "PERCOCET"
        }, {
        name: "DOCTOR"
        }, {
        name: "Placeholder"
        }]
    }],
    title: {
    text: "WORD CLOUD"
    }
};

class TagChart extends Component {
    render() {
        return (
            <>
                <ReactHighcharts config={config}></ReactHighcharts>
            </>
        );
    }
}

export default TagChart;