import React from "react"
import statsService from "../../services/statsService"


interface Statistics {
    wins:number,
    draws:number,
    losses:number
}

const boardHelper = {
    boardHeader: "Tic Tac Toe",
    boardInfo:`made using webpack and typescript; ai based on a minimax algorithm`,

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

    showNotificationAndResetBoard  (setNotification:(notification:string)=>void, resetBoard:()=>void, notification:string) {
        this.showNotification(setNotification, notification)
        setTimeout(()=>{
            resetBoard()
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

        if (nonEmptySquares.length === board.length){
            return true
        }
        return false

    },
    async checkForWinOrDraw (setStats:(stats:Statistics)=>void,setNotification:(notification:string)=>void, resetBoard:()=>void, board:Array<string>, currentSymbol:string):Promise<boolean> {
        if (this.hasWon(board, currentSymbol)){
            if (currentSymbol === "X"){
                const newStats = await statsService.updateStat("win")
                setStats(newStats)
            
            }
            if (currentSymbol === "O"){
                const newStats = await statsService.updateStat("loss")
                setStats(newStats)
            }
            this.showNotificationAndResetBoard(setNotification, resetBoard, `${currentSymbol} has won!`)


            return true
        }
        if (this.hasDrawn(board)){
            const newStats = await statsService.updateStat("draw")
            setStats(newStats)
            this.showNotificationAndResetBoard(setNotification, resetBoard, "Its a tie! Try again!")
            return true
        }
        return false
        }

}

export default boardHelper