import React from "react"
import { Bar } from "react-chartjs-2"
import { Statistics } from "./models/statistics"

const BarChart = (props:({stats:Statistics})) =>{

    const {wins, draws, losses} = props.stats
    const data = {
        labels: ["Wins", "Draws", "Losses"],
        datasets:[
            {
                data:[wins, draws, losses],
                backgroundColor:[
                    "green", "orange", "red"
                ]
            }
        ]
    }
    return (
        <Bar data = {data}
        height = {150}
        width = {200}
        options = {{
            legend: {
                display: false
            },
            tooltips: {
                callbacks: {
                    label: function(tooltipItem:any) {
                            return tooltipItem.yLabel;
                    }
                }
            }
        }} />

    )
}
export default BarChart