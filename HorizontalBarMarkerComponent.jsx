import React, { useEffect, useState } from 'react';
import { HorizontalBar, Bar } from 'react-chartjs-2';
import "./horizontalBarMarkerComponent.css";
const HorizontalBarMarkerComponent = (props) => {
    let [maxScale, setMaxScale] = useState(0);
    let [markerWidth , setMarkerWidth] = useState([]);
    useEffect(() => {
        var chartMax = Math.max(...props.chartData);
        var maerkerMax = Math.max(...props.markerData);
        var maxScale = Math.ceil(Math.max(chartMax, maerkerMax));
        var markerWidth = [];
        for(let i=0;i<props.chartData.length;i++){
            markerWidth.push(props.markerWidth);
        }
        setMaxScale(maxScale);
        setMarkerWidth(markerWidth);
    }, [props.markerData]);
    var chartData = {
        labels: props.chartLabels,
        datasets: [
            {
                label: props.chartLabel,
                backgroundColor: props.chartBarColor,
                borderColor: props.chartBarColor,
                borderWidth: 1,
                data: props.chartData,
            },
        ]
    }
    var markerData = {
        labels: props.chartLabels,
        datasets: [
            {
                label: 'hide',
                backgroundColor: 'rgba(0,0,0,0)',
                borderColor: 'rgba(0,0,0,0)',
                borderWidth: 1.5,
                data: props.markerData,

            },
            {
                label: props.markerLabel,
                backgroundColor: props.markerColor,
                borderColor: props.markerColor,
                borderWidth: 1.5,
                data: markerWidth,

            },
        ]
    };
    var chartOptions = {
        legend: {
            display: true
        },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            xAxes: [{
                display: true,
                barPercentage: 1,
                categoryPercentage: 0.5,
                ticks: {
                    min: 0,
                    max: maxScale,
                    stepSize: 1
                }

            }],
            yAxes: [{
                display: true,
                barPercentage: 1,
                categoryPercentage: 0.5,
            }],
        },
        hover: {
            animationDuration: 0
        },
        animation: {
            duration: 0
        },
        tooltips: {
            enabled: true,
        },
    };
    var markerOptions = {
        legend: {
            display: true,
            labels: {
                filter: function (item, chart) {
                    // Logic to remove a particular legend item goes here
                    return !item.text.includes('hide');
                }
            },
            align: 'end'
        },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            xAxes: [{
                display: true,
                barPercentage: 1,
                categoryPercentage: 0.5,
                ticks: {
                    min: 0,
                    max: maxScale,
                    stepSize: 1
                },
                stacked: true

            }],
            yAxes: [{
                display: true,
                barPercentage: 1,
                categoryPercentage: 0.5,
                stacked: true

            }],
        },
        hover: {
            animationDuration: 0
        },
        animation: {
            duration: 0
        },
        tooltips: {
            enabled: true,
            yAlign: "bottom",
            position: "nearest",
            filter: function (tooltipItems, data) {
                console.log(tooltipItems);
              //  var label = data.datasets[tooltipItems.datasetIndex].label;
                if (tooltipItems.datasetIndex === 0) {
                    return false;
                } else {
                    return true;
                }
            },
            callbacks: {
                label: function (tooltipItem, data) {
                    var itemIndex = tooltipItem.index;
                    var hiddenMarkerData = data.datasets[0].data;
                    var markerLabel = data.datasets[1].label;
                    return markerLabel + ": " + hiddenMarkerData[itemIndex];
                },

            },
        },
    };
    return (
        <div className="marker-bar-container">
            <HorizontalBar data={chartData} options={chartOptions} />
            {props.showMarker && <HorizontalBar data={markerData} options={markerOptions} />}
        </div>
    )
}
export default HorizontalBarMarkerComponent;
HorizontalBarMarkerComponent.defaultProps = {
    markerColor : "#000",
    markerWidth : 0.05,
    markerLabel : "BoB",
    chartBarColor : 'rgb(128,192,248)',
    showMarker : false,
    chartLabel : "Data"
}