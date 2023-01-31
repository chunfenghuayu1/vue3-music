import getArrayBuffer from './core/AudioCtx'
import mp1 from '@/utils/player/1.mp3'
import mp2 from '@/utils/player/2.mp3'
import mp3 from '@/utils/player/3.mp3'
import mp4 from './4.flac'
import AudioCalss from './core/AudioClass'
import { getLocal } from '@/utils/localStorage'
/**
 * 切换音乐前需要销毁创建的音频实例
 * 避免内存空间占用/缓冲区冲突
 */
let timer: number
class Player {
    private _enable: boolean = false
    private _duration: number = 300
    private _index: number = 0
    private _playList: any[] = [mp1, mp2, mp3, mp4]
    private _playing: boolean = false
    private _currentTime: number = 0
    private _currentTrack: string = mp4
    private _volume: number = 0.3
    private _audio: AudioCalss | null = null
    private _buffer: AudioBuffer | null = null
    constructor() {
        this.setFromLocal()
        this.init()
        this._playing = false
        Object.defineProperty(this, '_buffer', {
            enumerable: false
        })
        Object.defineProperty(this, '_audio', {
            enumerable: false
        })
    }
    // 音频文件初始化
    private init() {
        this.cacheBuffer().then(() => {
            this.creatAudio()
            if (this._audio) {
                this.duration = this._audio.duration
            }
        })
    }
    // 缓冲音频文件
    async cacheBuffer(currentTrack: string = this._currentTrack) {
        const res = await getArrayBuffer(currentTrack)
        this._buffer = res
    }
    // 实例化音频
    private creatAudio(buffer = this._buffer) {
        this._audio = new AudioCalss({ buffer: buffer!, volume: this.volume })
    }
    // 刷新播放进度
    /**
     *  此处需要外部控制
     * @param flag 外部控制进度条拖动时避免干扰
     */
    public refreshTime(flag: boolean = false) {
        if (flag) {
            clearTimeout(timer)
            return
        }
        const { state, currentTime } = this._audio || {}
        if (state === 'closed') {
            clearTimeout(timer)
            this.nextOrPrePlay('next')
            return
        }

        if (this.playing) {
            clearTimeout(timer)
            timer = window.setTimeout(() => {
                this.currentTime = currentTime || 0
                this.refreshTime(flag)
            }, 1000)
        }
    }
    // 跳转播放
    public setPosition(value: number) {
        if (this._audio && this._audio.state !== 'closed') {
            this._audio?.close()
        }

        this.creatAudio()
        if (this._audio) {
            if (this.playing) {
                this._audio.play(value)
                this.refreshTime()
            }
        }
    }
    public play() {
        !this._enable && (this._enable = true)
        if (this._audio && this._audio.state !== 'closed') {
            this._audio.state === 'suspended'
                ? this._audio.resume()
                : this._audio.play(this.currentTime)
            this._playing = true
            this.refreshTime()
        }
    }
    public pause() {
        if (this._audio) {
            if (this._audio.state === 'closed') return
            this._audio.pause()
            this._playing = false
        }
    }
    public nextOrPrePlay(value: 'next' | 'pre') {
        if (value === 'next') {
            this._index = this._index === this._playList.length - 1 ? 0 : this._index + 1
        } else if (this._index !== 0) {
            this._index--
        } else if (this._index === 0) {
            this._index = this._playList.length - 1
        }

        this._currentTrack = this._playList[this._index]
        // 清空缓存
        this._buffer = null

        this.cacheBuffer().then(() => {
            if (this._audio && this._audio?.state !== 'closed') {
                this._audio.close()
            }
            this.creatAudio()
            if (this._audio) {
                this.duration = this._audio.duration
            }
            this.currentTime = 0
            this.play()
        })
    }
    private setFromLocal() {
        const player = getLocal('player')
        for (const [key, value] of Object.entries(player)) {
            // @ts-ignore
            this[key] = value
        }
    }
    // 更新数据库缓存
    public dbCacheReplace() {}
    get duration() {
        return this._duration
    }
    set duration(value: number) {
        this._duration = value
    }
    get currentTime() {
        return this._currentTime
    }
    set currentTime(value: number) {
        this._currentTime = value
    }
    get playing() {
        return this._playing
    }
    get volume() {
        return this._volume
    }
    set volume(value: number) {
        this._volume = value
        if (this._audio) {
            this._audio.volume = value
        }
    }
}
export default Player
