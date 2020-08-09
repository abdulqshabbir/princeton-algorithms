/*
*/

import { swap } from "./SelectionSort"

export function shellSort(arr: number[]) {
    let gaps = [701, 301, 132, 57, 23, 10, 4, 1]

    for (let gap of gaps) {
        if (gap < arr.length) {
            arr = hSort(arr, gap)
        }
    }
    return arr
}

export function hSort(arr: number[], gap: number) {
    //An array is h - sorted if, starting anywhere, every hth element forms a sorted subsequence

    let i = 0              // let i represent the ith iteration
    let end = i + gap      // let end be a reference for when hSort reaches the end of the array

    while (end < arr.length) {
        for (let j = i + gap; j - gap >= 0; j = j - gap) {
            if (arr[j - gap] > arr[j]) {
                swap(j - gap, j, arr)
            }
        }
        i = i + 1
        end = end + 1
    }
    return arr
}