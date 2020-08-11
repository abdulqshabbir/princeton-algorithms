interface Point {
    x: number,
    y: number
}

class Point {
    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }
    public compareTo(that: Point) {
        // compareTo is a comparator that ranks points by their y-coordainte (and breaks ties with their x-coordinate)
        // the invoking point (x0, y0) is less than the argument point (x1, y1) if y0 < y1 or (y0 = y1) and x0 < x1
        if (this.y < that.y) {
            return -1
        } else if (this.y === that.y && this.x < that.x) {
            return -1
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

interface LineSegment {
    point1: Point,
    point2: Point
}

class LineSegment {
    constructor(point1: Point, point2: Point) {
        this.point1 = point1
        this.point2 = point2
    }
}

interface BruteCollinearPoints {
    points: Point[]
}

class BruteCollinearPoints {
    constructor(points: Point[]) {
        this.points = points
    }
    public collinearPoints() {
        /*
        examines 4 points at a time and checks whether they are on the same segment
        iterate over list using 4 indices*/
    }
}