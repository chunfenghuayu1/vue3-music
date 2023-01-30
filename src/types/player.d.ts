declare global {
    interface Window {
        webkitAudioContext: typeof window.AudioContext
    }
}
export {}
