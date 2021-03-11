import React from "react"

const boardHelper = {
    boardHeader: "Tic Tac Toe",
    boardInfo:"made using webpack and typescript",

    generateNewBoard(board:Array<string>, index:number, currentSymbol:string):Array<string> {
        let newBoard = board.slice()
        newBoard[index] = currentSymbol

        return newBoard
    },

    showNotification  (setNotification:(message:string)=>void, notification:string):void {
        setNotification(notification)

        setTimeout(()=>{
            setNotification("")
        }, 3000)
    },

    generateBoard (board:Array<string>, setPlayerChoice:(index:number)=>void):any {
        return(

        <div className = "board">
            {board.map((value, index) =>{
                return(

                <div className = "square" key = {index.toString()} id = {index.toString()} >
                    <button className = "squareButton" onClick = {()=>setPlayerChoice(index)} value = {value}>
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

    hasWon (board:Array<string>, symbol:string):boolean {
        let winner = false

        this.winningCombos.map(combo =>{
            if (board[combo[0]] === symbol && board[combo[1]] === symbol && board[combo[2]] === symbol){
                winner = true
            }
        })
        return winner
    },
    
    hasDrawn (board:Array<string>):boolean {
        let nonEmptySquares = board.filter(x=>x)
        ///removed a -1
        if (nonEmptySquares.length === board.length){
            return true
        }
        return false

    }
    

}

export default boardHelper