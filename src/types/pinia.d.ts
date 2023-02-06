import 'pinia'
interface persist {
    enable: Boolean
}
declare module 'pinia' {
    export interface DefineStoreOptionsBase {
        persist?: persist
    }
}
