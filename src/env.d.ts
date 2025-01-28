/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface Window {
  HF_TOKEN: string;
}

interface ImportMetaEnv {
  readonly PUBLIC_HF_TOKEN: string;
  readonly [key: string]: any;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}