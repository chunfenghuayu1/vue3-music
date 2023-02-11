/**
 * 唯一缺点：接受的数据源格式需要
 * @param AudioBuffer
 *
 */
import { round } from 'lodash-es'
interface options {
    source: string
    volume: number
}
class AudioCalss {
    private instance: AudioContext = new AudioContext()
    private bufferSourceNode: MediaElementAudioSourceNode | null = null
    private volumeGainNode: GainNode | null = null
    private fadeGainNode: GainNode | null = null
    private audio: HTMLAudioElement = new Audio()
    constructor(options: options) {
        this.audio.crossOrigin = ''
        this.audio.src = options.source
        this.bufferSourceNode = this.instance.createMediaElementSource(this.audio)
        this.volumeGainNode = this.instance.createGain()
        this.fadeGainNode = this.instance.createGain()
        this.volumeGainNode.gain.value = options.volume
        this.setFadein()
        this.bufferSourceNode.connect(this.volumeGainNode)
        this.volumeGainNode.connect(this.fadeGainNode)
        this.fadeGainNode.connect(this.instance.destination)
        this.audio.addEventListener('ended', () => {
            this.close()
        })
    }
    private setFadein() {
        const waveArray = new Float32Array(2)
        waveArray[0] = 0.01
        waveArray[1] = this.volumeGainNode!.gain.value
        this.fadeGainNode?.gain?.setValueCurveAtTime(waveArray, this.currentTime, 2)
    }
    /**
     *  如果没有实例则return
     *  如果暂停则恢复播放
     * 如果设置播放开始时间则播放
     * @param currentTime 声音延迟播放时间
     * @param startTime 声音跳转到什么时间播放
     */
    public play(startTime: number = 0) {
        if (!this.instance) return
        if (startTime !== 0) {
            this.audio.currentTime = startTime
        }
        this.audio.play()
    }
    public pause() {
        this.instance.suspend()
    }
    public resume() {
        // 暂停后播放
        this.instance.resume()
    }
    public close() {
        this.instance.close()
    }
    get currentTime() {
        return round(this.audio.currentTime, 1)
    }
    get duration() {
        return round(this.audio.duration, 1)
    }
    get state() {
        return this.instance.state
    }
    set volume(value: number) {
        if (this.volumeGainNode) {
            this.volumeGainNode.gain.value = value
        }
    }
}
export default AudioCalss
