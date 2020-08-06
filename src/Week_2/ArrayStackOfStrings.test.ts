import { ArrayStackOfStrings } from './ArrayStackOfStrings'

test('Array is initialized to be of size one', () => {
    let stack = new ArrayStackOfStrings()
    expect(stack.items.length).toBe(1)
    expect(stack.items[0]).toBe(undefined)
    expect(stack.items).toEqual([undefined])
})

test('Array push operation works and array correctly resizes', () => {
    let stack = new ArrayStackOfStrings()
    stack.push('first item')
    stack.push('second item')

    expect(stack.items.length).toBe(2)
    expect(stack.items[0]).toBe('first item')
    expect(stack.items[1]).toBe('second item')

    stack.push('third item')
    expect(stack.items.length).toBe(4)
})

test('Array pop operation works and array correctly shrinks', () => {
    let stack = new ArrayStackOfStrings()

    stack.push('first item')
    stack.push('second item')
    stack.push('third item')
    stack.push('fourth item')
    stack.push('fifth item')

    expect(stack.items.length).toBe(8)
    expect(stack.pop()).toBe('fifth item')
})
