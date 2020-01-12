const {calculateTip, fahrenheitToCelsius, celsiusToFahrenheit} = require('../src/math')


test('Should calculate total with tip', () => {
    const total = calculateTip(10, 0.3)

    //? Expect function provided by Jest
    expect(total).toBe(13)
    // if (total !== 13) {
    //     throw new Error('Total tip should be 13. Got:' + total)
    // }
})

test('Should calculate total with default tip', () => {
    const total = calculateTip(10)
    expect(total).toBe(12.5)
})

test('Should convert 32 F to 0 C', () => {
    const convertion = fahrenheitToCelsius(32)
    expect(convertion).toBe(0)
})

test('Should convert 0 C to 32 F', () => {
    const convertion = celsiusToFahrenheit(0)
    expect(convertion).toBe(32)
})