export function merge(arr: number[], low: number, mid: number, hi: number) {
    /*
        pre-condition: a[0...mid] and a[mid + 1... hi] are two sorted sublists
    */
    let aux: number[] = []
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
        // WHILE i and j are valid indices
        if (i > mid) {
            // i is not a valid index meaning entries from low .. mid have already been added
            arr[k++] = aux[j++]
        }
        else if (j > hi) {
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