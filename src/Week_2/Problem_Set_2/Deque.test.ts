import { Deque } from './Deque'

test("Deque is initially empty", () => {
    const d = new Deque()

    expect(d.size).toBe(0)
    expect(d.first).toBe(null)
    expect(d.last).toBe(null)
})

test("addFirst adds to the front of the deque", () => {
    const d = new Deque<string>()

    d.addFirst('first')
    expect(d.first?.value).toBe('first')
    expect(d.size).toBe(1)

    d.addFirst('second')
    expect(d.first?.value).toBe('second')
    expect(d.first?.next?.value).toBe('first')
    expect(d.last?.value).toBe('first')
    expect(d.size).toBe(2)
})

test("can traverse deque forward and backward", () => {
    const d = new Deque<string>()

    d.addFirst('first')
    d.addFirst('second')
    d.addFirst('third')

    expect(d.size).toBe(3)
    expect(d.first?.value).toBe('third')
    expect(d.first?.next?.value).toBe('second')
    expect(d.first?.next?.next?.value).toBe('first')

    expect(d.first?.next?.next?.prev?.value).toBe('second')
    expect(d.first?.next?.next?.prev?.prev?.value).toBe('third')

})

test("addLast adds to the end of the deque", () => {
    const d = new Deque<number>()

    d.addLast(1)
    d.addLast(2)
    d.addLast(3)

    expect(d.last?.value).toBe(3)
    expect(d.last?.prev?.value).toBe(2)
    expect(d.first?.value).toBe(1)
    expect(d.size).toBe(3)
})

test("removeFirst removes from the front of the deque", () => {
    const d = new Deque<number>()
    d.addFirst(3)
    d.addFirst(2)
    d.addFirst(1)

    const first = d.removeFirst()
    const second = d.removeFirst()
    const third = d.removeFirst()

    expect(first).toBe(1)
    expect(second).toBe(2)
    expect(third).toBe(3)
    expect(d.removeFirst()).toBe(null)
})


test("Iterator works", () => {
    let d = new Deque<number>()
    d.addLast(1)
    d.addLast(2)
    d.addLast(3)

    let items: number[] = []
    for (let item of d) {
        items.push(item)
    }

    expect(items).toEqual([1, 2, 3])
})