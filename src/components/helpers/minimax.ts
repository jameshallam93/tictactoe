import helper from "./boardHelper"


export const evaluateBoard = (board:Array<string>):number =>{

    const cpuSymbol = "X"
    const playersSymbol = "O"

    
    if(helper.hasWon(board, playersSymbol)){

        return -10
    }

    if(helper.hasWon(board, cpuSymbol)){
        return 10
    }    
    return 0

}
const returnEmptyIndexes = (board:Array<string>):Array<number> =>{

    let emptyIndexes:Array<number> = []

    board.forEach((square:string, index:number)=>{
        if (square === ""){
            emptyIndexes.push(index)
        }
    })

    return emptyIndexes
}

const bestMove =  (board:Array<string>, currentSymbol:string):number => {

    let newBoard = board.slice()
    const emptyIndexes = returnEmptyIndexes(board)


    let bestValue = -1000

    const bestMove = emptyIndexes.reduce((currentBest:number, emptyIndex:number):number=>{
        newBoard[emptyIndex] = currentSymbol
        const newValue = minimax(newBoard, 0, true)

        newBoard[emptyIndex] = ""

        if (newValue > bestValue){
            bestValue = newValue
            return emptyIndex
        }
        return currentBest
    },-1)


    return bestMove;
}



export const minimax = (board:Array<string>, depth:number, playersTurn:boolean):number => {
    
    const currentSymbol = playersTurn? "X" : "O"
    let score = evaluateBoard(board)

    if(score === -10){
        return score
        
    }
    if(score === 10){
        return score - depth
    }

    if (helper.hasDrawn(board)){
        return 0;
    }
    if(!playersTurn){

        const bestMaximValue = board.reduce((currentBest:number, square:string, index:number):number=>{
            let newBoard = board.slice()

            if(square === ""){
                newBoard[index] = "X"
                const newDepth = depth + 1
                const newValue = minimax(newBoard, newDepth, true)

                if (newValue > currentBest){
                    return newValue
                }
            }
            return currentBest
        },-1000)
        return bestMaximValue
    }

    const bestMinimValue = board.reduce((currentBest:number, square:string, index:number):number =>{
        let newBoard = board.slice()

        if (square === ""){
            newBoard[index] = "O"
            const newDepth = depth + 1
            const newValue = minimax(newBoard, newDepth, false)

            if (newValue < currentBest){
                return newValue
            }
        }
        return currentBest
    },1000)
    return bestMinimValue
    
}


export default bestMove