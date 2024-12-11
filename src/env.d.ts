/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface Window {
    Alpine: import('alpinejs').Alpine;
  }

interface ImportMetaEnv {
  readonly PUBLIC_HF_TOKEN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}