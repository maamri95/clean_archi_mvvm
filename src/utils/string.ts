import pluralizeLib from "pluralize";
/**
 * Capitalize the first letter of a string
 * @param {string} str - The input string
 * @returns {string} The input string with the first letter capitalized
 * @example
 * const input = "john";
 * const output = capitalize(input);
 * console.log(output);
 * // Output: "John"
 */
export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
/**
 * Decapitalize the first letter of a string
 * @param {string} str - The input string
 * @returns {string} The input string with the first letter decapitalized
 * @example
 * const input = "John";
 * const output = deCapitalize(input);
 * console.log(output);
 * // Output: "john"
 */
export const deCapitalize = (str: string): string => {
  return str.charAt(0).toLowerCase() + str.slice(1);
};
/**
 * Convert a string to camelCase
 * @param {string} str - The input string
 * @returns {string} The input string converted to camelCase
 * @example
 * const input = "john-doe";
 * const output = camelCase(input);
 * console.log(output);
 * // Output: "johnDoe"
 * @example
 * const input = "john_doe";
 * const output = camelCase(input);
 * console.log(output);
 * // Output: "johnDoe"
 * @example
 * const input = "john doe";
 * const output = camelCase(input);
 * console.log(output);
 * // Output: "johnDoe"
 */
export const camelCase = (str: string): string => {
  return deCapitalize(str.split(/[-_]/).map(capitalize).join(""));
};

/**
 * Convert a string to PascalCase
 * @param {string} str - The input string
 * @returns {string} The input string converted to PascalCase
 * @example
 * const input = "john-doe";
 * const output = pascalCase(input);
 * console.log(output);
 * // Output: "JohnDoe"
 * @example
 * const input = "john_doe";
 * const output = pascalCase(input);
 * console.log(output);
 * // Output: "JohnDoe"
 * @example
 * const input = "john doe";
 * const output = pascalCase(input);
 * console.log(output);
 * // Output: "JohnDoe"
 * @example
 * const input = "johnDoe";
 * const output = pascalCase(input);
 * console.log(output);
 * // Output: "JohnDoe"
 */
export const pascalCase = (str: string): string => {
  return str.split(/[-_]/).map(capitalize).join("");
};

/**
 * Convert a string to snake_case
 * @param {string} str - The input string
 * @returns {string} The input string converted to snake_case
 * @example
 * const input = "JohnDoe";
 * const output = snakeCase(input);
 * console.log(output);
 * // Output: "john_doe"
 * @example
 * const input = "johnDoe";
 * const output = snakeCase(input);
 * console.log(output);
 * // Output: "john_doe"
 * @example
 * const input = "john-doe";
 * const output = snakeCase(input);
 * console.log(output);
 * // Output: "john_doe"
 * @example
 * const input = "john doe";
 * const output = snakeCase(input);
 * console.log(output);
 * // Output: "john_doe"
 * @example
 * const input = "John_doe";
 * const output = snakeCase(input);
 * console.log(output);
 * // Output: "john_doe"
 */
export const snakeCase = (str: string): string => {
  return str
    .split(/(?=[A-Z])/)
    .join("_")
    .toLowerCase();
};

/**
 * Convert a string to kebab-case
 * @param {string} str - The input string
 * @returns {string} The input string converted to kebab-case
 * @example
 * const input = "JohnDoe";
 * const output = kebabCase(input);
 * console.log(output);
 * // Output: "john-doe"
 * @example
 * const input = "johnDoe";
 * const output = kebabCase(input);
 * console.log(output);
 * // Output: "john-doe"
 * @example
 * const input = "john doe";
 * const output = kebabCase(input);
 * console.log(output);
 * // Output: "john-doe"
 * @example
 * const input = "John_doe";
 * const output = kebabCase(input);
 * console.log(output);
 * // Output: "john-doe"
 */
export const kebabCase = (str: string): string => {
  return str
    .split(/(?=[A-Z])/)
    .join("-")
    .toLowerCase();
};

/**
 * Convert a string to CONSTANT_CASE
 * @param {string} str - The input string
 * @returns {string} The input string converted to CONSTANT_CASE
 * @example
 * const input = "JohnDoe";
 * const output = constantCase(input);
 * console.log(output);
 * // Output: "JOHN_DOE"
 */
export const constantCase = (str: string): string => {
  return snakeCase(str).toUpperCase();
};

/**
 * Pluralize a string
 * @param {string} str - The input string
 * @returns {string} The input string pluralized
 * @example
 * const input = "person";
 * const output = pluralize(input);
 * console.log(output);
 * // Output: "people"
 * @example
 * const input = "person";
 * const output = pluralize(input);
 * console.log(output);
 * // Output: "people"
 */
export const pluralize = (str: string): string => {
  return pluralizeLib.plural(str);
};

/**
 * Singularize a string
 * @param {string} str - The input string
 * @returns {string} The input string singularized
 * @example
 * const input = "people";
 * const output = singularize(input);
 * console.log(output);
 * // Output: "person"
 */
export const singularize = (str: string): string => {
  return pluralizeLib.singular(str);
};
