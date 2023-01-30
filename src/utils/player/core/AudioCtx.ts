const AudioCtx = (): AudioContext => {
    const Context = window.AudioContext || window.webkitAudioContext
    if (!Context) {
        throw new Error("Your browser doesn't support AudioContext")
    }
    return new Context()
}

const getArrayBuffer = (source: URL | string): Promise<AudioBuffer> => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        xhr.open('GET', source, true)
        xhr.responseType = 'arraybuffer'
        xhr.onload = () => {
            AudioCtx().decodeAudioData(xhr.response, buffer => {
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
