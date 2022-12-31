import explore from '@/utils/localData'
import type { tags } from '@/utils/localData'
const activeTags = explore.tags.filter((item: tags) => item.hot === true).map(item => item.name)

export interface settings {
    activeTags: string[]
}
export interface data {
    loginMode: string
    user: {}
}

interface localStore {
    data: data
    settings: settings
}

const localStore: localStore = {
    data: {
        loginMode: '',
        user: {}
    },
    settings: {
        activeTags
    }
}

export default localStore
