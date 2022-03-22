import React from 'react'
import Flower from './Flower';

function HomePage() {
    const data = [
        {category: 'purpose', title: '我的人生目標或使命', sortedFactors: [], text: '娛樂，做好笑的事。'},
        {category: 'knowledge', title: '我最愛的知識或興趣領域', sortedFactors: ['ACG', '電腦科學', '日本文化', '加密貨幣', '迷因', '甜點', '性'], text: ''},
        {category: 'env', title: '我最愛的工作環境', sortedFactors: ['公司文化自由開放', '冷氣強', '桌椅高級', '附近美食多', '彈性服裝', '採光好'], text: ''},
        {category: 'colleague', title: '我偏好一起工作的人', sortedFactors: ['有團隊精神', '易溝通', '宅', '脾氣好', '北爛'], text: ''},
        {category: 'colleague', title: '我的和倫碼', sortedFactors: [], text: 'AIR'},
        {category: 'skill', title: '我有能力也喜歡做的事', sortedFactors: ['深度思考', '鑽研', '開發優化', '分析', '藝術', '製作'], text: ''},
        {category: 'salary', title: '我想要的責任等級', sortedFactors: [], text: '小組領導人'},
        {category: 'salary', title: '我偏好的薪資範圍', sortedFactors: [], text: '80K ~ 140K'},
        {category: 'salary', title: '其他希望得到的報酬', sortedFactors: [], text: '發揮創意的機會'},
        {category: 'place', title: '我偏好的居住地點', sortedFactors: ['多倫多', '東京', '新加坡', '紐約', '台東'], text: ''},
        {category: 'place', title: '我偏好的地理優點', sortedFactors: ['乾冷', '植物多', '豐富在地文化', '很多運動選擇', '接近大都市', '有好的賣場'], text: ''}
    ];
  return (
    <div>
      <Flower data={data}/>
    </div>
  )
}

export default HomePage
