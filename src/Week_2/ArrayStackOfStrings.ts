/*
    An re-sizing array implementation of a stack of strings

    Initialize to a one-element array.
    Innitialize the value of N to be zero.
    
    N represents the number of items within the stack.
    N -1 is the index of the last item.
   
*/

export interface ArrayStackOfStrings {
    items: Array<string | undefined>
    N: number
}

export class ArrayStackOfStrings {
    constructor() {
        this.items = new Array(1)
        this.N = 0
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

    pop(): string | null {

        if (this.N === 0) return null

        let poppedItem = (this.items[this.N - 1]) as string
        this.items[this.N - 1] = undefined
        this.N--

        if (this.N === Math.floor(this.items.length / 4)) {
            let newStack = new Array(this.N)
            let oldStack = this.items
            for (let i = 0; i < newStack.length; i++) {
                newStack[i] = oldStack[i]
            }
            this.items = newStack
        }
        return poppedItem
    }
}