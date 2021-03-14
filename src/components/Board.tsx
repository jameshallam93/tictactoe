import React, { useEffect } from "react"
import { useState } from "react"
import Notification from "./Notification"
import helper from "./helpers/boardHelper"
import { act } from "react-dom/test-utils"
import bestMove from "./helpers/minimax"



//NB currently, player must always be O for the internal logic to work

const Board = () =>{
    //pseudo random turn picker
    const generateRandomBoolean = () =>{
        return Math.random() > .5
    }
    const[playersTurn, setPlayersTurn] = useState(generateRandomBoolean())
    const[board, setBoard] = useState(["","","","","","","","",""])
    const[notification, setNotification] = useState("")

    useEffect(()=>{
        if(!playersTurn){
            cpuTurn()
        }
    })
    const switchTurns = async () =>{
        act(()=>
        setPlayersTurn(!playersTurn))
    }
    let playerSymbol = "O"
    let cpuSymbol = "X"
    
    const resetBoard = () =>{
        setBoard(["","","","","","","","",""])
    }

    const cpuTurn = async () =>{

        const cpuMove = bestMove(board, cpuSymbol)

        let cpuBoard = board.slice()
        cpuBoard[cpuMove] = cpuSymbol

        act(()=>{setBoard(cpuBoard)})
        helper.checkForWinOrDraw(setNotification, resetBoard, cpuBoard, cpuSymbol)
        switchTurns()
        
    }

    const takeUserTurn = async (index:number) =>{
        await setSquareValue(index)

    }

    const setSquareValue = async (index:number) =>{

        if (board[index] === ""){

            const newBoard = helper.generateNewBoard(board, index, playerSymbol)
            act(()=>{setBoard(newBoard)})

            const winOrDraw = helper.checkForWinOrDraw(setNotification, resetBoard, newBoard, playerSymbol)
            if (!winOrDraw){
                switchTurns()
            }
            return newBoard
        }
        helper.showNotification(setNotification, "That square is already taken, please try again")
        return
    
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