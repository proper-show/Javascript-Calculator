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
        }

        createNumber(number) {
            this.currentData += number
            if(this.currentData.includes('.')) {
                decimalDisable = true
            }
                this.display(this.currentData)
           
        }

        plusMinus() {
            if (typeof this.previousData === 'number') {
                this.previousData = this.previousData * -1
                this.display(this.previousData)

            } else {
                this.currentData = this.currentData * -1
                this.display(this.currentData)
            } 
        }
        

        percent() {
            if (typeof this.previousData === 'number') {
                this.previousData = this.previousData / 100
                this.display(this.previousData)

            } else {
                this.currentData = this.currentData / 100
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
            let currentData = Number(this.currentData)
            let previousData = Number(this.previousData)

            if(this.currentOperator) {

                if(this.currentData && this.previousData != NaN) {
                    switch(this.currentOperator) {
                        case "/": 
                            this.sum = previousData / currentData
                            break;
                        case "*":
                            this.sum = previousData * currentData
                            break
                        case "-":
                            this.sum = previousData - currentData
                            break;
                        case "+":
                            this.sum = previousData + currentData
                            break;

                        }       
                        this.previousData = this.sum
                        this.sum = ''
                        this.display(this.previousData)
                        
                } else {
                    this.currentData = this.previousData

                    switch(this.currentOperator) {
                        case "/": 
                            this.sum = previousData / previousData
                            break;
                        case "*":
                            this.sum = previousData * previousData
                            break
                        case "-":
                            this.sum = previousData - previousData
                            break;
                        case "+":
                            this.sum = previousData + previousData
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
