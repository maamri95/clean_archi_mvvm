export const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export const deCapitalize = (str: string) => {
    return str.charAt(0).toLowerCase() + str.slice(1);
}

export const camelCase = (str: string) => {
    return deCapitalize(str.split(/[-_]/).map(capitalize).join(''));
}

export const pascalCase = (str: string) => {
    return str.split(/[-_]/).map(capitalize).join('');
}

export const snakeCase = (str: string) => {
    return str.split(/(?=[A-Z])/).join('_').toLowerCase();
}

export const kebabCase = (str: string) => {
    return str.split(/(?=[A-Z])/).join('-').toLowerCase();
}

export const toUpper = (str: string) => {
    return str.toUpperCase();
}

export const toLower = (str: string) => {
    return str.toLowerCase();
}

