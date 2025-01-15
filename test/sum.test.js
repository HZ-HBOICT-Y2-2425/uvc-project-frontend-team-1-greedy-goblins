const sum = require("./sum")

test('adds 1 + 2 = 3, is positive', () => {
    expect(sum(1, 2)).toBe("Positive Result = 3")
})
test('adds 1 + -2 = -1, is negative', () => {
    expect(sum(1, -2)).toBe("Negative Result = -1")
})
