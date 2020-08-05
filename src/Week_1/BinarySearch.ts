/*
    Given a sorted array and a key, find the index of the array
    entry that matches the key.
    
    If key cannot be found, return null.
*/

function binarySearch(arr: number[], key: number, low: number = 0, hi: number = arr.length - 1): number | null {
    let mid = Math.floor((low + hi) / 2)

    if (key === arr[mid]) {
        return mid
    }
    if (low === mid || hi === mid) {
        return null
    }
    if (key < arr[mid]) {
        return binarySearch(arr, key, low, mid - 1)
    }
    if (key > arr[mid]) {
        return binarySearch(arr, key, mid + 1, hi)
    }
    return null
}
