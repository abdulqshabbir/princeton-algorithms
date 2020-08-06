/*
    An re-sizing array implementation of a stack of strings

    Initialize to a one-element array.
    Innitialize the value of N to be zero.
    
    last represents index of the where the last element in array
    would go.
*/

export interface ArrayStackOfStrings {
    items: Array<string | undefined>
    N: number
}

export class ArrayStackOfStrings {
    constructor() {
        this.items = new Array(1)
        this.N = 0
        // N represents the number of filled entries within the array
        // N will be used to index into the arry with push/pop operations
    }

    push(item: string) {
        if (this.N === this.items.length) {
            let newSize = this.items.length * 2
            this.items = this.resize(newSize)
        }
        this.items[this.N] = item
        this.N++
    }

    resize(size: number) {
        let newStack = new Array(size)
        let oldStack = this.items
        for (let i = 0; i < oldStack.length; i++) {
            newStack[i] = oldStack[i]
        }
        return newStack
    }

    pop(): string | undefined {
        let poppedItem = this.items[this.N - 1]
        this.items[this.N - 1] = undefined
        return poppedItem
    }
}