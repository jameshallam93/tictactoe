import React from "react"
import { useState } from "react"
import Notification from "./Notification"
import helper from "./helpers/boardHelper"


const Board = () =>{

    const[playersTurn, setPlayersTurn] = useState(true)

    const[board, setBoard] = useState(["","","","","","","","",""])

    const[notification, setNotification] = useState("")

    const switchTurns = () =>{
        setPlayersTurn(!playersTurn)
    }

    const currentSymbol = playersTurn? "X" : "O"

    const setSquareValue = (index:number) =>{

        if (board[index] === ""){
            const newBoard = helper.generateNewBoard(board, index, currentSymbol)
            setBoard(newBoard)

            if (helper.hasWon(newBoard, currentSymbol)){
                helper.showNotification(setNotification, `${currentSymbol} has won!`)
                setTimeout(()=>{
                    resetBoard()
                },3000)
                return;}

            switchTurns()
            }else{
                helper.showNotification(setNotification, "That square is already taken, please try again")
            return;
            }
        

    }
    
    const resetBoard = () =>{
        setBoard(["","","","","","","","",""])
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
            {helper.generateBoard(board, setSquareValue)}
        </div>

        </div>

    </>
)}

export default Board