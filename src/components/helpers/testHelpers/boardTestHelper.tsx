import boardHelper from "../boardHelper"

const boardTestHelper = {
    emptyBoard :["","","","","","","","",""]
    ,
    randomIndex ()  {
        return Math.floor(Math.random()* (this.emptyBoard.length - 1))}
    ,
    drawnBoard : [
        "O", "X", "O",
        "X", "X", "O",
        "O", "O", "X"
    ],

    nonTerminalBoard :[
        "X", "", "O",
        "O", "", "X",
        "X", "", "O"
    ],
    winningBoard : [
        "X","X","X",
        "X","X","X",
        "X","X","X"
    ],
    symbol : "X",


    returnWinningBoards  ():string[][] {

        //combinations of indexes which produce winning positions
        let combos = boardHelper.winningCombos
        let winningBoards:string[][] = []

        //generate all winning boards and push to winningBoards
        combos.map(combo =>{
            let winningBoard = this.emptyBoard.slice()
            combo.map(index =>{
                winningBoard[index] = this.symbol
                winningBoards.push(winningBoard)
            })
        })
        return winningBoards
    },

    returnHasWonTruthArray  (boards:string[][]):Array<boolean> {
      
        let truthValues: Array<boolean> = []
    
        boards.map(winBoard =>{
            let truth = boardHelper.hasWon(winBoard, this.symbol)
            truthValues.push(truth)
        })
        return truthValues
    }
}


export default boardTestHelper