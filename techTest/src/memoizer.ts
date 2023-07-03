/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * A type representing a function with any number and type of arguments, and any return type.
 *
 * @template T The type of the function's arguments, represented as an array.
 * @template R The type of the function's return value.
 */
type Func<T extends any[], R> = (...args: T) => R;

/**
 * Creates a memoized version of the provided function.
 *
 * A memoized function remembers the results of previous calls with the same arguments,
 * and returns the remembered result instead of computing the result again.
 *
 * IMPORTANT: The memoized function only works if the arguments are serializable with JSON.stringify.
 *
 * @param {Func<T, R>} func The function to memoize.
 * @returns {Func<T, R>} The memoized version of the function.
 *
 * @template T The type of the function's arguments, represented as an array.
 * @template R The type of the function's return value.
 */
export function memoize<T extends any[], R>(func: Func<T, R>): Func<T, R> {
  // Cache for remembering results of previous function calls.
  const cache: Map<string, R> = new Map();

  /**
   * The memoized version of the function.
   *
   * When called, it checks if the result for the given arguments is in the cache.
   * If yes, it returns the cached result.
   * If not, it calls the original function, stores the result in the cache, and returns the result.
   *
   * @param {...T} args The function's arguments.
   * @returns {R} The function's result.
   */
  return (...args: T): R => {
    // Convert arguments to a string to use as a cache key.
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      // If the result for these arguments is in the cache, return it.
      return cache.get(key) as R;
    }

    // If the result for these arguments is not in the cache, compute it.
    const result = func(...args);

    // Store the computed result in the cache.
    cache.set(key, result);

    // Return the computed result.
    return result;
  };
}
