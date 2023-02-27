import { reqSongUrl, reqScrobble } from '@api/song'
import { getLocal } from '@utils/localStorage'
import { ElMessage } from 'element-plus'
import { useDB } from '@utils/electron/myAPI'
import { reqPersonalFM } from '@api/user'
class Player {
    private _enable: boolean = false
    private _duration: number = 300
    private _index: number = 0
    private _playList: number[] = []
    private _playing: boolean = false
    private _currentTime: number = 0
    private _throttle: boolean = false //防止频繁切歌
    private _playType: string = 'song'
    private _FMTrack = {
        id: 1962166818,
        al: {
            id: 147779282,
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
    private _FMNextTrack = {
        id: 1962166818,
        al: {
            id: 147779282,
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
            id: 147779282,
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
    private _audio: HTMLAudioElement = new Audio()
    private _audioCtx: AudioContext = new AudioContext()
    private bufferSourceNode: MediaElementAudioSourceNode
    private fadeGainNode: GainNode
    private _source = ''
    private _timer: number = 0
    constructor() {
        this.setFromLocal()
        this.setObj()
        this._playing = false
        this._throttle = false
        this._timer = 0

        this.init()
        this._enable && this.getAudio()

        this.bufferSourceNode = this._audioCtx.createMediaElementSource(this._audio)
        this.fadeGainNode = this._audioCtx.createGain()
        this.fadeGainNode.gain.setValueCurveAtTime([0.01, 1], 0, 3)
        this.bufferSourceNode.connect(this.fadeGainNode)
        this.fadeGainNode.connect(this._audioCtx.destination)
    }
    // 设置对象属性
    private setObj() {
        const arr = [
            '_source',
            '_audio',
            '_timer',
            '_throttle',
            '_audioCtx',
            'bufferSourceNode',
            'fadeGainNode'
        ]
        for (const item of arr) {
            Object.defineProperty(this, item, {
                enumerable: false
            })
        }
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
    // 初始化
    private init() {
        this._audio.volume = this.volume
        this._audio.currentTime = this.currentTime
        this._audio.preload = 'auto'
        this._audio.crossOrigin = ''
        this._audio.controls = false
    }
    // 获取音频
    private async getAudio(currentTrack: number = this._currentTrack.id) {
        this._source && this._source.includes('blob') && URL.revokeObjectURL(this._source)
        const source = await reqSongUrl({ id: currentTrack })
        if (!source) {
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
            this.refreshTime(false)
            if (this._playType === 'fm') {
                await this.FMPlayNext()
            } else {
                await this.nextOrPrePlay('next')
            }
            return
        }
        this._source = source
        this._audio.src = source
    }
    // 播放
    public play() {
        !this._enable && (this._enable = true)
        this._audio.play()
        this._playing = !this._audio.paused
        this.refreshTime()
        this.cacheNextTrack()
    }
    // 暂停
    public pause() {
        this._audio.pause()
        this._playing = !this._audio.paused
    }
    // 切歌
    public async nextOrPrePlay(value: 'next' | 'pre') {
        if (this._throttle) return
        //  节流 增加中间缓存状态
        this._throttle = true
        this.updateIndex(value)
        try {
            this.updateScrobbl(this._currentTrack.id, this._currentTrack.al.id, ~~this._currentTime)
            // 清空缓存
            await this.updateTrack()
            await this.updateSource()
            this.play()
        } catch (err) {
            console.log(err)
        } finally {
            this._throttle = false
        }
    }
    // 歌曲进度跳转
    public setPosition(value: number) {
        this._audio.currentTime = value
    }
    // 播放进度
    /**
     *  此处需要外部控制
     * @param flag 外部控制进度条拖动时避免干扰
     */
    public refreshTime(flag: boolean = false) {
        if (flag) {
            clearInterval(this._timer)
            return
        }
        if (this._audio.ended) {
            clearInterval(this._timer)
            this.updateScrobbl(this._currentTrack.id, this._currentTrack.al.id, ~~this._duration)
            this._playType === 'fm' ? this.FMPlayNext() : this.nextOrPrePlay('next')
            return
        }
        clearInterval(this._timer)
        this._timer = 0
        if (this.playing) {
            this._timer = window.setInterval(() => {
                this.currentTime = this._audio.currentTime || 0
                this.refreshTime()
            }, 500)
        }
    }
    // 播放下一曲切换索引
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
    // 播放下一曲更新track
    public async updateTrack() {
        const { selectDB } = useDB()
        await selectDB('trackDetail', this._playList[this._index]).then(({ res }) => {
            if (res) {
                this._currentTrack = JSON.parse(res.value)
            }
        })
    }
    // 添加播放列表时更新数据库歌曲信息
    public dbCacheReplace(data: any[]) {
        const { dbCache } = useDB()
        dbCache('trackDetail', data)
    }
    // 播放歌曲缓存下一曲
    private cacheNextTrack() {
        if (this._index < this._playList.length - 1) {
            reqSongUrl({ id: this._playList[this._index + 1] })
        }
    }
    // 播放下一曲/添加播放列表，更新音频缓存
    private async updateSource() {
        await this.getAudio()
        this._audio.addEventListener('durationchange', () => {
            this._duration = this._audio.duration
        })
        this.currentTime = 0
    }
    // 添加播放列表
    public async addPlayList(arr: any[], type: 'song' | 'fm' = 'song', index?: number) {
        if (this._throttle) return
        //  节流 增加中间缓存状态
        this._throttle = true

        this._playType = type

        this.dbCacheReplace(arr)
        this._playList = arr.map(item => item.id)
        this._index = index || 0
        this._currentTrack = arr[this._index]
        try {
            await this.updateSource()
            this.play()
        } catch (err) {
            console.log(err)
        } finally {
            this._throttle = false
        }
    }
    //  听歌排行刷新
    private updateScrobbl<T extends number>(id: T, sourceid: T, time: T) {
        reqScrobble({
            id,
            sourceid,
            time,
            timestamp: +new Date()
        })
    }
    // fm播放
    public async FMPlay() {
        const arr = toRaw(this.FMTrack)
        await this.addPlayList([arr], 'fm')
        this.updateNextFMTrack()
    }
    public async FMPlayNext() {
        if (this._throttle) return
        this.updateFMTrack()
        await this.FMPlay()
    }
    public updateFMTrack() {
        this._FMTrack = this._FMNextTrack
        if (this.playType === 'fm') {
            this._currentTrack = this._FMTrack
        }
    }
    public async updateNextFMTrack() {
        const { data } = await reqPersonalFM({ timestamp: +new Date() })
        const { id, album: al, artists: ar, name } = data[0]
        this._FMNextTrack = {
            id,
            al,
            ar,
            name
        }
        await reqSongUrl({ id })
    }
    get duration() {
        return this._duration
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
