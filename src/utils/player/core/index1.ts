// import getArrayBuffer from './core/AudioCtx'
import AudioCalss from './AudioClass'
import { getLocal } from '@utils/localStorage'
import { reqSongUrl } from '@api/song'
import { reqPersonalFM } from '@api/user'
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
    private _throttle: boolean = false //防止频繁切歌
    private _playType: string = 'song'
    private _FMTrack = {
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
    private _source: string = ''
    constructor() {
        this.setFromLocal()
        this._playList.length > 0 && (this.enable = true)
        this.enable && this.init()
        this._playing = false
        this._throttle = false
        Object.defineProperty(this, '_source', {
            enumerable: false
        })
        Object.defineProperty(this, '_audio', {
            enumerable: false
        })
        Object.defineProperty(this, '_throttle', {
            enumerable: false
        })
    }
    // 本地存储信息覆盖
    private setFromLocal() {
        const player = getLocal('player')
        if (Object.keys(player).length !== 0) {
            for (const [key, value] of Object.entries(player)) {
                // @ts-ignore
                this[key] = value
            }
        }
    }
    // 音频文件初始化
    private init() {
        this.cacheBuffer().then(() => {
            this.creatAudio()
        })
    }
    // 实例化音频
    private creatAudio(source = this._source) {
        this._audio = new AudioCalss({ source, volume: this.volume })
    }
    // 缓冲音频文件
    private async cacheBuffer(currentTrack: number = this._currentTrack.id) {
        const source = await reqSongUrl({ id: currentTrack })
        if (source) {
            this._source = source
        } else {
            ElMessage({
                message: '歌曲无法播放,自动播放下一首',
                type: 'warning',
                duration: 3000
            })
            // 如果这首歌不能播放，则从播放列表删除，并跳转到下一首
            // 更新索引
            if (this._index === 0 || this._index === this._playList.length - 1) {
                this._index = 0
            } else {
                this._index--
            }
            this._playList = this._playList.filter(id => id !== currentTrack)
            this._throttle = false
            if (this._playType === 'fm') {
                await this.FMPlayNext()
            } else {
                await this.nextOrPrePlay('next')
            }
        }
        if (this._audio) {
            this.duration = this._audio.duration
            console.log(this._audio.duration)
        }
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
            this._playType === 'fm' ? this.FMPlayNext() : this.nextOrPrePlay('next')

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
            this.cacheNextTrack()
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
    /**
     * 播放下一曲
     * 1、节流
     * 2、播放状态
     * 3、更新索引
     * 4、清空音频缓存
     * 5、更新track
     * 6、更新缓存
     * 7、播放
     */
    public async nextOrPrePlay(value: 'next' | 'pre') {
        if (this._throttle) return
        //  节流 增加中间缓存状态
        this._throttle = true
        this.updateIndex(value)
        // 清空缓存
        // this._source = null
        await this.updateTrack()
        await this.updateBuffer()
        this.play()
        this._throttle = false
    }
    // 播放下一曲时更新索引
    private updateIndex(value: 'next' | 'pre') {
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
    }
    // 播放下一曲时更新当前track
    public async updateTrack() {
        const { selectDB } = useDB()
        await selectDB('trackDetail', this._playList[this._index]).then(({ res }) => {
            if (res) {
                this._currentTrack = JSON.parse(res.value)
            }
        })
    }
    // 添加播放列表时更新数据库缓存
    public dbCacheReplace(data: any[]) {
        const { dbCache } = useDB()
        dbCache('trackDetail', data)
    }
    // 播放歌曲时缓存下一曲
    private cacheNextTrack() {
        if (this._index < this._playList.length - 1) {
            reqSongUrl({ id: this._playList[this._index + 1] })
        }
    }
    // 播放下一曲/添加播放列表，更新音频缓存
    private async updateBuffer() {
        await this.cacheBuffer()
        if (this._audio && this._audio?.state !== 'closed') {
            this._audio.close()
        }
        this.creatAudio()
        this.currentTime = 0
    }
    /**
     * 添加播放列表并播放
     * 1、节流
     * 2、播放状态
     * 3、缓存数据、更新播放列表、索引（指定位置或者0）、清空音频缓存
     * 4、更新缓存
     * 5、播放
     */
    public async addPlayList(arr: any[], type: 'song' | 'fm' = 'song', index?: number) {
        if (this._throttle) return
        //  节流 增加中间缓存状态
        this._throttle = true
        this._playing = false

        this._enable = true
        this._playType = type

        this.dbCacheReplace(arr)
        this._playList = arr.map(item => item.id)
        this._index = index || 0
        this._currentTrack = arr[this._index]
        await this.updateBuffer()
        this.play()
        this._throttle = false
    }
    // fm播放
    public async FMPlay() {
        this._enable = true
        const arr = toRaw(this.FMTrack)
        await this.addPlayList([arr], 'fm')
    }
    public async FMPlayNext() {
        if (this._throttle) return
        await this.updateFMTrack()
        await this.FMPlay()
    }
    public async updateFMTrack() {
        const { data } = await reqPersonalFM({ timestamp: +new Date() })
        const { id, album: al, artists: ar, name } = data[0]
        this._FMTrack = {
            id,
            al,
            ar,
            name
        }
        if (this.playType === 'fm') {
            this._currentTrack = this._FMTrack
        }
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
    get playType() {
        return this._playType
    }
    get FMTrack() {
        return this._FMTrack
    }
}
export default Player
