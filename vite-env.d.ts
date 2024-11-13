interface ImportMetaEnv {
  readonly VITE_WEBHOOK_URL: string;
  readonly VITE_APIGATEWAY_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
