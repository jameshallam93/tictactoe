import helper from "./helpers/boardHelper"

let testBoard = [
    "X","","",
    "O","X","",
    "O","","O"
]

const bestMove = helper.bestMove(testBoard)

test("best move is",()=>{
    console.log(`bestMove function has given square ${bestMove+1}`)
    console.log("which gives the following board:")
    testBoard[bestMove] = "O"
    const row1 = testBoard.slice(0,3)
    const row2 = testBoard.slice(3,6)
    const row3 = testBoard.slice(6,9)

    console.log(`\n ${row1} \n ${row2} \n ${row3}`)

})


