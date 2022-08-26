import { setLocal } from '@/utils/localStorage.js'

export default ({ store, options }) => {
    // const { enable } =
    if (options.persist?.enable) {
        store.$subscribe(() => {
            setLocal('settings', store.settings)
            setLocal('data', store.data)
        })
    }
}
