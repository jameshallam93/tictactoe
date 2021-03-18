import React from "react"

interface Statistics {
    wins:number,
    draws:number,
    losses:number
}


const StatsTable = (props:({stats:Statistics})) =>{
    const {wins, draws, losses} = props.stats
    return(
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
    )
}

export default StatsTable