import { Percolation } from './Percolation'

interface PercolationStats {
    gridLength: number,
    trials: number,
    thresholds: number[],
    meanPercolationThreshold: number | null
}

class PercolationStats {
    constructor(n: number, trials: number) {
        // gird length represents the length of the square grid for the percolation model
        // trials represents the number of independent trials conducted to find the percolation threshold (num of open sites needed for system to percolate)
        this.gridLength = n
        this.trials = trials
        this.thresholds = []
        this.meanPercolationThreshold = null
    }

    private getRandomRowAndCol(): { row: number, col: number } {
        // choose a random row, col and open site there
        let randomRow = Math.ceil(Math.random() * this.gridLength)
        let randomCol = Math.ceil(Math.random() * this.gridLength)

        return {
            row: randomRow,
            col: randomCol
        }

    }
    private getPercolationThreshold(): number {
        let row: number
        let col: number

        let grid = new Percolation(this.gridLength)

        while (!grid.percolates()) {
            row = this.getRandomRowAndCol().row
            col = this.getRandomRowAndCol().col
            grid.open(row, col)
        }

        let openSites = grid.numOfOpenSites
        let totalSites = grid.gridLength ** 2

        return openSites / totalSites
    }
    public mean(): number {
        // sample mean of percolation thresholds a given number of trials
        let thresholds = []
        for (let i = 0; i < this.trials; i++) {
            // let i represent the ith trial of finding a percolation threshold
            thresholds.push(this.getPercolationThreshold())
        }

        let percolationSum: number = 0
        for (let i = 0; i < this.trials; i++) {
            percolationSum += thresholds[i]
        }

        let percolationAverage: number = percolationSum / this.trials

        // store data in the instance properties
        this.meanPercolationThreshold = percolationAverage
        this.thresholds = thresholds

        return percolationAverage
    }
    public stddev(): number | null {
        // sample standard deviation of percolation threshold

        let varianceNumerator = 0
        let varianceDenominator = this.trials - 1

        if (this.meanPercolationThreshold === null) return null

        if (this.trials === 1) return NaN

        for (let i = 0; i < this.trials; i++) {
            varianceNumerator += (this.thresholds[i] - this.meanPercolationThreshold) ** 2
        }

        return Math.sqrt(varianceNumerator / varianceDenominator)
    }
    public confidenceLo(): null | number {
        // low endpoint of 95% confidence interfal
        let stddev = this.stddev()

        if (this.meanPercolationThreshold === null || stddev === null) return null

        return this.meanPercolationThreshold - 1.96 * (stddev / Math.sqrt(this.trials))
    }
    public confidenceHi(): null | number {
        // low endpoint of 95% confidence interfal
        let stddev = this.stddev()

        if (this.meanPercolationThreshold === null || stddev === null) return null

        return this.meanPercolationThreshold + 1.96 * (stddev / Math.sqrt(this.trials))
    }
}


let p = new PercolationStats(20, 30)
console.log('mean', p.mean())
console.log('stddev', p.stddev())
console.log('95% confidence interval', [p.confidenceLo(), p.confidenceHi()])