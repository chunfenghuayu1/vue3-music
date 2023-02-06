const AudioCtx = (): AudioContext => {
    const Context = window.AudioContext || window.webkitAudioContext
    if (!Context) {
        throw new Error("Your browser doesn't support AudioContext")
    }
    return new Context()
}

const getArrayBuffer = (source: URL | string | Uint8Array): Promise<AudioBuffer> => {
    return new Promise((resolve, reject) => {
        if (source instanceof Uint8Array) {
            AudioCtx()
                .decodeAudioData(source.buffer)
                .then(buffer => {
                    if (!buffer) {
                        return
                    } else {
                        resolve(buffer)
                    }
                })
            return
        }

        const xhr = new XMLHttpRequest()
        xhr.open('GET', source, true)
        xhr.responseType = 'arraybuffer'
        xhr.onload = () => {
            AudioCtx()
                .decodeAudioData(xhr.response)
                .then(buffer => {
                    if (!buffer) {
                        return
                    } else {
                        resolve(buffer)
                    }
                })
        }
        xhr.onerror = e => {
            reject(e)
        }
        xhr.send()
    })
}

export default getArrayBuffer
