import request from '@/utils/request'

/**
 * 二维码 key 生成接口
 * 说明: 调用此接口可生成一个 key
 */
export const reqLoginKey = ({ timestamp }) =>
    request({ url: `/login/qr/key?timestamp=${timestamp}` })

/**
 * 二维码生成接口
 * 说明: 调用此接口传入上一个接口生成的 key 可生成二维码图片的 base64 和二维码信息,可使用 base64 展示图片,或者使用二维码信息内容自行使用第三方二维码生成库渲染二维码
 * 必选参数: key,由第一个接口生成
 * 可选参数: qrimg 传入后会额外返回二维码图片 base64 编码
 */
export const reqLoginQRCode = ({ key }) => request({ url: `/login/qr/create?key=${key}` })

/**
 * 二维码检测扫码状态接口
 * 说明: 轮询此接口可获取二维码扫码状态,800 为二维码过期,801 为等待扫码,802 为待确认,803 为授权登录成功(803 状态码下会返回 cookies)必选参数: key,由第一个接口生成
 *
 */
export const reqLoginCheck = ({ key }) => request({ url: `/login/qr/check?key=${key}` })

/**
 * 发送验证码
 * 说明 : 调用此接口 ,传入手机号码, 可发送验证码
 * 必选参数 : phone: 手机号码
 * 可选参数 : ctcode: 国家区号,默认 86 即中国
 */
export const reqCaptcha = ({ phone }) => request({ url: `/captcha/sent?phone=${phone}` })

/**
 * 验证验证码
 * 说明 : 调用此接口 ,传入手机号码和验证码, 可校验验证码是否正确
 * 必选参数 : phone: 手机号码
 * captcha: 验证码
 * 可选参数 :ctcode: 国家区号,默认 86 即中国
 */
export const reqCaptchaVerify = ({ phone, captcha }) =>
    request({ url: `/captcha/verify?phone=${phone}&captcha=${captcha}` })
