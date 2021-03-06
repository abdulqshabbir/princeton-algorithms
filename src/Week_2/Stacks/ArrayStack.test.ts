import { ArrayStack } from './ArrayStack'

test('Stack is initialized to be of size one', () => {
    let stack = new ArrayStack()
    expect(stack.items.length).toBe(1)
    expect(stack.items[0]).toBe(undefined)
    expect(stack.items).toEqual([undefined])
})

test('Stack push operation works and array correctly resizes', () => {
    let stack = new ArrayStack()
    stack.push('first item')
    stack.push('second item')

    expect(stack.items.length).toBe(2)
    expect(stack.items[0]).toBe('first item')
    expect(stack.items[1]).toBe('second item')

    stack.push('third item')
    expect(stack.items.length).toBe(4)
})

test('Stack pop operation works in correct order', () => {
    let stack = new ArrayStack()

    stack.push('first item')
    stack.push('second item')
    stack.push('third item')

    expect(stack.items.length).toBe(4)
    expect(stack.pop()).toBe('third item')
    expect(stack.pop()).toBe('second item')
    expect(stack.pop()).toBe('first item')
    expect(stack.pop()).toBe(null)

})

test('Stack pop operation shrinks array to correct size', () => {
    let stack = new ArrayStack()

    stack.push('first item')
    stack.push('second item')
    stack.push('third item')
    expect(stack.items.length).toBe(4)
    stack.pop()
    stack.pop()
    expect(stack.items.length).toBe(1)
})

test('Stack also works for numbers type', () => {
    let stack = new ArrayStack()

    stack.push(1)
    stack.push(2)
    stack.push(3)
    expect(stack.items.length).toBe(4)
    expect(stack.items[0]).toBe(1)
    expect(stack.pop()).toBe(3)
})