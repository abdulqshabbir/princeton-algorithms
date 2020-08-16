import { Point } from './Point'
import { LineSegment } from './LineSegment'
import fsNoPromises from 'fs'

const fs = fsNoPromises.promises

export interface BruteCollinearPoints {
    points: Point[]
    lineSegments: LineSegment[]
}

export class BruteCollinearPoints {
    constructor(points: Point[]) {
        this.points = points
        this.lineSegments = []
    }
    public segments(): LineSegment[] {
        /*
            examines 4 points at a time and checks whether they are collinear.  Use four indices: p, q, r and s to keep track of the array of points.

            FOR each quadruplet of points
                check that the slope between points is equal
                if it is, find the endpoints of line segment
                map over lineSegments to find if there is another line segment with the same slope but smaller distance
        */

        this.points.sort((a, b) => this.comparePoints(a, b))

        let N: number = this.points.length
        for (let p = 0; p < N - 4; p++) {
            for (let q = N - 3; q > p; q--) {
                for (let r = N - 2; r > q; r--) {
                    for (let s = N - 1; s > r; s--) {
                        // check if slopes p-q, p-r, and p-s are equal. If true, points are collinear and return line segment containing points.
                        // get point at each index p, q, r and s
                        let pointP = this.points[p]
                        let pointQ = this.points[q]
                        let pointR = this.points[r]
                        let pointS = this.points[s]

                        // get the slope between two points
                        let slopePQ = pointP.slopeTo(pointQ)
                        let slopePR = pointP.slopeTo(pointR)
                        let slopePS = pointP.slopeTo(pointS)

                        if (slopePQ === slopePR) {
                            if (slopePQ === slopePS) {
                                // if slopes equal, then points are collinear
                                let newLineSegment = new LineSegment(this.points[p], this.points[s])
                                if (
                                    !this.isDuplicate(newLineSegment, this.lineSegments) &&
                                    !this.isDegenerateSegment(newLineSegment) &&
                                    !this.duplicateSlopes(newLineSegment, this.lineSegments) &&
                                    !this.hasTwoRepeatingPoints(pointP, pointQ, pointR, pointS)
                                ) {
                                    // if segment is not duplicate, not degenerate and slope of segment does not already exist,
                                    // then push line segment onto the lineSegments array
                                    this.lineSegments.push(new LineSegment(this.points[p], this.points[s]))
                                }
                            }
                        }
                    }
                }
            }
        }
        return this.lineSegments
    }
    public numberOfSegments() {
        return this.lineSegments.length
    }
    private hasTwoRepeatingPoints(p: Point, q: Point, r: Point, s: Point) {
        // p-q, p-r, p-s, q-r, q-s, r-s
        if (p.x == q.x && p.y === q.y) return true
        if (p.x === r.x && p.y === r.y) return true
        if (p.x === s.x && p.y === s.y) return true
        if (q.x === r.x && q.y === r.y) return true
        if (q.x === s.x && q.y === s.y) return true
        if (r.x === s.x && r.y === s.y) return true

        return false
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
    private duplicateSlopes(newSegment: LineSegment, segments: LineSegment[]) {
        let newSlope = newSegment.pointA.slopeTo(newSegment.pointB)

        for (let segment of segments) {
            let slope = segment.pointA.slopeTo(segment.pointB)
            if (newSlope === slope) return true
        }
        return false
    }
    private isDegenerateSegment(segment: LineSegment) {
        if (segment.pointA.x === segment.pointB.x && segment.pointA.y === segment.pointB.y) {
            return true
        }
        return false
    }
    private isDuplicate(newSegment: LineSegment, segments: LineSegment[]) {
        for (let segment of segments) {
            if (this.areEquivalentSegments(newSegment, segment)) {
                return true
            }
        }
        return false
    }

    private areEquivalentSegments(lineA: LineSegment, lineB: LineSegment) {
        // for two segments to be equal their endpoint need to be equal
        if (this.equalPoints(lineA.pointA, lineB.pointA) &&
            this.equalPoints(lineA.pointB, lineB.pointB)
        ) return true
        if (this.equalPoints(lineA.pointA, lineB.pointB) &&
            this.equalPoints(lineA.pointB, lineB.pointA)
        ) return true

        return false
    }

    private equalPoints(pointA: Point, pointB: Point) {
        return pointA.x === pointB.x && pointA.y === pointB.y
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
    let brute = new BruteCollinearPoints(data)
    console.log(brute.segments())
})