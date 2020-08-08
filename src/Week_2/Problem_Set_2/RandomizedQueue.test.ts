import { Node } from './Deque'

/*
    Randomized queue will be similar to a queue except that when an item is removed it is removed uniformly at random.
*/

export interface RandomizedQueue<Item> {
    lastFreeIndex: number
    items: Array<Item>
}

export class RandomizedQueue<Item> {
    constructor() {
        this.lastFreeIndex = 0
        this.items = new Array(1)
    }
    public enqueue(item: Item) {
        // adds item to the end of the queue
        if (this.lastFreeIndex === this.items.length) {
            this.resize(this.items.length * 2)
        }
        this.items[this.lastFreeIndex] = item
        this.lastFreeIndex++
    }
    public dequeue(): Item | null {
        if (this.lastFreeIndex === 0) return null
        let randomIdx = this.getRandomNumberInInterval(0, this.lastFreeIndex - 1)
    }
    public getRandomNumberInInterval(num1: number, num2: number) {
        return num1 + Math.floor(Math.random() * (num1 - num2))
    }
    private resize(size: number) {

        let newItems: Item[] = new Array(size)

        for (let i = 0; i < this.items.length; i++) {
            newItems[i] = this.items[i]
        }

        this.items = newItems
    }
}

const q = new RandomizedQueue()

console.log(q.getRandomNumberInInterval(0, 1))