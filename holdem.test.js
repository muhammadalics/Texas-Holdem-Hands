const holdem = require('./holdem')

test('Check all suits are same', () =>{
    expect(holdem.checkAllEqual(['S','S','S','S','S'])).toBe(true)
})

test('Check if all faces are same', () =>{
    expect(holdem.checkAllEqual([8,8,8,8,8])).toBe(true)
})

test('Check if suits are different', () =>{
    expect(holdem.checkAllEqual(['S','S','C','S','D'])).toBe(false)
})

test('Check if all faces are different', () =>{
    expect(holdem.checkAllEqual([8,8,7,8,8])).toBe(false)
})

