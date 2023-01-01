export interface LoginKey {
    timestamp: number
}
export interface LoginQRCode {
    key: string
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
