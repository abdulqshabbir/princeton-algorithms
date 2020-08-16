import { Point } from './Point'
export interface LineSegment {
    pointA: Point,
    pointB: Point
}

export class LineSegment {
    constructor(point1: Point, point2: Point) {
        this.pointA = point1
        this.pointB = point2
    }
}
