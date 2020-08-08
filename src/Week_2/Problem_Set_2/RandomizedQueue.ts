/*
    Randomized queue will be similar to a queue except that when an item is removed it is removed uniformly at random.
*/

export interface RandomizedQueue<Item> {
    firstFreeIndex: number
    items: Array<Item | null>
}

export class RandomizedQueue<Item> {
    constructor() {
        this.firstFreeIndex = 0
        this.items = new Array(1)
    }
    public isEmpty(): boolean {
        return this.firstFreeIndex === 0
    }
    public size(): number {
        return this.firstFreeIndex
    }
    public enqueue(item: Item) {
        // adds item to the end of the queue
        if (this.firstFreeIndex === this.items.length) {
            this.resize(this.items.length * 2)
        }
        this.items[this.firstFreeIndex] = item
        this.firstFreeIndex++
    }
    public dequeue() {
        if (this.firstFreeIndex === 0) return null

        let randomIdx = this.getRandomNumberInInterval(0, this.firstFreeIndex - 1)
        let randomItem = this.items[randomIdx]
        this.items[randomIdx] = null
        this.swap(randomIdx, this.firstFreeIndex - 1)
        this.firstFreeIndex--

        if (this.firstFreeIndex === Math.floor(this.items.length / 4)) {
            this.resize(Math.floor(this.items.length / 4))
        }
        return randomItem
    }
    public sample() {
        let randomIdx = this.getRandomNumberInInterval(0, this.firstFreeIndex - 1)
        return this.items[randomIdx]
    }
    *[Symbol.iterator]() {
        /*
            Shuffle array in place using Knuth shuffle
            FOR each item in array
                yield item
        */
        this.knuthShuffle()

        for (let i = 0; i < this.firstFreeIndex; i++) {
            yield this.items[i]
        }
    }
    private knuthShuffle() {
        let n = this.firstFreeIndex // number of items in array
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