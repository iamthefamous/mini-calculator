const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');
const clearButton = document.getElementById('clear');
const equalsButton = document.getElementById('equals');

let currentInput = '';
let shouldResetDisplay = false;

// Handle button clicks
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.dataset.value;

        if (value) {
            // Prevent double operators
            if (['+', '-', '*', '/'].includes(value)) {
                const lastChar = currentInput.slice(-1);
                if (['+', '-', '*', '/'].includes(lastChar)) {
                    currentInput = currentInput.slice(0, -1) + value;
                } else {
                    currentInput += value;
                }
            } else {
                if (shouldResetDisplay) {
                    currentInput = '';
                    shouldResetDisplay = false;
                }
                currentInput += value;
            }
            display.value = currentInput;
        }
    });
});

// Clear button
clearButton.addEventListener('click', () => {
    currentInput = '';
    display.value = '';
});

// Equals button
equalsButton.addEventListener('click', () => {
    try {
        // Replace symbols if needed (optional, you already use * and / internally)
        const result = eval(currentInput);
        display.value = result;
        currentInput = result.toString();
        shouldResetDisplay = true;
    } catch (error) {
        display.value = 'Error';
        shouldResetDisplay = true;
    }
});
