/// <reference types="vite/client" />

export interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly CI: boolean;
  readonly NXT_API_BASE_URL: string;
  readonly NODE_ENV: "production" | "developement";
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
