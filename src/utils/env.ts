export const Env = (key: string) => {
  try{
     if (process) {
    if (key in process.env) {
      return process.env[key];
    }
  }
  }catch(e) { /* empty */ }
 
  if (import.meta.env) {
    if (key in import.meta.env) {
      return import.meta.env[key];
    }
  }
  return "";
};
