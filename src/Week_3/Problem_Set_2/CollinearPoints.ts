export interface Point {
    x: number,
    y: number
}

export class Point {
    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }
    public compareTo(that: Point) {
        // compareTo is a comparator that ranks points by their y-coordinate (and breaks ties with their x-coordinate)
        // the invoking point (x0, y0) is less than the argument point (x1, y1) if y0 < y1 or (y0 = y1) and x0 < x1
        if (this.y < that.y) {
            return -1
        } else if (this.y === that.y && this.x < that.x) {
            return 0
        } else {
            return 1
        }
    }
    public slopeTo(that: Point) {
        // returns the slope between the invoking point and the argument point

        // if line segment is degenerate
        if (this.x === that.x && this.y === that.y) return -Infinity

        // if line segment is vertical
        if (this.x === that.x) return +Infinity

        // if line segment is horizontal
        if (this.y === that.y) return +0

        return ((that.y - this.y) / (that.x - this.x))
    }
    public slopeOrder(point1: Point, point2: Point) {
        // slopeOrder is a comparator that compares two points by their slope
        let slopeToPoint1 = this.slopeTo(point1)
        let slopeToPoint2 = this.slopeTo(point2)

        if (slopeToPoint1 < slopeToPoint2) {
            return - 1
        } else if (slopeToPoint1 === slopeToPoint2) {
            return 0
        } else {
            return 1
        }
    }
}

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
        */
        let result: LineSegment[] = []
        for (let p = 0; p < this.points.length; p++) {
            for (let q = 1; q < this.points.length; q++) {
                for (let r = 2; r < this.points.length; r++) {
                    for (let s = 3; s < this.points.length; s++) {
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

                        // if slopes equal, then points are collinear
                        if (slopePQ === slopePR && slopePQ === slopePS) {

                            // find the endpoints of the line segment that passes through all four points
                            let tentativeEndPoints: Point[] = []
                            tentativeEndPoints.push(pointP)
                            tentativeEndPoints.push(pointQ)
                            tentativeEndPoints.push(pointR)
                            tentativeEndPoints.push(pointS)

                            // sort points by their y-coordinate (lower y-coordinates at lower indices) and break ties with x-coordinates
                            tentativeEndPoints.sort((pointA: Point, pointB: Point) => {
                                return pointA.compareTo(pointB)
                            })

                            console.log(tentativeEndPoints)

                            let endpointA = tentativeEndPoints[0]
                            let endpointB = tentativeEndPoints[tentativeEndPoints.length - 1]
                            let newLineSegment = new LineSegment(endpointA, endpointB)

                            if (!this.isDuplicate(newLineSegment, result) && !this.isDegenerateSegment(newLineSegment)) {
                                result.push(new LineSegment(endpointA, endpointB))
                                // check the line segment added against the current list of line segments
                                // if another line segment has the same slope and the endpoints span a smaller distance than push new line segment
                                // otherwise, don't
                            }
                        }
                    }
                }
            }
        }
        return result
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
const pointA = new Point(1, 2)
const pointB = new Point(2, 4)
const pointC = new Point(3, 6)
const pointD = new Point(4, 8)
const pointE = new Point(5, 10)
const pointF = new Point(5, 9)

const bruteCollinearPoints = new BruteCollinearPoints([pointA, pointB, pointC, pointD, pointE])
console.log(bruteCollinearPoints.segments())