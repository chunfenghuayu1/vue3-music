import localData from '../utils/localData'

const activeTags = localData.explore.tags.filter(item => item.hot === true).map(item => item.name)

let localStorage = {
    data: {
        loginMode: '',
        user: {}
    },
    settings: {
        activeTags
    }
}

export default localStorage
