import { memoize } from "./memoizer";

// An expensive calculation function for testing.
function expensiveCalculation(a: number, b: number): number {
  let result = 0;
  for (let i = 0; i < 100000000; i++) {
    result += a * b + i;
  }
  return result;
}

describe("memoize", () => {
  it("returns the correct result", () => {
    const memoizedExpensiveCalculation = memoize(expensiveCalculation);

    const result1 = memoizedExpensiveCalculation(1, 2);
    const result2 = expensiveCalculation(1, 2);

    expect(result1).toEqual(result2);
  });

  it("returns cached results for previously computed arguments", () => {
    const memoizedExpensiveCalculation = memoize(expensiveCalculation);

    const t1 = performance.now();
    const result1 = memoizedExpensiveCalculation(1, 2);
    const t2 = performance.now();
    const result2 = memoizedExpensiveCalculation(1, 2);
    const t3 = performance.now();

    // console.log(`First call took ${t2 - t1} ms`);
    // console.log(`Second call took ${t3 - t2} ms`);

    // Check that the results are correct.
    expect(result1).toEqual(result2);

    // Check that the second call was faster than the first.
    // This is because the result was cached and returned immediately.
    expect(t2 - t1).toBeGreaterThan(t3 - t2);
  });
});
