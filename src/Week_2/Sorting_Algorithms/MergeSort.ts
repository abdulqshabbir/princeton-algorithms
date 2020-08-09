export function merge(arr: number[], low: number, mid: number, hi: number) {
    /*
        pre-condition: arr[0...mid] and arr[mid + 1... hi] must be sorted subarrays
    */
    debugger;
    let aux = []

    for (let k = 0; k < arr.length; k++) {
        aux[k] = arr[k]
    }

    for (let k = 0; k < arr.length; k++) {
        let i = 0
        let j = mid + 1

        if (i > mid) {
            arr[k] = aux[j]
            j++
        } else if (j > hi) {
            arr[k] = aux[i]
            i++
        } else if (arr[i] <= arr[j]) {
            arr[k] = aux[i]
            i++
        } else {
            arr[k] = aux[j]
            j++
        }
    }
    return arr
}

console.log(merge([1, 3, 5, 6, 7, 10], 0, 2, 5))