import { Point } from './Point'

const pointA = new Point(1, 1)
const pointB = new Point(2, 3)
const pointC = new Point(3, 5)
const pointD = new Point(2, 1)

test("compareTo function works", () => {
    expect(pointA.compareTo(pointB)).toBe(-1)
    expect(pointB.compareTo(pointA)).toBe(1)
    expect(pointA.compareTo(pointD)).toBe(0)
})

test("slope function works", () => {
    expect(pointA.slopeTo(pointB)).toBe(2)
    expect(pointA.slopeTo(pointD)).toBe(0)
})

test("slope function works", () => {
    expect(pointA.slopeTo(pointB)).toBe(2)
    expect(pointA.slopeTo(pointD)).toBe(0)
})

test("slope is negative infinite for degenerate line segments", () => {
    const pointA = new Point(1, 1)
    const pointB = new Point(1, 1)

    expect(pointA.slopeTo(pointB)).toBe(-Infinity)
})

test("slope is positive infinite for vertical line segments", () => {
    const pointA = new Point(1, 1)
    const pointB = new Point(1, 5)

    expect(pointA.slopeTo(pointB)).toBe(Infinity)
})

test("points can be ordered by their slopes", () => {
    const pointA = new Point(1, 1)
    const pointB = new Point(4, 2)
    const pointC = new Point(6, 7)

    expect(pointA.slopeOrder(pointB, pointC)).toBe(-1)

})