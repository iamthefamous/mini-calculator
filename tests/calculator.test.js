// /tests/calculator.test.js

function assertEqual(actual, expected, description) {
    if (actual === expected) {
        console.log(`✅ ${description}`);
    } else {
        console.error(`❌ ${description}: expected ${expected}, got ${actual}`);
    }
}

// Example calculator functions (import or copy your calculator functions here)
const ops = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "*": (a, b) => a * b,
    "/": (a, b) => b === 0 ? NaN : a / b
};

// Tests
assertEqual(ops["+"](2, 3), 5, "2 + 3 = 5");
assertEqual(ops["-"](10, 4), 6, "10 - 4 = 6");
assertEqual(ops["*"](3, 5), 15, "3 * 5 = 15");
assertEqual(ops["/"](20, 4), 5, "20 / 4 = 5");
assertEqual(isNaN(ops["/"](5, 0)), true, "5 / 0 = NaN");
