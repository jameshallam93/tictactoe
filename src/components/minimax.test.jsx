
import bestMove from "./helpers/minimax"
import { minimax, evaluateBoard } from "./helpers/minimax"

//this board will be more thoroughly tested - use for test cases
let testBoard = [
    "O","","X",
    "","","",
    "","","X"
]

let cpuWinBoard = [
    "O","","X",
    "","","",
    "","","X"
]

let playerWinBoard = [
    "O", "O", "",
    "","","",
    "","",""
]
let earlyGameBoard = [
    "O","","",
    "","","",
    "","",""
]
let emptyBoard = [
    "","","",
    "","","",
    "","",""
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
    const score = minimax(testBoard, 0, true)
    console.log(`With a score of ${score}`);
    testBoard[cpuMove] = ""

})
describe("The best move function, relying on minimax algorithm chooses correct square in the following scenarios:", ()=>{
    test("a board in which the cpu can win in one turn", ()=>{
        expect(bestMove(cpuWinBoard, "X")).toEqual(5)
    })
    test("a board in which the player can win in one turn",()=>{
        expect(bestMove(playerWinBoard, "X")).toEqual(2)
    })
    test("an early game board in which the correct move is centre square", ()=>{
        expect(bestMove(earlyGameBoard, "X")).toEqual(4)
    })
    test("an empty board", ()=>{
        expect(bestMove(emptyBoard, "X")).toEqual(0)
    })
    test("given an empty board and THREE turns, will create a winning terminal state", ()=>{
        const move1 = bestMove(emptyBoard, "X")
        emptyBoard[move1] = "X"
        const move2 = bestMove(emptyBoard, "X")
        emptyBoard[move2] = "X"
        const move3 = bestMove(emptyBoard, "X")
        emptyBoard[move3] = "X"
        expect(evaluateBoard(emptyBoard)).toEqual(10)
    })
})

