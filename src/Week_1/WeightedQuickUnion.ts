/* Week 1: Quick-Union  Implementation */

/* 

WeightedQuickUnion class accepts N objects and each object is 
represented from 0 to N-1 as the indices of an array. 
The array entries represent the parent of that object.  In this way
the array represents a 'forest' (set of trees) whose root node can be
found by indexing into the array repeatedly until i === id[i] (object is its own 
parent and is therefore a root)

Method 'union(p, q)' connects the objects p and q by merging the root of p with the root of q.  In WeightedQuickUnion
the root of the larger tree always becomes the parent of the root of the smaller tree.

Method 'connected(p, q)' checks if the two objects: p and q share a root which is equivalent to checking
if the two obects are connected
*/

export interface WeightedQuickUnion {
    parent: number[]
    size: number[]
    open: boolean[]
}

export class WeightedQuickUnion {
    constructor(N: number) {
        this.parent = this.initialize(N).parent// ith entry is the parent of ith index
        this.size = this.initialize(N).size
        this.open = this.initialize(N).isOpen
    }
    initialize(N: number) {
        let parent = []
        let size = []
        let isOpen = []

        for (let i = 0; i < N; i++) {
            // make each object its own parent
            parent[i] = i
            size[i] = 1
            isOpen[i] = false
        }
        return {
            parent,
            size,
            isOpen
        }
    }
    isValidObject(p: number): boolean {
        if (p < this.parent.length && p >= 0) {
            return true
        }
        return false
    }
    getRootOf(p: number): number | null {
        if (!this.isValidObject(p)) return null
        // while p is not its own parent, assign p to be its parent
        while (p !== this.parent[p]) {
            p = this.parent[p]
        }
        return p // p is now its own parent
    }
    union(p: number, q: number): void {
        let pRoot = this.getRootOf(p)
        let qRoot = this.getRootOf(q)

        if (pRoot === null || qRoot === null) throw new Error('Cannot find root.')

        if (this.size[qRoot] < this.size[pRoot]) {
            this.parent[qRoot] = pRoot
            this.size[pRoot] += this.size[qRoot]
        } else {
            this.parent[pRoot] = qRoot
            this.size[qRoot] += this.size[pRoot]
        }

    }
    connected(p: number, q: number): boolean {
        let pRoot = this.getRootOf(p)
        let qRoot = this.getRootOf(q)
        if (pRoot === null || qRoot === null) throw new Error('Cannot find root.')

        return pRoot === qRoot
    }
    print() {
        console.log(this.parent)
    }
}
