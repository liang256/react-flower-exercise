const urls = {
    colleague我偏好一起工作的人: '/make-options?cate=colleague&title=我偏好一起工作的人',
    env我最愛的工作環境: '/make-options?cate=env&title=我最愛的工作環境',
    skill我最愛的能力: '/stories',
    place我偏好的地理優點: '/make-options?cate=place&title=我偏好的地理優點',
    salary我想要的責任等級: '/salary',
    salary我偏好的薪資範圍: '/salary',
    salary其他期望得到的報酬: '/salary',
    purpose我的人生目標與使命: '/plazas',
    purpose我的人生哲學: '/faith',
    knowledge我最愛的知識或興趣: '/find-knowledges'
}

/**
 * 
 * @param {string} cate 
 * @param {string} title 
 */
export function getContentUrl(cate, title) {
    return urls[cate+title] !== undefined ? urls[cate+title] : ''
}