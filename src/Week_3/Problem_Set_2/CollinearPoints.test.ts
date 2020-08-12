import { Point, LineSegment, BruteCollinearPoints } from './CollinearPoints'

const pointA = new Point(1, 1)
const pointB = new Point(1, 1)
const pointC = new Point(1, 3)

test("Can create a point", () => {
    expect(pointA.x).toBe(1)
    expect(pointA.y).toBe(1)
})

test("Can compare points by their y-coordiantes (and break ties with x-coordinate)", () => {
    expect(pointC.compareTo(pointB)).toBe(1)
    expect(pointB.compareTo(pointC)).toBe(-1)
})


test("Find line segments", () => {
    const pointA = new Point(1, 2)
    const pointB = new Point(2, 4)
    const pointC = new Point(3, 6)
    const pointD = new Point(4, 8)
    const pointE = new Point(5, 10)

    const bruteCollinearPoints = new BruteCollinearPoints([pointA, pointB, pointC, pointD, pointE])
    console.log(bruteCollinearPoints.segments())
})