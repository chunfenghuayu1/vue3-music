/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly VITE_APP_TITLE: string
    readonly VITE_MODE_NAME: string
    readonly VITE_APP_BASE_API: string
    readonly VITE_APP_IS_ELECTRON: boolean
}
interface ImportMeta {
    readonly env: ImportMetaEnv
}
