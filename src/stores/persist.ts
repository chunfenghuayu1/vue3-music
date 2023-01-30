import { setLocal } from '@/utils/localStorage.js'
import type { PiniaPluginContext } from 'pinia'

import { handleStore } from '@/utils/myAPI'

export default ({ store, options }: PiniaPluginContext): void => {
    if (options.persist?.enable) {
        store.$subscribe(() => {
            setLocal('settings', store.settings)
            setLocal('data', store.data)
            setLocal('player', store.player)

            handleStore(JSON.stringify(store.settings))
        })
    }
}
