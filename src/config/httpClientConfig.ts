import { Options } from "ky";
import { Env } from "#utils/env.util.ts";

export const HttpClientConfig: Options = {
  retry: 0,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  prefixUrl: Env("NXT_API_BASE_URL")
    .toString()
};
