import { StackOfStrings } from './LinkedStackOfStrings'

test('First item on stack is initially null', () => {
    let stack = new StackOfStrings()
    expect(stack.first).toBe(null)
})
test('Item can be added to stack', () => {
    let stack = new StackOfStrings()
    stack.push('first item')
    expect(stack.first?.item).toBe('first item')
})
test('Item can be removed from stack', () => {
    let stack = new StackOfStrings()
    stack.push('first item')
    expect(stack.pop()?.item).toBe('first item')
})

test('If no items, popping returns null', () => {
    let stack = new StackOfStrings()
    stack.push('first item')
    stack.pop()
    expect(stack.pop()).toBe(null)
})

test('Items are added in correct order', () => {
    let stack = new StackOfStrings()
    stack.push('first item')
    stack.push('second item')

    expect(stack.first?.next?.item).toBe('first item')
    expect(stack.first?.item).toBe('second item')
})

test('Items are removed in correct order', () => {
    let stack = new StackOfStrings()
    stack.push('first item')
    stack.push('second item')

    expect(stack.pop()?.item).toBe('second item')
    expect(stack.pop()?.item).toBe('first item')
})