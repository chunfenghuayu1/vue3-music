export interface LoginKey {
    timestamp: string
}
export interface LoginQRCode {
    key: number
    timestamp: number
}
export interface Captcha {
    phone: number
}
export interface CaptchaVerify {
    phone: number
    captcha: number
    // 此处未测试
    ctcode?: 86
}
