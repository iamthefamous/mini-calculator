const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');
const clearButton = document.getElementById('clear');
const equalsButton = document.getElementById('equals');
const historyList = document.getElementById('history-list');
const historyButton = document.getElementById('history-btn');

function createCalculator() {
    return {
        expression: "",
        history: [],
        shouldReset: false,

        inputDigit(d) {
            if (this.shouldReset) {
                this.expression = "";
                this.shouldReset = false;
            }
            this.expression += d;
            this.updateDisplay();
        },

        chooseOperator(op) {
            if (this.shouldReset) this.shouldReset = false;
            if (this.expression === "") return;
            const lastChar = this.expression.slice(-1);
            if (["+", "-", "*", "/"].includes(lastChar)) {
                this.expression = this.expression.slice(0, -1);
            }
            this.expression += op;
            this.updateDisplay();
        },

        evaluate() {
            try {
                const result = eval(this.expression);
                this.addHistory(`${this.expression} = ${result}`);
                this.expression = result.toString();
                this.shouldReset = true;
                this.updateDisplay();
            } catch {
                this.expression = "Error";
                this.shouldReset = true;
                this.updateDisplay();
            }
        },

        allClear() {
            this.expression = "";
            this.updateDisplay();
        },

        addHistory(entry) {
            this.history.unshift(entry);
            if (this.history.length > 10) this.history.pop();
            this.updateHistory();
        },

        updateDisplay() {
            display.value = this.expression || "0";
        },

        updateHistory() {
            if (!historyList) return;
            historyList.innerHTML = '';
            this.history.forEach(item => {
                const li = document.createElement('li');
                li.textContent = item;
                historyList.appendChild(li);
            });
        }
    };
}

const calculator = createCalculator();

buttons.forEach(button => {
    const value = button.dataset.value || button.textContent;
    if (!isNaN(value) || value === ".") {
        button.addEventListener('click', () => calculator.inputDigit(value));
    } else if (["+", "-", "*", "/"].includes(value)) {
        button.addEventListener('click', () => calculator.chooseOperator(value));
    }
});

clearButton.addEventListener('click', () => calculator.allClear());
equalsButton.addEventListener('click', () => calculator.evaluate());

if (historyButton && historyList) {
    historyButton.addEventListener('click', () => {
        historyList.style.display = historyList.style.display === 'block' ? 'none' : 'block';
    });
}

document.addEventListener('keydown', (event) => {
    const key = event.key;
    if (!isNaN(key) || key === ".") {
        calculator.inputDigit(key);
    } else if (["+", "-", "*", "/"].includes(key)) {
        calculator.chooseOperator(key);
    } else if (key === "Enter") {
        calculator.evaluate();
    } else if (key === "Backspace") {
        calculator.expression = calculator.expression.slice(0, -1);
        calculator.updateDisplay();
    } else if (key === "Escape") {
        calculator.allClear();
    }
});
