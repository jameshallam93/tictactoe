import React from "react"

const boardHelper = {
    generateNewBoard(board:Array<string>, index:number, currentSymbol:string) {
        let newBoard = board.slice()
        newBoard[index] = currentSymbol
        return newBoard
    },

    showNotification  (setNotification:(message:string)=>void, notification:string) {
        setNotification(notification)
        setTimeout(()=>{
            setNotification("")
        }, 3000)
    },

    generateBoard (board:Array<string>, setSquareValue:(index:number)=>void) {
        return(
        <div className = "board">
            {board.map((value, index) =>{
                return(
                <div className = "square" key = {index.toString()} id = {index.toString()} >
                    <button className = "squareButton" onClick = {()=>setSquareValue(index)} value = {value}>
                        {board[index]}
                    </button>
                </div>
                )
            })}
        </div>
        )
    }
}

export default boardHelper