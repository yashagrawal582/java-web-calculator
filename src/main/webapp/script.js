class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    clear() {
        this.currentOperand = '0';
        this.previousOperand = '';
        this.operation = undefined;
        this.updateDisplay();
    }

    delete() {
        if (this.currentOperand === '0') return;
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
        if (this.currentOperand === '') {
            this.currentOperand = '0';
        }
        this.updateDisplay();
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return;
        if (this.currentOperand === '0' && number !== '.') {
            this.currentOperand = number.toString();
        } else {
            this.currentOperand = this.currentOperand.toString() + number.toString();
        }
    }

    chooseOperation(operation) {
        if (this.currentOperand === '' && this.previousOperand !== '') {
             // Allows changing the operator
             this.operation = operation;
             this.updateDisplay();
             return;
        }
        if (this.previousOperand !== '') {
            // If there's a previous calculation pending, do it first
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    // This is the ONLY function that calls the backend
    async compute() {
        if (this.operation == null || this.previousOperand === '' || this.currentOperand === '') return;

        const num1 = this.previousOperand;
        const num2 = this.currentOperand;
        // Map display operators to what the backend expects
        const op = this.operation === '÷' ? 'divide' : this.operation === '*' ? 'multiply' : this.operation === '+' ? 'add' : 'subtract';

        const data = new URLSearchParams();
        data.append('num1', num1);
        data.append('num2', num2);
        data.append('operation', op);
        
        try {
            const response = await fetch('calculate', {
                method: 'POST',
                body: data
            });

            if (!response.ok) {
                 // Handle server errors (like 404 or 500)
                 throw new Error('Server error');
            }
            
            const resultJson = await response.json();
            
            if (resultJson.error) {
                this.currentOperand = 'Error';
            } else {
                this.currentOperand = resultJson.result;
            }

        } catch (error) {
            console.error('Fetch error:', error);
            this.currentOperand = 'Error';
        }
        
        // Reset state for the next calculation
        this.operation = undefined;
        this.previousOperand = '';
        this.updateDisplay();
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.currentOperand;
        if (this.operation != null) {
            this.previousOperandTextElement.innerText = `${this.previousOperand} ${this.operation}`;
        } else {
            this.previousOperandTextElement.innerText = '';
        }
    }
}

// --- Event Listeners ---
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    });
});

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    });
});

equalsButton.addEventListener('click', button => {
    calculator.compute();
    // No updateDisplay here, compute handles it
});

allClearButton.addEventListener('click', button => {
    calculator.clear();
});

deleteButton.addEventListener('click', button => {
    calculator.delete();
});