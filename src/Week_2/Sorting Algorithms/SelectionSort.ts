/*
    Selection sort pseudocode: 
    FOR i = 0 to n = N - 1: 
        find minimum entry in array from i to N - 1
        swap min entry with entry in position i

    worst case: O(n^2)
    best case: O(n^2)
    average case: O(n^2)
*/

export function selectionSort(arr: number[]) {
    for (let i = 0; i < arr.length; i++) {
        let minIdx = findMinIndex(i, arr.length - 1, arr)
        swap(minIdx, i, arr)
    }
    return arr
}

function findMinIndex(indexA: number, indexB: number, arr: number[]) {
    let min = arr[indexA]
    let minIdx = indexA

    for (let i = indexA; i <= indexB; i++) {
        if (arr[i] < min) {
            min = arr[i]
            minIdx = i
        }
    }
    return minIdx
}

export function swap(indexA: number, indexB: number, arr: number[]) {
    let temp = arr[indexA]
    arr[indexA] = arr[indexB]
    arr[indexB] = temp
}