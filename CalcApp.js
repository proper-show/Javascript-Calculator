class Calculator {
    constructor() {
        this.currentData = ''
        this.previousData = ''
        this.sum = ''
        this.currentOperator = ''
        }
        
        display(data) {
            displayArea.textContent = data
        }
        
        clear() {
            this.currentData = ''
            this.previousData = ''
            this.sum = ''
            this.currentOperator = ''
            this.display(this.currentData)
            decimalDisable = false
        }

        createNumber(number) {
            this.currentData += number
            if(this.currentData.includes('.')) {
                decimalDisable = true
            } else {
                decimalDisable = false
            }
                this.display(this.currentData)
        }

        plusMinus() {
            if (this.previousData) {
                this.previousData = Big(this.previousData).times(-1).valueOf()
                this.display(this.previousData)
            } else {
                this.currentData = Big(this.currentData).times(-1).valueOf()
                this.display(this.currentData)
            } 
        }
        

        percent() {
            if (this.previousData) {
                this.previousData = Big(this.previousData).div(100).valueOf()
                this.display(this.previousData)
            } else {
                this.currentData = Big(this.currentData).div(100).valueOf()
                this.display(this.currentData)
            } 
        }

        createOperator(operator) {
                switch (operator) {
                    case "/": 
                        this.currentOperator = '/'
                        break;
                    case "*":
                        this.currentOperator = '*'
                        break
                    case "-":
                        this.currentOperator = '-'
                        break;
                    case "+":
                        this.currentOperator = '+'
                        break;
                }
            if (!this.previousData) {
                this.previousData = this.currentData
                this.currentData = ''
            } else {
                this.currentData = ''
            }
        }

        calculate() {
            let currentData = new Big(Number(this.currentData))
            let previousData = new Big(Number(this.previousData))

            if(this.currentOperator) {
                if(this.currentData && this.previousData != NaN) {
                    switch(this.currentOperator) {
                        case "/": 
                            this.sum = previousData.div(currentData).valueOf()
                            break;
                        case "*":
                            this.sum = previousData.times(currentData).valueOf()
                            break;
                        case "-":
                            this.sum = previousData.minus(currentData).valueOf()
                            break;
                        case "+":
                            this.sum = previousData.plus(currentData).valueOf()
                            break;
                        }      
                        this.previousData = this.sum
                        this.sum = ''
                        this.display(this.previousData)
                } else {
                    this.currentData = this.previousData
                    switch(this.currentOperator) {
                        case "/": 
                            this.sum = previousData.div(previousData).valueOf()
                            break;
                        case "*":
                            this.sum = previousData.times(previousData).valueOf()
                            break
                        case "-":
                            this.sum = previousData.minus(previousData).valueOf()
                            break;
                        case "+":
                            this.sum = previousData.plus(previousData).valueOf()
                            break;
                    }    
                    this.previousData = this.sum
                    this.sum = ''
                    this.display(this.previousData)
                }     
            } else {
                this.display(this.currentData)
            }
        }
}



const numButtons = document.querySelectorAll('[number]')
const allClear = document.querySelector('[all-clear]')
const plusMinus = document.querySelector('[plus-minus]')
const percent = document.querySelector('[percent]')
const equals = document.querySelector('[equals]')
const decimal = document.querySelector('[decimal]')
const displayArea = document.getElementById('displaytext')
const operatorButton = document.querySelectorAll('[operator]')
let decimalDisable = false

const calculator = new Calculator()

numButtons.forEach((button) => {
    button.addEventListener('click', () => {
        calculator.createNumber(button.innerText)
    })
})

operatorButton.forEach((button) => {
    button.addEventListener('click', () => {
        calculator.createOperator(button.innerText)
    })
})

equals.addEventListener('click', () => {
    calculator.calculate()
})

allClear.addEventListener('click', () => {
    calculator.clear()
})

plusMinus.addEventListener('click', () => {
    calculator.plusMinus()
})

percent.addEventListener('click', () => {
    calculator.percent()
})

decimal.addEventListener('click', () => {
    if (!decimalDisable) {
    calculator.createNumber('.')
    }
})
