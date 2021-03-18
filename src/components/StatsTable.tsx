import React from "react"
import { Bar } from "react-chartjs-2"
import { Statistics } from "./models/statistics"



const StatsTable = (props:({stats:Statistics})) =>{
    const {wins, draws, losses} = props.stats

    return(
        <>
        <div className = "statsTable">
            <table>
                <tbody>
                    <tr>
                        <th>Global AI Stats:</th>
                    </tr>
                    <tr>
                        <td>Wins:</td>
                        <td>{wins}</td>
                    </tr>
                    <tr>
                        <td>Draws:</td>
                        <td>{draws}</td>
                    </tr>
                    <tr>
                        <td>Losses:</td>
                        <td>{losses}</td>
                    </tr>
                </tbody>
            </table>
        </div>

        </>
    )
}

export default StatsTable