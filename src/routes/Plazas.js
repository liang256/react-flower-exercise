import React, { 
    useState, 
    useRef 
} from 'react'
import { Link } from 'react-router-dom'
import './Plazas.css'
import updateRow, { getRow } from '../FlowerData'

function Plazas() {
    const cate = 'purpose'
    const title = '我的人生目標與使命'
    const purposeInputRef = useRef()
    const purposeRow = getRow(cate, title)
    const purpose = (purposeRow !== undefined) ? purposeRow.text : ''
    const [selectPlaza, setSelectPlaza] = useState(0)
    const plazas = [
        {
            name: '感官廣場', 
            desc: '你完成這趟生命旅程時，是否希望世上因你存在過，留下更多的美？假如是，你最欣賞哪種美？'
                + '是藝術、音樂、花卉、攝影、繪畫、舞台表演、雕塑、服裝設計、珠寶設計，還是其他？'
                + '如果這是你人生最主要的目的，寫一段文字描述這個目標。'
        },
        {
            name: '身體廣場', 
            desc: '你完成這趟生命旅程時，是否希望世上因你存在過，所以有更多完整、勻稱、健康的人，'
                + '受傷的人獲得治療，飢餓者得到飽足，窮困者有衣蔽體？'
                + '如果這是你人生最主要的目的，寫一段文字描述這個目標。'
        },
        {
            name: '資產廣場', 
            desc: '你是否最關注這個世界對財務的過度熱愛？'
                + '你完成這趟生命旅程時，是否希望世上因你存在過，讓個人、社群、國家擁有的資產受到更好的管理？'
                + '你是否想回歸簡樸，重視質感 (而非數量)，重新看中「充足」，而非一位追求「更多」？'
                + '假如是，你最關注人類生命中的哪個部份？'
                + '如果這是你人生最主要的目的，寫一段文字描述這個目標。'
        },
        {
            name: '意志與良心廣場', 
            desc: '你完成這趟生命旅程時，是否希望世上因你存在過，所以更有倫理、公平、正值、誠實？'
                + '你最關注人生或歷史的哪個面向？最關注的地理位置是哪裡？'
                + '如果這是你人生最主要的目的，寫一段文字描述這個目標。'
        },
        {
            name: '真心廣場', 
            desc: '你完成這趟生命旅程時，是否希望世上因你存在過，有更多的愛與善心？'
                + '是對誰或什麼事情的愛與善心？'
                + '如果這是你人生最主要的目的，寫一段文字描述這個目標。'
        },
        {
            name: '娛樂廣場', 
            desc: '你完成這趟生命旅程時，是否希望世上因你存在過，有更多人的路被點亮，'
                + '更多人獲得不同的觀點，因為你的幫助暫時忘記憂慮，可以開心歡笑？'
                + '假如是，你最想貢獻的是哪一種娛樂？'
                + '如果這是你人生最主要的目的，寫一段文字描述這個目標。'
        },
        {
            name: '世界廣場', 
            desc: '你完成這趟生命旅程時，是否希望世上因你存在過，讓這個行星受到更多保護，'
                + '對世界及宇宙更深入探索，使環境問題和能源都能得到更多改善？'
                + '假如是，最吸引你內心的是哪些議題或挑戰？'
                + '如果這是你人生最主要的目的，寫一段文字描述這個目標。'
        },
        {
            name: '靈性廣場', 
            desc: '你完成這趟生命旅程時，是否希望世上因你存在過，讓世界更具靈性、信念、善心、諒解，'
                + '產生更多對神或人類不同形式的愛？'
                + '假如是，你最看重哪個族群、年齡層、生命階段？'
                + '如果這是你人生最主要的目的，寫一段文字描述這個目標。'
        },
        {
            name: '心智廣場', 
            desc: '你完成這趟生命旅程時，是否希望世上因你存在過，世上有更多知識、真理、明晰的思想？'
                + '你最看重哪方面的知識、真理、思想？'
                + '如果這是你人生最主要的目的，寫一段文字描述這個目標。'
        }
    ]

    const plazaOptions = plazas.map((plaza, index) => {
        const isSelected = (selectPlaza == index)
        return (
            <div 
                key={plaza.name}
                className={isSelected ? 'plazaCard selected' : 'plazaCard'}
                onClick={() => setSelectPlaza(index)}
            >
                <input type='checkbox' checked={isSelected ? true : false} readOnly></input>
                {plaza.name}
                {isSelected && <p>{plaza.desc}</p>}
            </div>
        )
    })
  return (
    <div>
        <h3>目標與使命</h3>
        <label>想像自己喜歡身處哪個廣場</label>
        <div className='plazaCardContainer'>
            {plazaOptions}
        </div>
        <label>詳細描述你對人生目標或使命</label>
        <textarea type='text' defaultValue={purpose} ref={purposeInputRef}></textarea>
        <button onClick={() => updateRow(cate, title, plazas[selectPlaza].name + ':' + purposeInputRef.current.value)}>
            <Link to='/'>Save</Link>
        </button>
    </div>
  )
}

export default Plazas
