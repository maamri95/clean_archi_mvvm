/**
 * debounce function to prevent multiple calls in a short time period (e.g. 100ms) to the same function (e.g. API call)
 * @example
 * const debouncedFunction = debounce(() => console.log("Hello World"), 100);
 * debouncedFunction();
 * debouncedFunction();
 * debouncedFunction();
 * // Output: "Hello World"
 * @param {CallableFunction} fn - The function to debounce (e.g. API call)
 * @param {number} delay - The delay in milliseconds (e.g. 100ms)
 */
export const debounce = (fn: CallableFunction, delay: number) => {
  let timer: any;
  const debounceFn = (...args: any) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
  return debounceFn;
};

/**
 * throttle function to prevent multiple calls in a short time period (e.g. 100ms) to the same function (e.g. API call)
 * @example
 * const throttledFunction = throttle(() => console.log("Hello World"), 100);
 * throttledFunction();
 * throttledFunction();
 * throttledFunction();
 * // Output: "Hello World"
 * @param fn - The function to throttle (e.g. API call)
 * @param delay - The delay in milliseconds (e.g. 100ms)
 */
export const throttle = (fn: CallableFunction, delay: number) => {
  let lastCall = 0;
  return (...args: any) => {
    const now = new Date().getTime();
    if (now - lastCall < delay) {
      return;
    }
    lastCall = now;
    return fn(...args);
  };
};

export function changeFavicon(src: string) {
  const link =
    document.querySelector<HTMLLinkElement>("link[rel*='icon']") ||
    document.createElement("link");
  link.type = "image/x-icon";
  link.rel = "shortcut icon";
  link.href = src;

  // Ajouter ou remplacer le lien dans le <head>
  document.getElementsByTagName("head")[0].appendChild(link);
}

export function changePageTitle(title: string) {
  document.title = title;
}

export function changePageDescription(description: string) {
  const meta =
    document.querySelector<HTMLMetaElement>("meta[name='description']") ||
    document.createElement("meta");
  meta.name = "description";
  meta.content = description;

  // Ajouter ou remplacer le meta dans le <head>
  document.getElementsByTagName("head")[0].appendChild(meta);
}
