import { Percolation } from './Percolation'

interface PercolationStats {
    n: number,
    trials: number
}

class PercolationStats {
    constructor(n: number, trials: number) {
        // n represents the length of the square grid
        // trials represents the number of independent trials conducted
        this.n = n
        this.trials = trials
    }

    private getRandomRowAndCol(): { row: number, col: number } {
        // choose a random row, col and open site there
        let randomRow = Math.ceil(Math.random() * 4)
        let randomCol = Math.ceil(Math.random() * 4)

        return {
            row: randomRow,
            col: randomCol
        }

    }
    public getPercolationThreshold(): number {
        debugger;
        let row: number
        let col: number

        let grid = new Percolation(this.n)

        while (!grid.percolates()) {
            row = this.getRandomRowAndCol().row
            col = this.getRandomRowAndCol().col
            grid.open(row, col)
        }

        let openSites = grid.numOfOpenSites
        let totalSites = grid.gridLength ** 2

        return openSites / totalSites
    }
    public mean(): any {
        // sample mean of percolation threshold
    }
    public stddev(): any {
        // sample standard deviation of percolation threshold
    }
    public confidenceLo(): any {
        // low endpoint of 95% confidence interfal
    }
    public confidenceHi(): any {
        // low endpoint of 95% confidence interfal
    }
    public main(n: number, trials: number): void {
        // n represents the length of the square grid
        // trials represents the number of independent trials conducted

        /*
        
            FOR each trial
                get percolationThreshold
                push to thresholds array
            
            average result
        */
    }
}


let p = new PercolationStats(2, 1)
console.log(p.getPercolationThreshold())