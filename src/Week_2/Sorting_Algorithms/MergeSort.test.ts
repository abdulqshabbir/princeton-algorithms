import { mergeSort } from './MergeSort'

test("merge sort works for empty array", () => {
    expect(mergeSort([])).toEqual([])
})

test("merge sort works for one element array", () => {
    expect(mergeSort([1])).toEqual([1])
})

test("merge sort works for random array", () => {
    let randomNumberFrom1To100 = () => Math.floor(Math.random() * 100) + 1
    let unsorted = []
    for (let i = 0; i < 100; i++) {
        unsorted.push(randomNumberFrom1To100())
    }
    let sorted = unsorted.sort()
    let mergeSorted = mergeSort(unsorted)
    expect(mergeSorted).toEqual(sorted)
})