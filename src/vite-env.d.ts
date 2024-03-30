/// <reference types="vite/client" />
/// <reference types="@testing-library/jest-dom" />

interface ImportMetaEnv {
    readonly VITE_WEATHER_API_KEY: string
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }