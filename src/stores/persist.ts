import { setLocal } from '@utils/localStorage'
import type { PiniaPluginContext } from 'pinia'

import { useMyAPI } from '@utils/electron/myAPI'
const { handleStore } = useMyAPI()

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
