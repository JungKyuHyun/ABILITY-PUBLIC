import React, { Component } from 'react';

import * as am4core from "@amcharts/amcharts4/core";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import * as am4plugins_wordCloud from "@amcharts/amcharts4/plugins/wordCloud";
import axios from 'axios';

/**
 * 
 * @author 강기훈
 * @summary admin 메인 페이지에 사용하는 워드클라우드 입니다.
 * 
 */

const endpoint = process.env.NODE_ENV === 'production'? "?/test/tags" : "?/test/tags";

am4core.useTheme(am4themes_animated);
class AdminWordcloud extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        let chart = am4core.create("chartdiv", am4plugins_wordCloud.WordCloud);
        let tags = "";
        let series = chart.series.push(new am4plugins_wordCloud.WordCloudSeries());
        let title = chart.titles.create();
        title.fontSize = 18;
        title.marginBottom = 0;
        title.fontFamily="sans-serif";
        title.fontWeight="bold";
        title.fill=am4core.color("#5F4B8B");
        axios.get(endpoint).then(response => {
            let taglist = "";
            for (let i = 0; i < response.data.length; i++) {
                taglist += response.data[i] + " ,";
            }
            for (let i = 0; i < response.data.length; i++) {
                taglist += response.data[i] + " 1,";
            }
            for (let i = 0; i < response.data.length; i++) {
                taglist += response.data[i] + " ,";
            }

            series.accuracy = 5;
            series.step = 15;
            series.rotationThreshold = 0.7;
            series.maxCount = 200;
            series.minWordLength = 1;
            series.minValue = 0;
            series.labels.template.margin(4, 4, 4, 4);
            series.maxFontSize = am4core.percent(30);
            series.minFontSize = am4core.percent(6);
            series.colors = new am4core.ColorSet();
            series.colors.passOptions = {}; // makes it loop
            series.text = taglist;
            series.angles = [0, -90];
            series.fontWeight = "700";

            this.chart = chart;
        });
    }

    componentWillUnmount() {
        if (this.chart) {
            this.chart.dispose();
        }
    }
    render() {

        return (
            <div style={{  border:"1px soild #e2e2e2" }}>
                <div id="chartdiv" style={{ width: "100%", height: "400px", border:"1px soild #e2e2e2" }}></div>
            </div>
        );
    }

}

export default AdminWordcloud;