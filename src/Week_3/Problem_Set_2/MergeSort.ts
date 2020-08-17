import { Point } from './Point'
export function merge(arr: Point[], low: number, mid: number, hi: number) {
    /*
        pre-condition: a[0...mid] and a[mid + 1... hi] are two sorted sublists
    */
    let aux: Point[] = []
    let i: number, j: number, k: number
    // i will be an index into the arr from low to mid
    // j will be an index into the arr from mid + 1 to hi
    // k will be an index into arr and all elements arr[low] ... a[hi] will be sorted in place

    for (let m = low; m <= hi; m++) {
        // copy entries of arr[low..hi] to aux.  We will use aux entries to make comparisons for merging in the correct order.
        aux[m] = arr[m]
    }

    i = low
    j = mid + 1
    k = low
    while (i <= mid || j <= hi) {
        // WHILE i or j are valid indices
        if (i > mid) {
            // i is not a valid index meaning entries from low .. mid have already been added
            arr[k++] = aux[j++]
        }
        else if (j > hi) {
            // j is not a valid index meaning entries from mid + 1 ... hi have been added
            arr[k++] = aux[i++]
        }
        else if (aux[i] <= aux[j]) {
            arr[k++] = aux[i++]
        } else {
            arr[k++] = aux[j++]
        }
    }
    return arr
}
export function mergeSort(arr: Point[], low: number = 0, hi: number = arr.length - 1) {
    if (low < hi) {
        // list is at least of size 2. Solve big problem by breaking it into halves
        let mid = Math.floor((low + hi) / 2)

        mergeSort(arr, low, mid)
        mergeSort(arr, mid + 1, hi)
        return merge(arr, low, mid, hi)
    } else {
        return arr
    }
}