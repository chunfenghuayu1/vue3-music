import explore from '@utils/localData'
import type { tags } from '@utils/localData'
import Player from '@utils/player'
const activeTags = explore.tags.filter((item: tags) => item.hot === true).map(item => item.name)

export interface settings {
    theme: 'light' | 'dark'
    exitType: 'confirm' | 'minimize' | 'quit'
    unlockMusic: boolean
    expire: number
    switchPlayer: string
}
export interface user {
    userId: number
    avatarUrl: string
    nickname: string
}
export interface data {
    loginMode: string
    user: user
    activeTags: string[]
}

interface localStore {
    data: data
    settings: settings
    player: any
}

const localStore: localStore = {
    data: {
        loginMode: '',
        user: {
            userId: 0,
            avatarUrl: '',
            nickname: ''
        },
        activeTags
    },
    settings: {
        theme: 'dark',
        exitType: 'confirm',
        unlockMusic: true,
        expire: 7,
        switchPlayer: '底部'
    },
    player: {}
}

export default localStore
