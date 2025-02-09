/**
 * Compares two arrays for equality.
 *
 * This function takes two arrays of the same type and compares them element by element.
 * It returns `true` if both arrays have the same length and all corresponding elements
 * are strictly equal (using the `===` operator). Otherwise, it returns `false`.
 *
 * @param arr1 - The first array to compare.
 * @param arr2 - The second array to compare.
 * @returns A boolean indicating whether the two arrays are equal.
 */
export function compareArrays<T>(arr1: T[], arr2: T[]): boolean {
  if (arr1.length !== arr2.length) return false;
  return arr1.every((element, index) => element === arr2[index]);
}
