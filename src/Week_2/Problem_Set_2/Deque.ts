export interface Deque<Item> {
    first: Node<Item> | null
    last: Node<Item> | null
    size: number
}

export interface DequeClass {
    getSize: () => number
}

export class Deque<Item> implements DequeClass {
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
        }
        let rest = this.first // rest of deque
        this.first = newItem
        newItem.next = rest
        rest.prev = newItem
        this.size++
    }
    public addLast(item: Item) {
        /*
            IF
                deque empty, make first and last point to newItem
            ELSE
                save a reference to the oldLast of the list
                make last point to newItem
                make newItem.prev point to oldLast
                make oldLast.next point to newItem
        
        */
        let newItem = new Node(item)
        if (this.first === null || this.last === null) {
            this.first = newItem
            this.last = newItem
        }
        let oldLast = this.last
        this.last = newItem
        newItem.prev = oldLast
        oldLast.next = newItem
        this.size++
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