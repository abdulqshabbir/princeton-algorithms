import { WeightedQuickUnion } from '../WeightedQuickUnion'

interface Percolation {
    grid: WeightedQuickUnion,
    gridLength: number
    numOfOpenSites: number,
}

class Percolation {
    constructor(n: number) {
        /*
            The 2D grid will be represented with a 1D array
            where the index represents a particular site and
            the entry represents that site's connected parent

            The indices from 0 to n^2 - 1 will represent the sites.
        */
        this.grid = new WeightedQuickUnion(n ** 2)
        this.numOfOpenSites = 0
        this.gridLength = n
    }
    public percolates(): boolean {
        let lastRow = this.gridLength
        let lastCol = this.gridLength

        for (let col = 1; col <= lastCol; col++) {
            if (this.isFull(lastRow, col)) {
                return true
            }
        }
        return false
    }
    public isFull(row: number, col: number): boolean {
        let current = this.getIndexOfSite(row, col)
        if (!this.isValidIndex(current)) throw new Error("Invalid argument.")

        // if site is not open, it cannot be connected to a site in the top row so return false
        if (!this.isOpen(row, col)) return false

        for (let i = 0; i < this.gridLength; i++) {
            // let i represent an index of a site in the top row
            if (this.grid.connected(i, current)) {
                return true
            }
        }
        return false
    }
    public open(row: number, col: number) {
        let current = this.getIndexOfSite(row, col)

        // if invalid site, return
        if (!this.isValidIndex(current)) throw new Error("Invalid Argument.")

        // if site is not open, open it
        if (!this.grid.open[current]) {
            this.grid.open[current] = true
            this.numOfOpenSites++
        }

        let neighbours = this.getOpenNeighbours(row, col)

        // For each neighbour that is open, connect current site to neighbouring site
        neighbours.forEach(neighbour => {
            if (this.grid.open[neighbour] === true) {
                this.grid.union(current, neighbour)
            }
        })
    }
    public isOpen(row: number, col: number): boolean {
        let idx = this.getIndexOfSite(row, col)

        if (!this.isValidIndex(idx)) throw new Error("Invalid argument.")

        return this.grid.open[idx]
    }
    public numberOfOpenSites(): number {
        return this.numOfOpenSites
    }
    private getOpenNeighbours(row: number, col: number): number[] {
        let neighbours = [] // the numbers in this array represent the position of the neighbour site in the grid

        let upIndex = this.getIndexOfSite(row - 1, col)
        let downIndex = this.getIndexOfSite(row + 1, col)
        let leftIndex = this.getIndexOfSite(row, col - 1)
        let rightIndex = this.getIndexOfSite(row, col + 1)

        if (this.isValidIndex(upIndex) && this.grid.open[upIndex]) {
            neighbours.push(upIndex)
        }

        if (this.isValidIndex(downIndex) && this.grid.open[downIndex]) {
            neighbours.push(downIndex)
        }

        if (this.isValidIndex(leftIndex) && this.grid.open[leftIndex]) {
            neighbours.push(leftIndex)
        }

        if (this.isValidIndex(rightIndex) && this.grid.open[rightIndex]) {
            neighbours.push(rightIndex)
        }
        return neighbours
    }
    private isValidIndex(idx: number): boolean {
        if (idx >= 0 && idx < this.grid.parent.length) return true

        return false
    }
    private getIndexOfSite(row: number, col: number) {
        // converts a (row, col) on a 2D grid to a an index for a 1D array
        let index = this.gridLength * (row - 1) + (col - 1)
        return index
    }
}