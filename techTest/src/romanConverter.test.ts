import { arabicToRoman } from "./romanConverter";

describe("arabicToRoman", () => {
  test("converts arabic numbers to roman numerals", () => {
    expect(arabicToRoman(1)).toBe("I");
    expect(arabicToRoman(3)).toBe("III");
    expect(arabicToRoman(4)).toBe("IV");
    expect(arabicToRoman(9)).toBe("IX");
    expect(arabicToRoman(58)).toBe("LVIII");
    expect(arabicToRoman(1994)).toBe("MCMXCIV");
    expect(arabicToRoman(2023)).toBe("MMXXIII");
    expect(arabicToRoman(3999)).toBe("MMMCMXCIX");
  });

  test("throws an error for non-positive integers", () => {
    expect(() => arabicToRoman(0)).toThrow(
      "Input should be a positive whole number and greater than or equal to 1"
    );
  });

  test("throws an error for non-integer numbers", () => {
    expect(() => arabicToRoman(2.5)).toThrow(
      "Input should be a positive whole number and greater than or equal to 1"
    );
  });
});
