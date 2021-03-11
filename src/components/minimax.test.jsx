
import bestMove from "./helpers/minimax"

let testBoard = [
    "O","","X",
    "","","",
    "","","X"
]


const cpuMove = bestMove(testBoard, "X")

test("best move is",()=>{
    console.log(`bestMove function has given square ${cpuMove+1}`)
    console.log("which gives the following board:")
    testBoard[cpuMove] = "X"
    const row1 = testBoard.slice(0,3)
    const row2 = testBoard.slice(3,6)
    const row3 = testBoard.slice(6,9)

    console.log(`\n ${row1} \n ${row2} \n ${row3}`)

})


