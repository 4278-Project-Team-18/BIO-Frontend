/**
 * Sets a value of any type to local storage
 *
 * @param key - The key to set the value to
 * @param value - The value to set
 */
export const setValueToLocalStorage = <T>(key: string, value: T) => {
  localStorage.setItem(key, JSON.stringify(value));
};

/**
 * Gets a value of any type from local storage
 *
 * @param key - The key to get the value from
 * @returns  The value from local storage
 */
export const getValueFromLocalStorage = (key: string): string | undefined => {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : undefined;
};

/**
 * Removes a value from local storage
 *
 * @param key - The key to remove from local storage
 */
export const removeValueFromLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};
