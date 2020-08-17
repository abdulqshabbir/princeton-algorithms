import { Point } from './Point'
import { LineSegment } from './LineSegment'
import { mergeSort } from '../../Week_2/Sorting_Algorithms/MergeSort'
import fsNoPromises from 'fs'
const fs = fsNoPromises.promises

export interface FastCollinearPoints {
    points: Point[]
    lineSegments: LineSegment[]
}

export class FastCollinearPoints {
    constructor(points: Point[]) {
        this.points = points
        this.lineSegments = []
    }
    private sortBySlopes(a: Point, b: Point) {
        if (a.slopeToQ < b.slopeToQ) {
            return -1
        } else if (a.slopeToQ === b.slopeToQ) {
            return 0
        } else {
            return 1
        }
    }
    public segments() {
        let N: number = this.points.length
        let segments: Point[] = []
        // let i be the index of the pth point
        for (let i = 0; i < N; i++) {
            let pointP = this.points[i]
            // for each point P, find the slope to the qth point
            // let j be the index of the qth point
            for (let j = 0; j < N; j++) {
                let pointQ = this.points[j]
                let slopePQ = pointP.slopeTo(pointQ)
                this.points[j].slopeToQ = slopePQ
            }
            // sort points by slope so that collinear points become adjacent
            this.points = this.points.sort(this.sortBySlopes)

            // get segments from sorted points
            let result = this.getLineSegments(this.points)
        }



    }
    private getLineSegments(points: Point[]) {
        let i = 0 // index i will be used to index into the ith point
        let j = 1 // index j will keep track of when we have consecutive equal slopes
        let N = points.length
        let result = []
        debugger;
        for (i; i < N - 1; i++) {
            if (points[i].slopeToQ === points[i + 1].slopeToQ) {
                j = j + 1
                if (j > 3 && (points[i + 1].slopeToQ !== points[i + 2].slopeToQ)) {
                    let collinearPoints = points.slice(i, i + j)
                    let length = collinearPoints.length
                    collinearPoints.sort((a, b) => a.compareTo(b))
                    result.push(new LineSegment(collinearPoints[0], collinearPoints[length - 1]))
                }
            } else {
                j = 1
            }
        }
    }
    public numberOfSegments() {
        return this.lineSegments.length
    }
}

async function getPointsFromTextFile() {
    let result: Point[] = []
    const res = await fs.readFile('src/Week_3/Problem_Set_2/grid4x4.txt')
    const points = res.toString().split('\n').splice(1)
    for (let point of points) {
        let parsedPoint =
            point.split(' ')
                .filter(p => p !== '')
                .map(p => parseInt(p))

        result.push(new Point(parsedPoint[0], parsedPoint[1]))
    }
    return result
}

getPointsFromTextFile().then(data => {
    console.log(data)
    let brute = new FastCollinearPoints(data)
    console.log(brute.segments())
})

