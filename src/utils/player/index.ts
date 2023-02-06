import getArrayBuffer from './core/AudioCtx'
import AudioCalss from './core/AudioClass'
import { getLocal } from '@utils/localStorage'
import { reqSongUrl } from '@api/song'
import { ElMessage } from 'element-plus'
import { useDB } from '@utils/electron/myAPI'
/**
 * 切换音乐前需要销毁创建的音频实例
 * 避免内存空间占用/缓冲区冲突
 */
let timer: number
window.addEventListener('beforeunload', () => {
    clearTimeout(timer)
})
class Player {
    private _enable: boolean = false
    private _duration: number = 300
    private _index: number = 0
    private _playList: any[] = []
    private _playing: boolean = false
    private _currentTime: number = 0
    private _currentTrack = {
        id: 1962166818,
        al: {
            name: '最伟大的作品',
            picUrl: 'https://p1.music.126.net/xqonK1DZi4inhn4lTM201w==/109951167891239729.jpg'
        },
        name: '红颜如霜',
        ar: [
            {
                id: 6452,
                name: '周杰伦'
            }
        ]
    }
    private _volume: number = 0.3
    private _audio: AudioCalss | null = null
    private _buffer: AudioBuffer | null = null
    constructor() {
        this.setFromLocal()
        this._playList.length > 0 && (this.enable = true)
        this.enable && this.init()
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
        this._buffer = null
        this.cacheBuffer().then(() => {
            this.creatAudio()
            if (this._audio) {
                this.duration = this._audio.duration
            }
        })
    }
    // 缓冲音频文件
    async cacheBuffer(currentTrack: number = this._currentTrack.id) {
        const source = await reqSongUrl({ id: currentTrack })
        if (source) {
            const res = await getArrayBuffer(source)
            this._buffer = res
        } else {
            ElMessage({
                message: '歌曲无法播放',
                type: 'warning',
                duration: 1000
            })
            this.nextOrPrePlay('next')
        }
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
            clearInterval(timer)
            return
        }
        const { state, currentTime } = this._audio || {}
        if (state === 'closed') {
            clearInterval(timer)
            this.nextOrPrePlay('next')
            return
        }
        clearInterval(timer)
        if (this.playing) {
            timer = window.setInterval(() => {
                this.currentTime = currentTime || 0
                this.refreshTime()
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
            this.refreshTime(true)
            this._playing = false
        }
    }
    public async nextOrPrePlay(value: 'next' | 'pre') {
        if (value === 'next') {
            if (this._index === this._playList.length - 1) {
                this._index = 0
            } else {
                this._index++
            }
        } else if (this._index !== 0) {
            this._index--
        } else if (this._index === 0) {
            this._index = this._playList.length - 1
        }

        // 清空缓存
        this._buffer = null
        await this.updateTrack()
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
    public dbCacheReplace(data: any[]) {
        const { dbCache } = useDB()
        dbCache('trackDetail', data)
    }
    // 更新当前track
    public async updateTrack() {
        const { selectDB } = useDB()
        await selectDB('trackDetail', this._playList[this._index]).then(({ res }) => {
            console.log(res)

            if (res) {
                this._currentTrack = JSON.parse(res.value)
            }
        })
    }
    // 添加播放列表并播放
    /**
     * 1、缓存数据
     * 2、更改播放列表
     * 3、更新当前索引
     */
    public addPlayList(arr: any[]) {
        this._enable = true
        console.log(arr)

        this.dbCacheReplace(arr)
        this._playList = arr.map(item => item.id)
        this._index = 0
        this._currentTrack = arr[0]
        this.cacheBuffer().then(() => {
            if (this._audio) {
                this._audio.close()
                this.creatAudio()
                this.duration = this._audio.duration
                this.currentTime = 0
                console.log(111)

                this.play()
            }
        })
    }
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
    get enable() {
        return this._enable
    }
    set enable(value: boolean) {
        this._enable = value
    }
    get currentTrack() {
        return this._currentTrack
    }
}
export default Player
