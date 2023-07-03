/**
 * Map of arabic numbers to roman numerals.
 */
const arabicToRomanMap = new Map<number, string>([
  [1, "I"],
  [4, "IV"],
  [5, "V"],
  [9, "IX"],
  [10, "X"],
  [40, "XL"],
  [50, "L"],
  [90, "XC"],
  [100, "C"],
  [400, "CD"],
  [500, "D"],
  [900, "CM"],
  [1000, "M"],
]);

/**
 * Values to be replaced by roman numerals in the order to be replaced.
 */
const romanNumeralsReplacementOrder: number[] = Array.from(
  arabicToRomanMap.keys()
).sort((a, b) => b - a);

/**
 * Convert an arabic number to roman numerals.
 *
 * @param arabicNumber - A positive whole number (greater than or equal to 1)
 *
 * @returns A string representing the roman numeral equivalent of the input number
 *
 * @throws {Error} Throws an error if the input is not a positive whole number or less than 1
 */
export function arabicToRoman(arabicNumber: number): string {
  // Validate input
  if (arabicNumber < 1 || !Number.isInteger(arabicNumber)) {
    throw new Error(
      "Input should be a positive whole number and greater than or equal to 1"
    );
  }

  let romanNumerals = "";

  // Iteratively subtract the highest possible arabic number and append corresponding roman numeral
  for (const currentHighestReplacementValue of romanNumeralsReplacementOrder) {
    while (arabicNumber >= currentHighestReplacementValue) {
      romanNumerals += arabicToRomanMap.get(currentHighestReplacementValue);
      arabicNumber -= currentHighestReplacementValue;
    }
  }

  return romanNumerals;
}
