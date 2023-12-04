/**
 * Capitalize the first letter of a string.
 *
 * @param str The string to capitalize.
 * @returns The capitalized string.
 */
export const capitalize = (str: string): string =>
  str.charAt(0).toUpperCase() + str.slice(1);

/**
 * Convert a list of names to one string with commas and "and".
 *
 * @param names The list of names.
 * @returns The string with commas and "and".
 */
export const listOfNames = (names: string[]): string => {
  if (names.length === 0) return "";
  if (names.length === 1) return names[0];
  if (names.length === 2) return `${names[0]} and ${names[1]}`;
  return `${names.slice(0, -1).join(", ")}, and ${names.slice(-1)}`;
};

/**
 * Shorten a string to a certain length or add an ellipsis if it's too long.
 *
 * @param str The string to shorten.
 * @param length The length to shorten the string to.
 * @returns The shortened string.
 */
export const shortenString = (str: string, length: number): string => {
  if (str.length <= length) return str.trim();
  return `${str.trim().slice(0, length)}...`;
};
