const testBinarySearch = require("./BinarySearch")

test("Returns null for empty array", () => {
  expect(testBinarySearch([], 3)).toBe(null);
});
test("Returns correct key for an odd  array", () => {
  expect(testBinarySearch([1, 3, 5, 9, 10], 3)).toBe(1);
});
test("Returns correct key for an even array", () => {
  expect(testBinarySearch([1, 3, 5, 8, 9, 10], 9)).toBe(4);
});
test("Returns null for key not in array", () => {
  expect(testBinarySearch([1, 3, 5, 9, 10], 9)).toBe(3);
});