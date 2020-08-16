import { Point } from './Point'

export interface LineSegment {
    point1: Point,
    point2: Point
}

export class LineSegment {
    constructor(point1: Point, point2: Point) {
        this.point1 = point1
        this.point2 = point2
    }
}

export interface BruteCollinearPoints {
    points: Point[]
}

export class BruteCollinearPoints {
    constructor(points: Point[]) {
        this.points = points
    }
    public segments(): LineSegment[] {
        /*
            examines 4 points at a time and checks whether they are collinear.  Use four indices: p, q, r and s to keep track of the array of points.

            FOR each quadruplet of points
                check that the slope between points is equal
                if it is, find the endpoints of line segment
                map over lineSegments to find if there is another line segment with the same slope but smaller distance
        */

        //  p                           q     r    s
        // [p1, p2, p3, p4, ..., pn-3, pn-2, pn-1, pn]

        let lineSegments: LineSegment[] = []
        this.points.sort((a, b) => this.comparePoints(a, b))

        let N: number = this.points.length
        for (let p = 0; p < N; p++) {
            for (let q = N - 3; q > p; q--) {
                for (let r = N - 2; r > p; r--) {
                    for (let s = N - 1; s > p; s--) {
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
                                    !this.isDuplicate(newLineSegment, lineSegments) &&
                                    !this.isDegenerateSegment(newLineSegment) &&
                                    !this.duplicateSlopes(newLineSegment, lineSegments)
                                ) {
                                    // if segment is not duplicate, not degenerate and slope of segment does not already exist,
                                    // then push line segment onto the lineSegments array
                                    lineSegments.push(new LineSegment(this.points[p], this.points[s]))
                                }
                            }
                        }
                    }
                }
            }
        }
        return lineSegments
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
        let newSlope = newSegment.point1.slopeTo(newSegment.point2)

        for (let segment of segments) {
            let slope = segment.point1.slopeTo(segment.point2)
            if (newSlope === slope) return true
        }
        return false
    }
    private isDegenerateSegment(segment: LineSegment) {
        if (segment.point1.x === segment.point2.x && segment.point2.y === segment.point2.y) {
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

    private areEquivalentSegments(segment1: LineSegment, segment2: LineSegment) {
        // for two segments to be equal their endpoint need to be equal
        if (this.areEquivalentPoints(segment1.point1, segment2.point1) &&
            this.areEquivalentPoints(segment1.point2, segment2.point2)
        ) return true
        if (this.areEquivalentPoints(segment1.point1, segment2.point2) &&
            this.areEquivalentPoints(segment1.point2, segment2.point1)
        ) return true

        return false
    }

    private areEquivalentPoints(point1: Point, point2: Point) {
        if (point1.x === point2.x && point1.y === point2.y) {
            return true
        }
        return false
    }
}
const pointB = new Point(2, 4)
const pointD = new Point(4, 8)
const pointA = new Point(1, 2)
const pointE = new Point(5, 10)
const pointC = new Point(3, 6)

const bruteCollinearPoints = new BruteCollinearPoints([pointA, pointB, pointC, pointD, pointE])
console.log(bruteCollinearPoints.segments())