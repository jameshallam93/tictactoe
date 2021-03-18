import React from "react"
import Board from "./Board"
import boardHelper from "./helpers/boardHelper"
import { render, fireEvent } from "@testing-library/react"
import * as bestMove from "./helpers/minimax"
import "@testing-library/jest-dom/extend-expect"



//to do:
// test conditional rendering of Notification component



describe("the component correctly renders the following elements:", ()=>{
    let component:any;

    beforeEach(()=>{
        component = render(
            <Board />
        )
    })
    test("the container div", ()=>{

        const containerDiv = component.container.querySelector(".container")
        expect(containerDiv).not.toEqual(null)
    })
    test("the header", ()=>{

        const header = component.container.querySelector("h1")
        expect(header).not.toEqual(null)

        expect(header).toHaveTextContent(boardHelper.boardHeader)
    })
    test("the tagline/info", ()=>{

        const info = component.container.querySelector("h4")
        expect(info).not.toEqual(null)

        expect(info).toHaveTextContent(boardHelper.boardInfo)
    })
    test("div with className notification",()=>{
        const notificationDiv = component.container.querySelector(".notification")

        expect(notificationDiv).not.toEqual(null)
    })
    test("div with global stats table",()=>{
        const buttonsDiv = component.container.querySelector(".statsTable")

        expect(buttonsDiv).not.toEqual(null)
    })
    test("div with classname board", ()=>{
        const boardDiv = component.container.querySelector(".board")

        expect(boardDiv).not.toEqual(null)
    })
    test("the StatsTable component", ()=>{
        const statsTable = component.container.querySelector("table")

        expect(statsTable).not.toEqual(null)
    })
    })


describe("clicking on", ()=>{

    let component:any;
    let buttons:any;

    const generateNewBoardSpy = jest.spyOn(boardHelper, "generateNewBoard")
    const bestMoveSpy = jest.spyOn(bestMove, "default")

    beforeEach(()=>{
        component = render(
            <Board />
        )
        buttons = component.container.querySelectorAll(".squareButton")
    })

    afterEach(()=>{
        generateNewBoardSpy.mockClear()
        bestMoveSpy.mockClear()
    })

    describe("an empty square", ()=>{

        test("calls on helper.generateNewBoard", ()=>{
    
            fireEvent.click(buttons[1])
            expect(generateNewBoardSpy).toHaveBeenCalled()
    
        })
        test("changes the value of the square to the appropriate symbol", ()=>{
    
            fireEvent.click(buttons[1])

            expect(buttons[1]).toHaveTextContent("O")
        })
        test("then causes the cpu to take their turn, calling on bestMove from minimax module", ()=>{

            fireEvent.click(buttons[1])
            expect(bestMoveSpy).toHaveBeenCalled()
        })

    })
    describe("an empty square, followed by a different empty square", ()=>{

        test("calls on helper.generateNewBoard",()=>{
            fireEvent.click(buttons[0])
            fireEvent.click(buttons[8])

            expect(generateNewBoardSpy).toHaveBeenCalled()
        })

    })
    describe("an empty square, followed by the same square", ()=>{
        test("changes the value of the square only once", ()=>{

            fireEvent.click(buttons[0])
            const symbol = buttons[0].textContent

            fireEvent.click(buttons[0])

            expect(buttons[0].textContent).toEqual(symbol)
        })
        test("calls on helper.generateNewBoard once for player, and once for cpu (twice total) **PASSES 50% DUE TO RANDOM FIRST TURN***", ()=>{

            fireEvent.click(buttons[1])

            fireEvent.click(buttons[1])

            expect(generateNewBoardSpy).toBeCalledTimes(2)

        })
    })
})
