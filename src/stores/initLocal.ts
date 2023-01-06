import explore from '@/utils/localData'
import type { tags } from '@/utils/localData'
const activeTags = explore.tags.filter((item: tags) => item.hot === true).map(item => item.name)

export interface settings {
    activeTags: string[]
}
export interface user {
    userId: number
    avatarUrl: string
    nickname: string
}
export interface data {
    loginMode: string
    user: user
}

interface localStore {
    data: data
    settings: settings
}

const localStore: localStore = {
    data: {
        loginMode: '',
        user: {
            userId: 0,
            avatarUrl: '',
            nickname: ''
        }
    },
    settings: {
        activeTags
    }
}

export default localStore