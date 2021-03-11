import helper from "./boardHelper"


const evaluateBoard = (board:Array<string>):number =>{

    const symbol = "X"
    const oppositeSymbol = "O"

    if(helper.hasWon(board, oppositeSymbol)){
        return -10
    }

    if(helper.hasWon(board, symbol)){
        return 10
    }    
    return 0

}
const returnEmptyIndexes = (board:Array<string>):Array<number> =>{

    let emptyIndexes:Array<number> = []

    board.map((square:string, index:number)=>{
        if (square === ""){
            emptyIndexes.push(index)
        }
    })

    return emptyIndexes
}

const bestMove =  (board:Array<string>, currentSymbol:string):number => {

    let newBoard = board.slice()
    const emptyIndexes = returnEmptyIndexes(board)

    let bestMove = -1;
    let bestValue = -1000


    emptyIndexes.map((emptyIndex)=>{

        newBoard[emptyIndex] = currentSymbol

        const value = minimax(newBoard, 0, false)
        newBoard[emptyIndex] = ""

        if (value > bestValue){
            console.log(`new best move: ${emptyIndex} \n new best value: ${value}`)
            bestMove = emptyIndex
            bestValue = value
        }
    })

    return bestMove;
}



const minimax = (board:Array<string>, depth:number, playersTurn:boolean):number => {
    
    const currentSymbol = playersTurn? "X" : "O"
    let score = evaluateBoard(board)

    if(score === 10){

        
        return score
    }
    if(score === -10){
        return score
    }
    if (helper.hasDrawn(board)){
        return 0;
    }
    if(playersTurn){

        let bestValue = 1000
        
        board.map((square:string, index:number) =>{

            let newBoard = board.slice()

            if (square === ""){

                
                newBoard[index] = currentSymbol
                const newDepth = depth + 1
                const newValue = minimax(newBoard, newDepth, false)


                if (newValue < bestValue){
                    bestValue = newValue
                }
            }
        })
        return bestValue
    }
    else{

        let bestValue = -1000

        board.map((square:string, index:number) =>{
            
            let newBoard = board.slice()

            if (square === ""){
                
                newBoard[index] = currentSymbol
                const newDepth = depth + 1
                const newValue = minimax(newBoard, newDepth, true)

                
                if (newValue > bestValue){
                    bestValue = newValue
                }
            }
        })
        return bestValue
    }

}


module.exports = bestMove