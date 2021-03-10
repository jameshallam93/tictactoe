import React from "react"
import Board from "./Board"
import boardHelper from "./helpers/boardHelper"

import { render, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"

import Enzyme from "enzyme"
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
Enzyme.configure({ adapter: new Adapter() })


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
    test("div with className buttons",()=>{
        const buttonsDiv = component.container.querySelector(".buttons")

        expect(buttonsDiv).not.toEqual(null)
    })
    test("div with classname board", ()=>{
        const boardDiv = component.container.querySelector(".board")

        expect(boardDiv).not.toEqual(null)
    })
   
    })


describe("clicking on", ()=>{

    let component:any;
    let buttons:any;

    const generateNewBoardSpy = jest.spyOn(boardHelper, "generateNewBoard")

    beforeEach(()=>{
        component = render(
            <Board />
        )
        buttons = component.container.querySelectorAll(".squareButton")
    })

    afterEach(()=>{
        generateNewBoardSpy.mockClear()
    })

    describe("an empty square", ()=>{

        test("calls on helper.generateNewBoard", ()=>{
    
            fireEvent.click(buttons[0])
            expect(generateNewBoardSpy).toHaveBeenCalled()
    
        })
        test("changes the value of the square to the appropriate symbool", ()=>{
    
            fireEvent.click(buttons[0])
            expect(buttons[0]).toHaveTextContent("X"||"O")
    
        })
    })
    describe("an empty square, followed by a different empty square", ()=>{
        test("changes the value of one of the squares to an X, and the other to an O", ()=>{

            fireEvent.click(buttons[0])
            expect(buttons[0]).toHaveTextContent("X"||"O")
            
            fireEvent.click(buttons[1])
            expect(buttons[1]).toHaveTextContent(buttons[0].textContent === "X" ? "O": "X")
        })
        test("calls on helper.generateNewBoard twice",()=>{
            fireEvent.click(buttons[0])
            fireEvent.click(buttons[1])

            expect(generateNewBoardSpy).toHaveBeenCalledTimes(2)
        })

    })
    describe("an empty square, followed by the same square", ()=>{
        test("changes the value of the square only once", ()=>{

            fireEvent.click(buttons[0])
            const symbol = buttons[0].textContent

            fireEvent.click(buttons[0])

            expect(buttons[0].textContent).toEqual(symbol)
        })
        test("calls on helper.generateNewBoard only once", ()=>{

            fireEvent.click(buttons[0])


            fireEvent.click(buttons[0])

            expect(generateNewBoardSpy).toBeCalledTimes(1)

        })
    })
})
