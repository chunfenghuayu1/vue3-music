/**
 * 唯一缺点：接受的数据源格式需要
 * @param AudioBuffer
 *
 */
import { round } from 'lodash-es'
interface options {
    buffer: AudioBuffer
    volume: number
}
class AudioCalss {
    private instance: AudioContext = new AudioContext()
    private bufferSourceNode: AudioBufferSourceNode | null = null
    private volumeGainNode: GainNode | null = null
    private fadeGainNode: GainNode | null = null
    private startTime: number = 0
    constructor(options: options) {
        this.bufferSourceNode = this.instance.createBufferSource()
        this.volumeGainNode = this.instance.createGain()
        this.fadeGainNode = this.instance.createGain()
        this.bufferSourceNode.buffer = options.buffer
        this.volumeGainNode.gain.value = options.volume
        this.setFadein()
        this.bufferSourceNode.connect(this.volumeGainNode)
        this.volumeGainNode.connect(this.fadeGainNode)
        this.fadeGainNode.connect(this.instance.destination)
        this.bufferSourceNode?.addEventListener('ended', () => {
            this.close()
        })
    }
    private setFadein() {
        const waveArray = new Float32Array(2)
        waveArray[0] = 0.01
        waveArray[1] = 1
        this.fadeGainNode?.gain?.setValueCurveAtTime(waveArray, this.currentTime, 3)
    }
    /**
     *  如果没有实例则return
     *  如果暂停则恢复播放
     * 如果设置播放开始时间则播放
     * @param currentTime 声音延迟播放时间
     * @param startTime 声音跳转到什么时间播放
     */
    public play(startTime: number = 0, delay: number = 0) {
        if (!this.instance) return
        if (startTime !== 0) {
            this.startTime = startTime
        }
        // 设置播放开始时间
        this.bufferSourceNode?.start(delay, startTime)
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
    get duration() {
        return round(this.bufferSourceNode?.buffer?.duration || 0, 1)
    }
    get currentTime() {
        return round(this.instance.currentTime + this.startTime, 1)
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
