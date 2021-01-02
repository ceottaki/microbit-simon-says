let hasStarted = 0
let waitForInput = 0
let sequence: number[] = []
let score = 0
let list: number[] = []
input.onPinPressed(TouchPin.P0, function () {
    if (hasStarted != 0 && waitForInput != 0) {
        processInput(3)
    }
})
function playSequence () {
    for (let index = 0; index <= sequence.length; index++) {
        basic.pause(300)
        if (sequence[index] == 0) {
            basic.showLeds(`
                . . # . .
                . # . . .
                # # # # #
                . # . . .
                . . # . .
                `)
        }
        if (sequence[index] == 1) {
            basic.showLeds(`
                . . # . .
                . . . # .
                # # # # #
                . . . # .
                . . # . .
                `)
        }
        if (sequence[index] == 2) {
            basic.showLeds(`
                . . # . .
                . # . # .
                # # # # #
                . # . # .
                . . # . .
                `)
        }
        if (sequence[index] == 3) {
            basic.showLeds(`
                # . . . #
                . # . # .
                . . # . .
                # # . # #
                # # . # #
                `)
        }
        basic.pause(100)
        basic.clearScreen()
    }
}
input.onButtonPressed(Button.A, function () {
    if (hasStarted == 0) {
        led.stopAnimation()
        basic.clearScreen()
        sequence = []
        score = 0
        waitForInput = 0
        hasStarted = 1
    } else {
        if (waitForInput != 0) {
            processInput(0)
        }
    }
})
function checkLastListItem () {
    return list[list.length - 1] == sequence[list.length - 1]
}
function gameOver () {
    waitForInput = 0
    basic.showIcon(IconNames.No)
    basic.pause(200)
    basic.showIcon(IconNames.Sad)
    basic.pause(200)
    hasStarted = 0
}
input.onButtonPressed(Button.AB, function () {
    if (hasStarted != 0 && waitForInput != 0) {
        processInput(2)
    }
})
input.onButtonPressed(Button.B, function () {
    if (hasStarted != 0 && waitForInput != 0) {
        processInput(1)
    }
})
function processInput (inputValue: number) {
    list.push(inputValue)
    waitForInput = input.runningTime()
    if (checkLastListItem()) {
        score += 1
        if (list.length == sequence.length) {
            basic.showIcon(IconNames.Yes)
            basic.pause(100)
            basic.clearScreen()
            waitForInput = 0
        }
    } else {
        gameOver()
    }
}
basic.forever(function () {
    if (hasStarted == 0) {
        if (score != 0) {
            basic.showString("Last score: " + score)
        }
        basic.showString("Press A to start")
    } else {
        if (waitForInput == 0) {
            sequence.push(randint(0, 3))
            playSequence()
            basic.clearScreen()
            list = []
            waitForInput = input.runningTime()
        } else {
            if (waitForInput < input.runningTime() - 2000) {
                gameOver()
            }
        }
    }
})
