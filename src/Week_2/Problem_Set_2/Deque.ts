export interface Deque<Item> {
    first: Node<Item> | null
    last: Node<Item> | null
    size: number
}

export interface DequeMethods<Item> {
    isEmpty: () => boolean
    getSize: () => number
    addFirst: (item: Item) => void
    removeFirst: () => Item | null
    addLast: (item: Item) => void
    removeLast: () => Item | null
}

export class Deque<Item> implements DequeMethods<Item>  {
    constructor() {
        this.first = null
        this.last = null
        this.size = 0
    }
    public isEmpty(): boolean {
        return this.size === 0
    }
    public getSize(): number {
        return this.size
    }
    public addFirst(item: Item) {
        let newItem = new Node(item)
        if (this.first === null) {
            this.first = newItem
            this.last = newItem
        } else {
            let rest = this.first
            this.first = newItem
            newItem.next = rest
            rest.prev = newItem
        }
        this.size++
    }
    public addLast(item: Item) {
        let newItem = new Node(item)
        if (this.first === null || this.last === null) {
            this.first = newItem
            this.last = newItem
        } else {
            let oldLast = this.last
            this.last = newItem
            newItem.prev = oldLast
            oldLast.next = newItem
        }
        this.size++
    }
    public removeFirst() {
        // if empty, return null
        if (this.first === null) {
            return null
        }
        // if deque is of size one, reset deque to be empty
        let removed = this.first
        if (this.size === 1) {
            this.first = null
            this.last = null
        }
        // if deque has at least two elements, remove only the first element
        else {
            let newFirst = (this.first.next) as Node<Item>
            this.first = newFirst
            newFirst.prev = null
        }
        this.size--
        return removed.value
    }
    public removeLast() {
        // if empty, return null
        if (this.first === null) {
            return null
        }
        let removed = null
        //if deque is of size one, reset deque to be empty
        if (this.size === 1) {
            removed = this.last
            this.first = null
            this.last = null
        }
        else if (this.size > 1 && this.last !== null && this.last.prev !== null) {
            removed = this.last
            let newLast = this.last.prev
            newLast.next = null
            this.last = newLast
        }
        this.size--
        return (removed as Node<Item>).value
    }
    *[Symbol.iterator]() {
        let current = this.first

        if (current === null) return undefined

        yield current.value

        while (current.next !== null) {
            current = current.next
            yield current.value
        }
        return
    }
}
export interface Node<Item> {
    value: Item
    next: null | Node<Item>
    prev: null | Node<Item>
}
export class Node<Item> {
    constructor(item: Item) {
        this.value = item
        this.next = null
        this.prev = null
    }
}