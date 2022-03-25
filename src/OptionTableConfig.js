const config = {
    colleague我偏好一起工作的人: [
        {header: '人生至今工作過的地方', placeholder: '寫下至今工作過的地方，好方便回憶'},
        {header: '在這些地方讓我很崩潰的人的特質', placeholder: '不要列名字，形容什麼特質就好，例如：情緒化，無法就事論事。不用管順序，列出來就好。'}
    ],
    place我偏好的地理優點: [
        {header: '我住過的地方', placeholder: '寫下至今住過的地方，好方便回憶'},
        {header: '以前不喜歡、以後也不喜歡的缺點', placeholder: null}
    ],
    env我最愛的工作環境: [
        {header: '人生至今工作過的地方', placeholder: '寫下至今工作過的地方，好方便回憶'},
        {header: '討厭的工作環境', placeholder: '如果在這樣的工作環境工作，效率會變差'}
    ]
}

export default function getColDesc(cate, title) { 
    return config[cate+title] 
}