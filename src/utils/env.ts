export const Env = (key: string) => {
  if (process) {
    if (key in process.env) {
      return process.env[key];
    }
  }
  if (import.meta.env) {
    if (key in import.meta.env) {
      return import.meta.env[key];
    }
  }
  return "";
};
