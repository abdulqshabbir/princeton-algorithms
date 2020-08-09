/*
    A linked list implementation of a stack of strings.
*/

interface StringNode {
    item: string,
    next: StringNode | null
}

export interface StackOfStrings {
    first: StringNode | null
}

class StringNode {
    constructor(item: string) {
        this.item = item
        this.next = null
    }
}

export class StackOfStrings {
    constructor() {
        this.first = null
    }
    push(newItem: string): void {
        // if no items, make newItem the only item
        const item = new StringNode(newItem)
        if (this.first === null) {
            this.first = item
        }

        // if one or more items, make this.first point to the new item
        else {
            let restOfStack = this.first
            this.first = item
            item.next = restOfStack
        }
    }
    pop(): StringNode | null {

        // if no items on stack
        if (this.first === null) return null

        // if one item on stack
        if (this.first.next === null) {
            let poppedItem = this.first
            this.first = null
            return poppedItem
        }

        // if more than one item on stack
        let poppedItem = this.first
        this.first = poppedItem.next
        return poppedItem
    }
}