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
        if (a.slopeToO < b.slopeToO) {
            return -1
        } else if (a.slopeToO === b.slopeToO) {
            return 0
        } else {
            return 1
        }
    }
    public comparePoints(a: Point, b: Point) {
        if (a.y < b.y) {
            return -1
        } else if (a.y === b.y && a.x < b.x) {
            return 0
        } else {
            return 1
        }
    }
    public segments() {
        let N: number = this.points.length
        let segments: LineSegment[] = []

        // let i be the index of the origin point
        // We will find the slope form the origin point to every other point
        for (let i = 0; i < N; i++) {
            let pointO = this.points[i] // pointO is the origin
            for (let j = 0; j < N; j++) {
                let pointP = this.points[j]
                let slopeOP = pointO.slopeTo(pointP)
                this.points[j].slopeToO = slopeOP
            }

            // sort points by slope so that collinear points become adjacent
            let sortedPoints = this.points.sort(this.sortBySlopes).slice()

            // get segments from sorted points
            let result = this.getLineSegments(sortedPoints, i)

            segments.push(...result)
        }
        return segments
    }
    private getLineSegments(points: Point[], originIdx: number) {
        let startIdx: number | null = null
        let endIdx: number | null = null
        let result: LineSegment[] = []

        for (let i = 0; i < points.length - 2; i++) {
            if (points[i].slopeToO === points[i + 1].slopeToO) {
                if (startIdx === null && endIdx === null) {
                    startIdx = i
                    endIdx = i
                } else if (endIdx !== null) {
                    endIdx = endIdx + 1
                }
            } else {
                if (startIdx !== null && endIdx !== null) {
                    let collinearPoints = points.slice(startIdx, endIdx + 1)
                    collinearPoints.sort(this.comparePoints)

                    let pointA = collinearPoints[0]
                    let pointB = collinearPoints[collinearPoints.length - 1]
                    result.push(new LineSegment(pointA, pointB))
                    startIdx = null
                    endIdx = null
                }
            }
        }
        return result
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

