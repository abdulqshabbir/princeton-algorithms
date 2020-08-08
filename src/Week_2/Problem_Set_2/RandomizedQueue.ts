/*
    Randomized queue will be similar to a queue except that when an item is removed it is removed uniformly at random.
*/

export interface RandomizedQueue<Item> {
    lastFreeIndex: number
    items: Array<Item | null>
}

export class RandomizedQueue<Item> {
    constructor() {
        this.lastFreeIndex = 0
        this.items = new Array(1)
    }
    public isEmpty(): boolean {
        return this.lastFreeIndex === 0
    }
    public size(): number {
        return this.lastFreeIndex
    }
    public enqueue(item: Item) {
        // adds item to the end of the queue
        if (this.lastFreeIndex === this.items.length) {
            this.resize(this.items.length * 2)
        }
        this.items[this.lastFreeIndex] = item
        this.lastFreeIndex++
    }
    public dequeue() {
        if (this.lastFreeIndex === 0) return null

        let randomIdx = this.getRandomNumberInInterval(0, this.lastFreeIndex - 1)
        let randomItem = this.items[randomIdx]
        this.items[randomIdx] = null
        this.swap(randomIdx, this.lastFreeIndex - 1)
        this.lastFreeIndex--

        if (this.lastFreeIndex === Math.floor(this.items.length / 4)) {
            this.resize(Math.floor(this.items.length / 4))
        }
        return randomItem
    }
    public sample() {
        let randomIdx = this.getRandomNumberInInterval(0, this.lastFreeIndex - 1)
        return this.items[randomIdx]
    }
    *[Symbol.iterator]() {
        /*
            Shuffle array in place using Knuth shuffle
            FOR each item in array
                yield item
        */
        this.knuthShuffle()

        for (let i = 0; i < this.lastFreeIndex; i++) {
            yield this.items[i]
        }
    }
    private knuthShuffle() {
        let n = this.lastFreeIndex // number of items in array
        for (let lastIndex = n - 1; lastIndex > 0; lastIndex--) {
            let randomIdx = this.getRandomNumberInInterval(0, lastIndex)
            this.swap(lastIndex, randomIdx) // mutates this.items array in place
        }
    }
    private swap(index1: number, index2: number) {
        let temp = this.items[index1]
        this.items[index1] = this.items[index2]
        this.items[index2] = temp
    }
    private getRandomNumberInInterval(num1: number, num2: number) {
        let range = Math.floor(Math.random() * (num2 - num1 + 1))
        return num1 + range
    }
    private resize(size: number) {
        let newItems: Array<Item | null> = new Array(size)

        for (let i = 0; i < size; i++) {
            newItems[i] = this.items[i]
        }
        this.items = newItems
    }
}

const q = new RandomizedQueue<number>()
q.enqueue(1)
q.enqueue(2)
q.enqueue(3)
q.enqueue(4)
q.enqueue(5)

console.log('------')
for (let item of q) {
    console.log(item)
}
console.log('------')
for (let item of q) {
    console.log(item)
}
console.log('------')
for (let item of q) {
    console.log(item)
}
console.log('------')
for (let item of q) {
    console.log(item)
}
console.log('------')
for (let item of q) {
    console.log(item)
}