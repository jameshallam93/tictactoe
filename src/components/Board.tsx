import React from "react"
import { useState } from "react"
import Notification from "./Notification"
import helper from "./helpers/boardHelper"





const Board = () =>{

    const[turnOf, setTurn] = useState("PLAYER")
    const[board, setBoard] = useState(["","","","","","","","",""])
    const[notification, setNotification] = useState("")

    const switchTurns = () =>{
        if (turnOf === "CPU"){
            setTurn("PLAYER")
        }
        if (turnOf === "PLAYER"){
            setTurn("CPU")
        }
    }
    const currentSymbol = turnOf === "PLAYER"? 
    "X"
     :
    "O"

    const resetBoard = () =>{
        setBoard(["","","","","","","","",""])
    }

    const setSquareValue = (board:Array<string>, index:number) =>{
        const newBoard = helper.generateNewBoard(board, index, currentSymbol)
        console.log(newBoard)
        setBoard(newBoard)
        switchTurns()
        return newBoard
    }

    const setPlayerChoice = async (index:number) =>{

        if (helper.hasDrawn(board)){

            helper.showNotification(setNotification, "Its a tie! Try again")
            helper.timeoutBoardReset(resetBoard)
        }

        if (board[index] !== ""){
            helper.showNotification(setNotification, "That square is already taken, please try again")
            return;
        }
        const newBoard = helper.generateNewBoard(board, index, currentSymbol)
        setBoard(newBoard)
        

        if (helper.hasWon(newBoard, currentSymbol)){
                        
            helper.showNotification(setNotification, `${currentSymbol} has won!`)
            helper.timeoutBoardReset(resetBoard)

            return
        }

         switchTurns()
        console.log(turnOf)
        setTimeout(()=>{
            makeBestMove(newBoard)
        }, 500)



    }

    const makeBestMove = (board:Array<string>) =>{
        let bestScore = 1
        let bestMove = 4
        for (let i = 0; i < 8; i++){
            console.log(board[i])
            if (board[i] === ""){
                console.log(i);
                
                const newBoard = helper.generateNewBoard(board, i, currentSymbol)
                const score = 1000
                if (score > bestScore){
                    bestScore = score
                    bestMove = i
                }
            }
        }
        setSquareValue(board, bestMove)
    }
    
    const minimax = () =>{

            return 100


    }
    
    return (
    <>
        <div className = "container">
        <h1> Tic Tac Toe</h1>
        <h4> Built using typescript and webpack</h4>

        <div className = "notification">
            {notification? 
                <Notification notice = {notification}/>
                :
                null
            }
        </div>
        <div className = "buttons">
            <button onClick = {resetBoard}>reset</button>
        </div>
        <div className = "board">
            {helper.generateBoard(board, setPlayerChoice)}
        </div>

        </div>
    </>
)}

export default Board