import { useSlider } from '@/utils/player/useSlider'
import { useLocalStore } from '@/stores/localStore'
import { round } from 'lodash-es'
/**
 * player hooks
 */
export function usePlay() {
    const localStore = useLocalStore()
    const { player } = storeToRefs(localStore)

    // 获取播放状态
    const isPlaying = computed(() => player.value.playing)
    // 控制播放/暂停
    const playOrPause = () => {
        player.value.playing ? player.value.pause() : player.value.play()
    }
    const nextOrPrePlay = (value: 'next' | 'pre') => player.value.nextOrPrePlay(value)

    // 设置音量
    const volume = computed({
        get: () => player.value.volume,
        set: (value: number) => {
            player.value.volume = round(value, 2)
        }
    })
    const sliderVolume = useSlider(volume)

    /**
     * 设置播放进度
     */
    // 计算当前进度 0-1小数
    // 当前播放器实例进度/歌曲时长
    const progressPercent = computed({
        get: () => {
            // 保留三位小数 尽可能取两位小数
            return round(player.value.currentTime / player.value.duration, 3)
        },
        set: (value: number) => {
            player.value.currentTime = round(value * player.value.duration, 3)
        }
    })

    const sliderProgress = useSlider(progressPercent)

    // 和上面联动，当鼠标按下时，停止实例的进度监听
    //  当鼠标松开时，开启实例进度监听，并且设置当前播放时间
    watch(
        () => sliderProgress.flag.value,
        value => {
            if (value) {
                player.value.refreshTime(true)
            } else {
                player.value.setPosition(player.value.currentTime)
                // 如果正在播放，则重新开始进度
                if (isPlaying.value) {
                    player.value.refreshTime(false)
                }
            }
        }
    )
    // 获取当前播放进度 单位秒
    const progress = computed(() => player.value.currentTime)
    // 获取剩余播放时间 秒
    // 歌曲时长 - 当前播放进度
    const remainProgress = computed(() => player.value.duration - player.value.currentTime)
    // 总时长
    const duration = computed(() => player.value.duration)
    return {
        isPlaying,
        playOrPause,
        nextOrPrePlay,
        duration,
        progress,
        sliderVolume,
        sliderProgress,
        remainProgress
    }
}