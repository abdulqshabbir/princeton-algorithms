/* Week 1: Quick-Find  Implementation */

/* 

UnionFind class accepts N objects each object is 
represented from 0 to N-1 as the indices of an array. 
The array entries will represent an id of which objects
are connected.  Objects will be connected iff they have the same id.

Method 'connected(p, q)' checks if the two objects: p and q
are connected in some way (are part of the same connected components)


*/

interface UnionFind {
    id: number[]
}

class UnionFind {
    constructor(N: number) {
        this.id = new Array(N)
    }
    initialize() {
        for (let i = 0; i < this.id.length; i++) {
            this.id[i] = i
        }
    }
    union(p: number, q: number) {
        let pId = this.id[p]
        let qId = this.id[q]

        for (let i = 0; i < this.id.length; i++) {
            // if the ith entry in the id array matches pId, then set the ith entry to be qId 
            if (this.id[i] === pId) {
                this.id[i] = qId
            }
        }
    }
    connected(p: number, q: number) {
        return this.id[p] === this.id[q]
    }
    print() {
        console.log(this.id)
    }
}