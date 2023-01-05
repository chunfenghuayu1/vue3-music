import { setLocal } from '@/utils/localStorage.js'
import type { PiniaPluginContext } from 'pinia'

export default ({ store, options }: PiniaPluginContext): void => {
    if (options.persist?.enable) {
        store.$subscribe(() => {
            setLocal('settings', store.settings)
            setLocal('data', store.data)
        })
    }
}
