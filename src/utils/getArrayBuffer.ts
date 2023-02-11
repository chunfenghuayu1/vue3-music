const AudioCtx = (): AudioContext => {
    const Context = window.AudioContext || window.webkitAudioContext
    if (!Context) {
        throw new Error("Your browser doesn't support AudioContext")
    }
    return new Context()
}

const getArrayBuffer = (source: string | Uint8Array): Promise<string> => {
    return new Promise((resolve, reject) => {
        if (source instanceof Uint8Array) {
            const res = URL.createObjectURL(new Blob([source]))
            resolve(res)
            return
        }

        const xhr = new XMLHttpRequest()
        xhr.open('GET', source, true)
        xhr.responseType = 'arraybuffer'
        xhr.onload = () => {
            const res = URL.createObjectURL(new Blob([xhr.response]))
            resolve(res)
        }
        xhr.onerror = e => {
            reject(e)
        }
        xhr.send()
    })
}

export default getArrayBuffer
