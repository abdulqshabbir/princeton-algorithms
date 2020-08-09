import { selectionSort } from './SelectionSort'

test("selection sort works", () => {
    let randomNumberFrom1To100 = () => Math.floor(Math.random() * 100) + 1
    let unsorted = []
    for (let i = 0; i < 20; i++) {
        unsorted.push(randomNumberFrom1To100())
    }
    let sorted = unsorted.sort()
    let sortedWithSelectionSort = selectionSort(unsorted)
    expect(sorted).toEqual(sortedWithSelectionSort)
})