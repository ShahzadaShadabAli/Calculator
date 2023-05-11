const calculatorDisplay = document.querySelector('h1')
const inputBtns = document.querySelectorAll('button')
const clearBtn = document.getElementById('clear-btn')

let firstValue = 0
let operatorValue = ''
let awaitingNextValue = false

const calculator = {
    "/": (firstNumber, secondNumber) => firstNumber / secondNumber,

    "+": (firstNumber, secondNumber) => firstNumber + secondNumber,

    "-": (firstNumber, secondNumber) => firstNumber - secondNumber,

    "*": (firstNumber, secondNumber) => firstNumber * secondNumber,

    "=": (firstNumber, secondNumber) =>secondNumber,
}

function useOperator(operator) {
    if (operatorValue && awaitingNextValue){
        operatorValue = operator
        return
    }
    const currentValue = Number(calculatorDisplay.textContent)
    if (!firstValue) {
        firstValue = currentValue
    } else {
        const calculation = calculator[operatorValue](firstValue, currentValue)
        calculatorDisplay.textContent = calculation
        firstValue = calculation
    }
    //Ready for the next value, store operator
    awaitingNextValue = true
    operatorValue = operator
}

function sendNumberValue(number) {
    //replace the display If first value is inserted
    if (awaitingNextValue) {
        calculatorDisplay.textContent = number
        awaitingNextValue = false
    } else {
        //If the current display value is 0, we'll replace it otherwise we will add number
        const displayValue = calculatorDisplay.textContent
        calculatorDisplay.textContent = displayValue === '0' ? number : displayValue + number
    }
}

function addDecimal() {
    //If operator pressed dont add decimal
    if (awaitingNextValue) return
    //If no decimal Then Add One
    if (!calculatorDisplay.textContent.includes('.')) {
        calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`
    }
}

// Add Event Listeners For Every Elements
inputBtns.forEach((inputBtn) => {
    if (inputBtn.classList.length === 0) {
        inputBtn.addEventListener('click', () => sendNumberValue(inputBtn.value))
    } else if (inputBtn.classList.contains('operator')) {
        inputBtn.addEventListener('click', () => useOperator(inputBtn.value))
    } else if (inputBtn.classList.contains('decimal')) {
        inputBtn.addEventListener('click', addDecimal)
    }
})

//Reset Display
function resetAll() {
    firstValue = 0
    operatorValue = ''
    awaitingNextValue = false
    calculatorDisplay.textContent = 0
}

//Event Listeners
clearBtn.addEventListener('click', resetAll)