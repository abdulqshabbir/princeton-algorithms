import { RandomizedQueue } from './RandomizedQueue'

let q = new RandomizedQueue<number>()

test("Queue is initialized as an empty array of length 1", () => {
    expect(q.firstFreeIndex).toBe(0)
    expect(q.items).toEqual([undefined])
})

test("Enqueue adds to the end of the randomized queue", () => {
    q.enqueue(1)
    expect(q.items[0]).toBe(1)
    expect(q.firstFreeIndex).toBe(1)
})

test("Enqueuing resizes array", () => {
    q.enqueue(2)
    q.enqueue(3)
    expect(q.items.length).toBe(4)
})

test("Dequeing resizes array", () => {
    q.dequeue()
    q.dequeue()
    expect(q.items.length).toBe(1)
})

test("Sampling does not change length of queue", () => {
    let sample = q.sample()
    expect(q.items).toContain(sample)
    expect(q.items.length).toBe(1)
})

test("Iterator iterates over array in random order", () => {
    q.enqueue(4)
    q.enqueue(10)
    for (let item of q) {
        expect(q.items).toContain(item)
    }
})