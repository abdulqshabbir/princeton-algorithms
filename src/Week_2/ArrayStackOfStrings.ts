/*
    An re-sizing array implementation of a stack of strings

    Initialize to a one-element array.
    Innitialize the value of N to be zero.
    
    last represents index of the where the last element in array
    would go.

    push: (item: string) => void
        IF N === arrLength:
            this.stack = resize(arr, N*2)

        this.stack[N] = item
        N++
        
    pop: () => item: string

        IF N === Math.floor(arrLengh/4)
            this.stack = resize(arr, N/4)

        let popped = this.stack[N - 1]
        this.stack[N - 1] 
    resize: (oldArr, size) => newArr

       let newArr = new Array(size)
       
        FOR each entry in oldArr
            copy oldArr[i] into newArr[i]
        
        return newArr

*/

export interface ArrayStackOfStrings {
    stack: string[]
    N: number
}

export class ArrayStackOfStrings {
    constructor() {
        this.stack = new Array(1)
        this.N = 0
        // N represents the number of filled entries within the array
        // N will be used to index into the arry with push/pop operations
    }

    push(item: string) {
        if (this.N === this.stack.length) {
            let newSize = this.stack.length * 2
            this.stack = this.resize(newSize)
        }
        this.stack[this.N] = item
        this.N++
    }

    resize(size: number) {
        let newStack = new Array(size)
        let oldStack = this.stack
        for (let i = 0; i < oldStack.length; i++) {
            newStack[i] = oldStack[i]
        }
        return newStack
    }
}