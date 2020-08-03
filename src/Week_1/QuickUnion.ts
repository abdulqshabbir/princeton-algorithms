/* Week 1: Quick-Union  Implementation */

/* 

QuickUnion class accepts N objects and each object is 
represented from 0 to N-1 as the indices of an array. 
The array entries represent the parent of that object.  In this way
the array represents a 'forest' (set of trees) whose root node can be
found by indexing into the array repeatedly until i === id[i] (object is its own 
parent and is therefore a root)

Method 'union(p, q)' connects the objects p and q by merging the root of p with the root of q
in an arbitrary order.

Method 'connected(p, q)' checks if the two objects: p and q share a root which is equivalent to checking
if the two obects are connected
*/

interface QuickUnion {
    parents: number[]
}

class QuickUnion {
    constructor(N: number) {
        this.parents = this.initialize(N)// ith entry is the parent of ith index
    }
    initialize(N: number): number[] {
        let parents = []
        for (let i = 0; i < N; i++) {
            // make each object its own parent
            parents[i] = i
        }
        return parents
    }
    isValidObject(p: number): boolean {
        if (p < this.parents.length && p >= 0) {
            return true
        }
        return false
    }
    getRootOf(p: number): number | null {
        if (!this.isValidObject(p)) return null
        // while p is not its own parent, assign p to be its parent
        while (p !== this.parents[p]) {
            p = this.parents[p]
        }
        return p // p is now its own parent
    }
    union(p: number, q: number): void {
        debugger;
        let pRoot = this.getRootOf(p)
        let qRoot = this.getRootOf(q)

        if (pRoot === null || qRoot === null) throw new Error('Cannot find root.')

        this.parents[pRoot] = qRoot
    }
    connected(p: number, q: number): boolean {
        let pRoot = this.getRootOf(p)
        let qRoot = this.getRootOf(q)
        if (pRoot === null || qRoot === null) throw new Error('Cannot find root.')

        return pRoot === qRoot
    }
    print() {
        console.log(this.parents)
    }
}