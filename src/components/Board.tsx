import React, { useEffect } from "react"
import { useState } from "react"
import Notification from "./Notification"
import StatsTable from "./StatsTable"
import helper from "./helpers/boardHelper"
import bestMove from "./helpers/minimax"
import BarChart from "./BarChart"



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
            setBoard(["","","","","","","","",""])
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
        const cpuBoard = helper.generateNewBoard(board, cpuMove, cpuSymbol)

        setBoard(cpuBoard)
        handleTurnChange(cpuBoard, cpuSymbol)
        
    }

    const takeUserTurn = (index:number) =>{

        if (board[index] === ""){
            //prevents user taking turn after CPU win
            if (helper.hasWon(board, cpuSymbol)){
                return;
            }

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
        <div className = "chartDiv"
            style = {{maxHeight:150, maxWidth:200}}>
            <BarChart stats = {stats} />
        </div>
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