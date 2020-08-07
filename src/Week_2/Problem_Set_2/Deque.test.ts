import { Deque } from './Deque'

test("Deque is initially empty", () => {
    let d = new Deque()

    expect(d.size).toBe(0)
    expect(d.first).toBe(null)
    expect(d.last).toBe(null)
})

test("addFirst adds to the front of the deque", () => {
    let d = new Deque<string>()

    d.addFirst('first')
    expect(d.first?.value).toBe('first')

    d.addFirst('second')
    expect(d.first?.value).toBe('second')
    expect(d.first?.next?.value).toBe('first')
    expect(d.last?.value).toBe('first')
})

test("can traverse deque forward and backward", () => {
    let d = new Deque<string>()

    d.addFirst('first')
    d.addFirst('second')
    d.addFirst('third')
    expect(d.first?.value).toBe('third')
    expect(d.first?.next?.value).toBe('second')
    expect(d.first?.next?.next?.value).toBe('first')

    expect(d.first?.next?.next?.prev?.value).toBe('second')
    expect(d.first?.next?.next?.prev?.prev?.value).toBe('third')

})

test("addLast adds to the end of the deque", () => {
    let d = new Deque<number>()

    d.addLast(1)
    d.addLast(2)
    d.addLast(3)

    expect(d.last?.value).toBe(3)
    expect(d.last?.prev?.value).toBe(2)
    expect(d.first?.value).toBe(1)
})

