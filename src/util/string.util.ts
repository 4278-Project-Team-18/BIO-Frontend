/**
 * Capitalize the first letter of a string.
 *
 * @param str The string to capitalize.
 * @returns The capitalized string.
 */
export const capitalize = (str: string): string =>
  str.charAt(0).toUpperCase() + str.slice(1);
