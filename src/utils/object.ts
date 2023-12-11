/**
 * Transforms a flat object with dot-separated keys into a nested object.
 *
 * Given an input object with keys containing dots to indicate nested levels,
 * this function reconstructs the hierarchy and returns a new object with nested
 * keys and values.
 *
 * @param {Record<any, any>} obj - The input object to be unflattened.
 * @param {string} separator - The separator used to indicate nesting (default: ".").
 * @returns {Record<any, any>} A new object with nested keys and values.
 *
 * @example
 * const input = {
 *   "name": "John",
 *   "details.age": 30,
 *   "details.address": "123 Main St"
 * };
 *
 * const output = unFlattenObject(input);
 * console.log(output);
 * // Output: {
 * //   "name": "John",
 * //   "details": {
 * //     "age": 30,
 * //     "address": "123 Main St"
 * //   }
 * // }
 */
export const unFlattenObject = (
  obj: Record<any, any>,
  separator: string = ".",
): Record<any, any> => {
  const result: Record<any, any> = {};

  for (const [key, value] of Object.entries(obj)) {
    const keys = key.split(separator);
    let current = result;

    for (let i = 0; i < keys.length; i++) {
      const k = keys[i];

      if (i === keys.length - 1) {
        current[k] = value;
      } else {
        current[k] = current[k] || {};
        current = current[k];
      }
    }
  }

  return result;
};

/**
 * Serializes an object into a URL query string.
 *
 * Converts an input object into a URL-encoded query string. If a property's value
 * is an object, the function generates key-value pairs using bracket notation.
 * Non-object values are converted to key-value pairs as is.
 *
 * @param {Record<any, any>} obj - The input object to be serialized.
 * @returns {string} A URL-encoded query string.
 *
 * @example
 * const input = {
 *   name: "John",
 *   age: 30,
 *   address: {
 *     city: "Paris",
 *     street: "123 Main St"
 *   }
 * };
 *
 * const output = serializeObjectToQueryString(input);
 * console.log(output);
 * // Output: "name=John&age=30&address[city]=Paris&address[street]=123 Main St"
 */
export const serializeObjectToQueryString = (obj: Record<any, any>): string => {
  const result: string[] = [];
  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] === "object") {
      Object.keys(obj[key]).forEach((key2) => {
        result.push(`${key}[${key2}]=${obj[key][key2]}`);
      });
    } else {
      result.push(`${key}=${obj[key]}`);
    }
  });
  return result.join("&");
};

/**
 * Converts keys in an flatten object from dot notation to bracket notation.
 *
 * This function takes an input flatten object and transforms its keys from dot notation
 * (e.g., "user.name") to bracket notation (e.g., "user[name]"). This is often
 * used for serializing objects to URL query parameters.
 *
 * @param {Record<any, any>} obj - The input object with keys in dot notation.
 * @returns {Record<string, any>} A new object with keys converted to bracket notation.
 *
 * @example
 * const input = {
 *   "user.name": "John",
 *   "user.age": 30
 * };
 *
 * const output = convertDotNotationToBracketNotation(input);
 * console.log(output);
 * // Output: {
 * //   "user[name]": "John",
 * //   "user[age]": 30
 * // }
 */
export const convertDotNotationToBracketNotation = (
  obj: Record<any, any>,
): Record<string, any> => {
  const result: Record<string, any> = {};
  Object.keys(obj).forEach((key) => {
    const keys = key.split(".");
    if (keys.length > 1) {
      const key1 = keys[0];
      const subKeys = keys.slice(1);
      const key2 = subKeys.join("][");
      result[`${key1}[${key2}]`] = obj[key];
    } else {
      result[key] = obj[key];
    }
  });
  return result;
};
/**
 * Converts keys in an flatten object from bracket notation to dot notation.
 * This function takes an input flatten object and transforms its keys from bracket notation
 * (e.g., "user[name]") to dot notation (e.g., "user.name"). This is often
 * used for serializing objects to URL query parameters.
 * @param {Record<any, any>} obj - The input object with keys in bracket notation.
 * @returns {Record<string, any>} A new object with keys converted to dot notation.
 * @example
 * const input = {
 *  "user[name]": "John",
 *  "user[age]": 30
 *  };
 *  const output = convertBracketNotationToDotNotation(input);
 *  console.log(output);
 *  // Output: {
 *  //   "user.name": "John",
 *  //   "user.age": 30
 *  // }
 */
export const convertBracketNotationToDotNotation = (
  obj: Record<string, any>,
): Record<string, any> => {
  const result: Record<string, any> = {};
  Object.keys(obj).forEach((key) => {
    const keys = key.split("[");
    if (keys.length > 1) {
      const key1 = keys[0];
      const subKeys = keys.slice(1);
      const key2 = subKeys.join(".").replace("]", "");
      result[`${key1}.${key2}`] = obj[key];
    } else {
      result[key] = obj[key];
    }
  });
  return result;
};

/**
 * Flattens a nested object into a single-level object with dot-separated keys.
 *
 * This function takes an input object that may have nested structures and
 * returns a new object where all keys are at the top level, with dot notation
 * used to indicate nesting (e.g., "user.name" instead of {user: {name: "John"}}).
 *
 * @param {Record<any, any>} obj - The input object to be flattened.
 * @param {string} separator - The separator used to indicate nesting (default: ".").
 * @returns {Record<string, any>} A new object with nested keys flattened to top level.
 *
 * @example
 * const input = {
 *   user: {
 *     name: "John",
 *     age: 30,
 *     address: {
 *       city: "Paris",
 *       street: "123 Main St"
 *     }
 *   }
 * };
 *
 * const output = flattenObject(input);
 * console.log(output);
 * // Output: {
 * //   "user.name": "John",
 * //   "user.age": 30,
 * //   "user.address.city": "Paris",
 * //   "user.address.street": "123 Main St"
 * // }
 */
export const flattenObject = (
  obj: Record<any, any>,
  separator: string = ".",
): Record<string, any> => {
  const result: Record<string, any> = {};
  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] === "object") {
      const subObj = flattenObject(obj[key]);
      Object.keys(subObj).forEach((subKey) => {
        result[`${key}${separator}${subKey}`] = subObj[subKey];
      });
    } else {
      result[key] = obj[key];
    }
  });
  return result;
};

/**
 * Flattens a nested object into a single-level object with bracket notation.
 *
 * This function takes an input object that may have nested structures and
 * returns a new object where all keys are at the top level, with bracket notation
 * used to indicate nesting (e.g., "user[name]" instead of {user: {name: "John"}}).
 *
 * @param {Record<any, any>} obj - The input object to be flattened.
 * @param parentKey
 * @returns {Record<string, any>} A new object with nested keys flattened to top level.
 * @example
 * const input = {
 *    user: {
 *      name: "John",
 *      age: 30,
 *      address: {
 *        city: "Paris",
 *        street: "123 Main St"
 *      }
 *    }
 *  };
 *  const output = flattenObject(input);
 *  console.log(output);
 *  // Output: {
 *  //   "user[name]": "John",
 *  //   "user[age]": 30,
 *  //   "user[address][city]": "Paris",
 */
export const flattenObjectWithBracketNotation = (
  obj: Record<any, any>,
  parentKey: string = "",
): Record<string, any> => {
  const result: Record<string, any> = {};
  Object.keys(obj).forEach((key) => {
    // Construire la nouvelle clé en prenant en compte la clé parente
    const newKey = parentKey ? `${parentKey}[${key}]` : key;

    if (typeof obj[key] === "object" && obj[key] !== null) {
      // Fusionner les résultats de l'appel récursif
      Object.assign(result, flattenObjectWithBracketNotation(obj[key], newKey));
    } else {
      result[newKey] = obj[key];
    }
  });
  return result;
};
