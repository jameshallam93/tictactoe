import React from "react";
import { useState } from "react"
import ReactDOM from "react-dom"
import "./index.css"

interface notification {
    message:string
}


const Notification = (props :{notice:string}) =>{
    return(
        <div className = "notification">
            <h3>{props.notice}</h3>
        </div>
    )
}


const Board = () =>{

    //const [board, setValue] = useBoard()

    const[playersTurn, setPlayersTurn] = useState(true)

    const[board, setBoard] = useState(["","","","","","","","",""])

    const[notification, setNotification] = useState("")

    const switchTurns = () =>{
        setPlayersTurn(!playersTurn)
    }

    const currentSymbol = playersTurn? "X" : "O"

    const setSquareValue = (index:number) =>{
        console.log(`Setting index ${index} to ${currentSymbol}`)
        if (board[index] === ""){
            let newBoard = board.slice()
            newBoard[index] = currentSymbol
            setBoard(newBoard)
            switchTurns()
            return;
        }
        setNotification("That square is already taken - try again")

    }
    

    const generateBoard = () =>(
        
            <div className = "board">
                {board.map((value, index) =>{
                    return(
                    <div className = "square" key = {index.toString()} id = {index.toString()} >
                        <button onClick = {()=>setSquareValue(index)} value = {value}>
                            {board[index]}
                        </button>
                    </div>
                    )
                })}
            </div>
        )
    


    return (
        
    <div className = "board">
        {notification? 
            <Notification notice = {notification}/>
            :
            null
        }
        {generateBoard()}
    </div>
            
)}


const App = () =>{
    return (
        <div className ="container">
            <h1> Tic Tac Toe</h1>
            <h4> Built using typescript and webpack</h4>
            <Board />
        </div>
    )
}

ReactDOM.render(<App/>,
    document.getElementById("root"))