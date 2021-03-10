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

    hasWon (board:Array<string>, currentSymbol:string):boolean {
        let winner = false

        this.winningCombos.map(combo =>{
            if ((board[combo[0]] === currentSymbol) && (board[combo[1]] === currentSymbol) && (board[combo[2]] === currentSymbol)){
                winner = true
            }
        })
        return winner
    },
    
    hasDrawn (board:Array<string>):boolean {
        let nonEmptySquares = board.filter(x=>x)
    
        if (nonEmptySquares.length === board.length -1){
            return true
        }
        return false

    },
    evaluateBoard (board:Array<string>, symbol:string):number {
        let score = 0;
        const oppositeSymbol = symbol === "X" ? "O":"X"
        if(this.hasWon(board, symbol)){
            score = 10
        }
        if(this.hasWon(board, oppositeSymbol)){
            score = -10
        }
        return score
    },
    returnEmptyIndexes(board:Array<string>):Array<number>{
        let emptyIndexes:Array<number> = []
        board.map((square:string, index:number)=>{
            if (square === ""){
                emptyIndexes.push(index)
            }
        })
        return emptyIndexes
    },
    bestMove (board:Array<string>):number {

        let newBoard = board.slice()
        const emptyIndexes = this.returnEmptyIndexes(board)
        console.log(emptyIndexes)
        let bestMove = -1;
        let bestValue = -1000
        emptyIndexes.map((emptyIndex)=>{
            newBoard[emptyIndex] = "O"
            const value = this.minimax(newBoard, 0, false)
            if (value > bestValue){
                bestMove = emptyIndex
                bestValue = value
            }
        })
        for (let number in emptyIndexes){
            newBoard[number] = "O"
            const value = this.minimax(newBoard, 0, false)
            if (value > bestValue){
                bestMove = Number(number);
                bestValue = value
            }
        }
        return bestMove;
    },

    

    minimax (board:Array<string>, depth:number, playersTurn:boolean):number {
        const currentSymbol = playersTurn? "X" : "O"
        let score = this.evaluateBoard(board, currentSymbol)
        if(score === 10){
            return score
        }
        if(score === -10){
            return score
        }
        if(playersTurn){

            let bestValue = Infinity
            
            board.map((square:string, index:number) =>{

                let newBoard = board.slice()

                if (square === ""){

                    newBoard[index] = currentSymbol

                    const newValue = this.minimax(newBoard, depth +1, !playersTurn)
                    newBoard[index] = ""

                    if (newValue < bestValue){
                        bestValue = newValue
                    }
                }
            })
            return bestValue
        }
        if (!playersTurn){

            let bestValue = -Infinity

            board.map((_square:string, index:number) =>{
                
                let newBoard = board.slice()

                if (_square = ""){
                    
                    newBoard[index] = currentSymbol

                    const newValue = this.minimax(newBoard, depth+1, !playersTurn)
                    newBoard[index] = ""
                    
                    if (newValue > bestValue){
                        bestValue = newValue
                    }
                }
            })
            return bestValue
        }
        return 0;
    }

}

export default boardHelper