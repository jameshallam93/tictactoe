import React, { useEffect, useReducer } from "react"
import { useState } from "react"
import Notification from "./Notification"
import helper from "./helpers/boardHelper"
import { act } from "react-dom/test-utils"
import bestMove from "./helpers/minimax"
//NB currently, player must always be X for the internal logic to work




const Board = () =>{

    const[playersTurn, setPlayersTurn] = useState(true)
    const[board, setBoard] = useState(["","","","","","","","",""])
    const[notification, setNotification] = useState("")


    const switchTurns = async () =>{
        act(()=>
        setPlayersTurn(!playersTurn))
    }
    const currentSymbol = playersTurn? 
    "X"
     :
    "O"

    const resetBoard = () =>{
        setBoard(["","","","","","","","",""])
    }

    const cpuTurn = async () =>{

        const cpuMove = bestMove(board, currentSymbol)

        let cpuBoard = board.slice()
        cpuBoard[cpuMove] = currentSymbol
        act(()=>{setBoard(cpuBoard)})
        if (helper.hasWon(cpuBoard, currentSymbol)){
            helper.showNotification(setNotification, `${currentSymbol} has won!`)
            setTimeout(()=>{
                resetBoard()
            },3000)
            return;}
            if (helper.hasDrawn(cpuBoard)){
                helper.showNotification(setNotification, "Its a tie! Try again")
                setTimeout(()=>{
                    resetBoard()
                },3000)
                return;
            }
        switchTurns()

    }

    const takeUserTurn = async (index:number) =>{
        await setSquareValue(index)

    }

    const setSquareValue = async (index:number) =>{

        if (board[index] === ""){
            const newBoard = helper.generateNewBoard(board, index, currentSymbol)
            act(()=>{setBoard(newBoard)})

            if (helper.hasWon(newBoard, currentSymbol)){
                helper.showNotification(setNotification, `${currentSymbol} has won!`)
                setTimeout(()=>{
                    resetBoard()
                },3000)
                return;}

            if (helper.hasDrawn(newBoard)){
                helper.showNotification(setNotification, "Its a tie! Try again")
                setTimeout(()=>{
                    resetBoard()
                },3000)
                return;
            }
            switchTurns()
            return newBoard


            
        }else{
            helper.showNotification(setNotification, "That square is already taken, please try again")
        return
    
        }
    }

    return (
    <>
        <div className = "container">
        <h1> {helper.boardHeader}</h1>
        <h4> {helper.boardInfo}</h4>

        <div className = "notification">
            {notification? 
                <Notification notice = {notification}/>
                :
                null
            }
        </div>
        <div className = "buttons">
            <button onClick = {resetBoard}>reset</button>
            <button onClick = {cpuTurn}> cpu</button>
        </div>
        <div className = "board">
            {helper.generateBoard(board, takeUserTurn)}
        </div>

        </div>
    </>
)}

export default Board