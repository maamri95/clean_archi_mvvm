import type { ImportMetaEnv } from "../vite-env";
export const Env = (key: keyof ImportMetaEnv) => {
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
