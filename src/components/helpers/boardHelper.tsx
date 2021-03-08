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
    },

    winningCombos:[
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ],

    hasWon (board:Array<string>, currentSymbol:string) {
        let winner = false
        this.winningCombos.map(combo =>{
            if ((board[combo[0]] === currentSymbol) && (board[combo[1]] === currentSymbol) && (board[combo[2]] === currentSymbol)){
                winner = true
                
            }
        })
        return winner
    },
    
    hasDrawn (board:Array<string>) {
        let nonEmptySquares = board.filter(x=>x)
        console.log(nonEmptySquares)
        if (nonEmptySquares.length === board.length -1){
            return true
        }
        return false

    }
}

export default boardHelper