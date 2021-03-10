import { render, fireEvent } from"@testing-library/react"
import "@testing-library/jest-dom/extend-expect"

import boardHelper from "./boardHelper"
import helper from "./testHelpers/boardTestHelper"

const emptyBoard = helper.emptyBoard

const randomIndex = helper.randomIndex()

const drawnBoard = helper.drawnBoard

const nonTerminalBoard = helper.nonTerminalBoard

const symbol = helper.symbol




describe("the generateNewBoard function", ()=>{

    describe("Given valid parameters board: [empty board], index: [random index], symbol:X :",()=>{

        test("Will return a new board with element at index matching the symbol", ()=>{
            const newBoard = boardHelper.generateNewBoard(emptyBoard, randomIndex, symbol)
            expect(newBoard[randomIndex]).toEqual(symbol)
        })
    })
})

describe("the showNotification function", ()=>{

    const notificationMock = jest.fn()
    const notification = "test notification"

    beforeEach(()=>{
        jest.useFakeTimers()
        boardHelper.showNotification(notificationMock, notification)
    })

    afterEach(()=>{
        notificationMock.mockClear()
        jest.clearAllTimers()
    })

    test("will call on setNotification mock function", ()=>{

        expect(notificationMock).toHaveBeenCalled()
    })
    test("with the test notification as a function call", ()=>{
        
        expect(notificationMock.mock.calls[0][0]).toEqual(notification)
    })
    test("then will set a timeout to clear the notification for three seconds", ()=>{

        expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 3000)
    })
})
describe("the generateBoard function", ()=>{

    describe("given valid parameters board: [empty board], setSquareValue: [mock function]", ()=>{

        let component:any;
        const setSquareMock = jest.fn()

        beforeEach(()=>{
            component = render(
                boardHelper.generateBoard(emptyBoard, setSquareMock)
            )
        })

        test("will render a div with classname: board", ()=>{

            const boardDiv = component.container.querySelector(".board")

            expect(boardDiv).toBeDefined()
        })
        test("will render nine divs with className: square", ()=>{

            const squareDivs = component.container.querySelectorAll(".square")

            expect(squareDivs.length).toEqual(9)
        })
        test("the square divs will contain a button element with className squareButton",()=>{

            const squareDivs = component.container.querySelectorAll(".square")
            const randomSquareDiv = squareDivs[randomIndex]

            const button = randomSquareDiv.querySelector(".squareButton")

            expect(button).toBeDefined()
            expect(button).toHaveTextContent("")
        })

    })
})


describe("the hasWon function", ()=>{

    describe("given any board with a winning terminal position", ()=>{


        test("returns true", ()=>{
            //returns a list of every board with a winning terminal position
            const winningBoards = helper.returnWinningBoards()
            
            const truthValues = helper.returnHasWonTruthArray(winningBoards)

            truthValues.map(truth =>{
                expect(truth).toEqual(true)
            })

        })
    })

    describe("given a board with a non-winning terminal position", ()=>{

        const oppositeSymbol = symbol === "X" ?
        "O"
        :
        "X"

        test("returns false for BOTH symbols", ()=>{
            const truth = boardHelper.hasWon(drawnBoard, symbol)
            const oppositeTruth = boardHelper.hasWon(drawnBoard, oppositeSymbol)

            expect(truth).toEqual(false)
            expect(oppositeTruth).toEqual(false)
        })
        

    describe("given an empty board", ()=>{

        test("returns false",()=>{

            const truth = boardHelper.hasWon(emptyBoard, symbol)
            expect(truth).toEqual(false)
        })
    })

    describe("given a board with a non-terminal position", ()=>{

        test("returns false", ()=>{

            const truth = boardHelper.hasWon(nonTerminalBoard, symbol)
            expect(truth).toEqual(false)
        })
    })

})
})

describe("the hasDrawn function", ()=>{

    describe("given a full board (winning or non-winning)", ()=>{



        test("returns true", ()=>{
            const truthWinBoard = boardHelper.hasDrawn(helper.winningBoard)
            expect(truthWinBoard).toEqual(true)

            const truthDrawnBoard = boardHelper.hasDrawn(drawnBoard)
            expect(truthDrawnBoard).toEqual(true)
        })
    })
    describe("given a non-full board", ()=>{

        test("returns false", ()=>{
            
            const truth = boardHelper.hasDrawn(nonTerminalBoard)
            expect(truth).toEqual(false)
        })
    })
})

