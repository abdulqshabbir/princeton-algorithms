interface Site {
    isOpen: boolean
    row: number
    col: number
}

class Site {
    constructor(row: number, col: number) {
        this.row = row
        this.col = col
        this.isOpen = false
    }
}

interface Percolation {
    grid: Site[][],
    squareGridLength: number,
    numOfOpenSites: number
}

class Percolation {
    constructor(N: number) {
        this.grid = this.initialize(N)
        this.squareGridLength = N
        this.numOfOpenSites = 0
    }
    private initialize(N: number): Site[][] {
        let grid: Site[][] = []
        for (let i = 1; i <= N; i++) {
            grid[i] = []
            for (let j = 1; j <= N; j++) {
                grid[i][j] = new Site(i, j)
            }
        }
        return grid
    }
    private isValidSite(row: number, col: number): boolean {
        if (row <= 0 || row > this.squareGridLength) {
            return false
        }
        if (col <= 0 || col > this.squareGridLength) {
            return false
        }
        return true
    }
    open(row: number, col: number): void {
        if (this.isValidSite(row, col) && !this.grid[row][col].isOpen) {
            this.grid[row][col].isOpen = true
            this.numOfOpenSites++
        }
        this.print()
    }

    isOpen(row: number, col: number): boolean {
        if (!this.isValidSite(row, col)) {
            return false
        }
        return this.grid[row][col].isOpen
    }

    numberOfOpenSites(): number {
        return this.numOfOpenSites
    }
    print() {
        console.log(this.grid)
    }
}

let p = new Percolation(4)