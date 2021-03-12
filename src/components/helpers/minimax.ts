
import helper from "./boardHelper"


const evaluateBoard = (board:Array<string>):number =>{

    const playersSymbol = "X"
    const cpuSymbol = "O"


    if(helper.hasWon(board, cpuSymbol)){

        return -10
    }

    if(helper.hasWon(board, playersSymbol)){
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

    const bestIndex = emptyIndexes.reduce((currentBest, currentIndex):number =>{
        newBoard[currentIndex] = currentSymbol
        const value = minimax(newBoard, 0, true)
        newBoard[currentIndex] = ""

        if (value > bestValue){
            bestValue = value
            return currentIndex
        }
        return currentBest
    })
    return bestIndex
}



const minimax = (board:Array<string>, depth:number, playersTurn:boolean):number => {
    
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

        let bestValue = -1000

        board.forEach((square:string, index:number) =>{
            
            let newBoard = board.slice()

            if (square === ""){
                
                newBoard[index] = "X"
                const newDepth = depth + 1
                const newValue = minimax(newBoard, newDepth, true)

                if (newValue > bestValue){
                    bestValue = newValue
                }
            }
        })
        return bestValue
    }

    let bestValue = 1000
        
    board.forEach((square:string, index:number) =>{

        let newBoard = board.slice()

        if (square === ""){
            
            newBoard[index] = "O"
            const newDepth = depth + 1
            const newValue = minimax(newBoard, newDepth, false)

            if (newValue < bestValue){
                bestValue = newValue    
            }
        }
    })
    return bestValue
}

export default bestMove