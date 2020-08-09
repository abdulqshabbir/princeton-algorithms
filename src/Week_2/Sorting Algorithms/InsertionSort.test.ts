import { insertionSort } from './InsertionSort'

test("insertion sort works for empty array", () => {
    expect(insertionSort([])).toEqual([])
})
test("insertion sort works for array of size 1", () => {
    expect(insertionSort([1])).toEqual([1])
})
test("insertion sort works for randomly generated array", () => {
    let randomNumberFrom1To100 = () => Math.floor(Math.random() * 100) + 1
    let unsorted = []
    for (let i = 0; i < 20; i++) {
        unsorted.push(randomNumberFrom1To100())
    }
    let sorted = unsorted.sort()
    let sortedWithInsertionSort = insertionSort(unsorted)
    expect(sortedWithInsertionSort).toEqual(sorted)
})