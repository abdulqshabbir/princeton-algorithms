import { swap } from './SelectionSort'

export function insertionSort(arr: number[]) {
    // let i be the parition between the sorted and unsorted halves
    // At the end of the ith iteration the array up until index i should be sorted

    for (let i = 0; i < arr.length; i++) {
        let j = i
        // WHILE the element to the left exists and is larger
        while (arr[j - 1] > arr[j] && j > 0) {
            swap(j, j - 1, arr)
            j--
        }
    }
    return arr
}