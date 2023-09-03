/// <reference types="vite/client" />

export interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly CI: boolean;
  readonly apiUrl: string;
  readonly NODE_ENV: "production" | "developement";
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
