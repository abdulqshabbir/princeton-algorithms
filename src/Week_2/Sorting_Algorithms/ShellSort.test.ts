import { hSort, shellSort } from './ShellSort'

let a = [62, 83, 18, 53, 7, 17, 95, 86, 47, 69, 25, 28]
test("5-sort works", () => {
    expect(hSort(a, 5)).toEqual([17, 28, 18, 47, 7, 25, 83, 86, 53, 69, 62, 95])
})

test("shell sort works for empty array", () => {
    expect(shellSort([])).toEqual([])
})

test("shell sort works for one element array", () => {
    expect(shellSort([1])).toEqual([1])
})

test("shell sort works", () => {
    let randomNumberFrom1To100 = () => Math.floor(Math.random() * 100) + 1
    let unsorted = []
    for (let i = 0; i < 100; i++) {
        unsorted.push(randomNumberFrom1To100())
    }
    let sorted = unsorted.sort()
    let shellSorted = shellSort(unsorted)
    expect(shellSorted).toEqual(sorted)
})