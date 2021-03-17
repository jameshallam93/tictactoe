import React, { useEffect } from "react"
import { useState } from "react"
import Notification from "./Notification"
import StatsTable from "./StatsTable"
import helper from "./helpers/boardHelper"
import { act } from "react-dom/test-utils"
import bestMove from "./helpers/minimax"
import statsService from "../services/statsService"


interface Statistics {
    wins:number,
    draws:number,
    losses:number
}
//NB currently, player must always be O for the internal logic to work

const Board = () =>{
    //pseudo random turn picker
    const generateRandomBoolean = () =>{
        return Math.random() > .5
    }
    const[playersTurn, setPlayersTurn] = useState(generateRandomBoolean())
    const[board, setBoard] = useState(["","","","","","","","",""])
    const[notification, setNotification] = useState("")
    const [stats, setStats] = useState({
        wins: 0,
        draws:0,
        losses:0
    })
    const playerSymbol = "O"
    const cpuSymbol = "X"

    useEffect(()=>{
        helper.getInitStats(setStats)
    },[])
    //find a way to randomise turns between games - issue with flow control currently

    useEffect(()=>{
        if(!playersTurn){
            cpuTurn()
        }
    })

    const resetBoard = () =>{
        //setTimeout(()=>{
            setBoard(["","","","","","","","",""])
        //}, 3000)
    }

    const switchTurns = () =>{
        setPlayersTurn(!playersTurn)
    }

    const handleTurnChange = (newBoard:Array<string>, symbol:string) =>{

        const isWin = helper.hasWon(newBoard, symbol)
        const isDraw = helper.hasDrawn(newBoard)

        if (isWin){
            setTimeout(()=>{
                resetBoard()
            }, 3000)
            helper.handleWin(setStats, symbol)
            helper.showNotification(setNotification, `${symbol} has won!`)
        }
        if (isDraw){
            setTimeout(()=>{
                resetBoard()
            }, 3000)
            helper.handleDraw(setStats)
            helper.showNotification(setNotification, "Its a tie! Try again!")
        }
        switchTurns()
    }
    
    const cpuTurn = async () =>{

        const cpuMove = bestMove(board, cpuSymbol)

        let cpuBoard = board.slice()
        cpuBoard[cpuMove] = cpuSymbol

        act(()=>{setBoard(cpuBoard)})
        handleTurnChange(cpuBoard, cpuSymbol)
        
    }


    const takeUserTurn = (index:number) =>{

        if (board[index] === ""){

            const newBoard = helper.generateNewBoard(board, index, playerSymbol)
            setBoard(newBoard)

            handleTurnChange(newBoard, playerSymbol)
            return 
        }
        helper.showNotification(setNotification, "That square is already taken, please try again")
        return
    }
    

    return (
    <>
        <div className = "container">
        <h1> {helper.boardHeader}</h1>
        <h4> {helper.boardInfo}</h4>
        <StatsTable stats = {stats} />

        <div className = "notification">
            {notification? 
                <Notification notice = {notification}/>
                :
                null
            }
        </div>
        <div className = "board">
            {helper.generateBoard(board, takeUserTurn)}
        </div>

        </div>
    </>
)}

export default Board