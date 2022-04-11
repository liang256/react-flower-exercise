import React, { useState } from 'react'
import './Knowledges.css'
import { Droppable } from './DragAndDrop'
import { updateRow } from '../FlowerData'
import { useSearchParams } from 'react-router-dom'
import LinkButton from '../LinkButton'

function Knowledges() {
    const [searchParams, setSearchParams] = useSearchParams();
    let factors = searchParams.get('factors')
    factors = (factors === null) ? [] : factors.split(',')
    factors = factors.filter(f => f !== '')
        .map(f => {
            return {
                name: f,
                category: 'unsorted',
                left: 0,
                right: 0
            }
        })
    // console.log(factors)
    const [knowledges, setKnowledges] = useState(factors)

    const boxes = {
        topRight: [],
        topLeft: [],
        bottomRight: [],
        bottomLeft: [],
        unsorted: []
    }

    knowledges.map(kn => {
        return boxes[kn.category].push(kn)
    })

    const handleDragStart = (e, item) => {
        e.dataTransfer.setData('id', item.name)
        e.dataTransfer.setData('width', e.target.offsetWidth)
        e.dataTransfer.setData('height', e.target.offsetHeight)
        console.log('drag e', e.target.offsetWidth, e.target.offsetHeight)
    }

    const handleDrop = (e, cate) => {
        const id = e.dataTransfer.getData('id')
        const width = e.dataTransfer.getData('width')
        const height = e.dataTransfer.getData('height')
        const newKnowledges = knowledges.map(kn => {
            if (kn.name === id) {
                console.log(kn.name,'from',kn.category,'to',cate)
                console.log(e.nativeEvent.offsetX, e.nativeEvent.offsetY, width, height)
                kn.category = cate
                kn.left = e.nativeEvent.offsetX - width / 2
                kn.top = e.nativeEvent.offsetY - height / 2
            }
            return kn
        })
        setKnowledges(newKnowledges)
    }

    const compareByDistance = (a, b) => {
        return (
            (Math.pow(b.left, 2) + Math.pow(10000 - b.top, 2))
            - (Math.pow(a.left, 2) + Math.pow(10000 - a.top, 2))
        )
    }

    const handleSave = () => {
        // const
        let topFactors = boxes.topRight
            .sort(compareByDistance)
            .slice(0, 5)
            .map(f => f.name)
        // 如果第一象限(有專業知識且有興趣)的元素不足 5，
        // 以第四象限的的領域補足至 5
        if (topFactors.length < 5) {
            topFactors = topFactors.concat(
                boxes.bottomRight
                    .sort(compareByDistance)
                    .slice(0, 5 - topFactors.length)
                    .map(f => f.name)
            )
        }
        updateRow('knowledge', '我最愛的知識或興趣', topFactors)
    }

  return (
    <div>
        <div className='knowledgePlacementTable'>
            <div className='row'>
                <span className='cornerText xStart yEnd'>高</span>
                <span className='cornerText xStart yStart'>低</span>
                <span className='cornerText xStart yCenter'>專<br/>業<br/>程<br/>度</span>
                <span className='cornerText xEnd yStart'>高</span>
                <span className='cornerText xCenter yStart'>有興趣程度</span>
                <Droppable
                    name='topLeft' 
                    properties={boxes.topLeft} 
                    onDrop={(e)=>handleDrop(e, 'topLeft')}
                    className='box'
                    propClassName='dragfactor sorted'
                    onDragStart={handleDragStart}
                    handleDragStart = {handleDragStart}
                    extraText='你沒什麼熱情但具備很多專業知識的領域'
                />
                <Droppable 
                    name='topRight' 
                    properties={boxes.topRight} 
                    onDrop={(e)=>handleDrop(e, 'topRight')}
                    className='box'
                    propClassName='dragfactor sorted'
                    handleDragStart = {handleDragStart}
                    extraText='你很有熱情也具備很多專業知識的領域'
                />
            </div>
            <div className='row'>
                <Droppable 
                    name='bottomLeft' 
                    properties={boxes.bottomLeft} 
                    onDrop={(e)=>handleDrop(e, 'bottomLeft')}
                    className='box'
                    propClassName='dragfactor sorted'
                    handleDragStart = {handleDragStart}
                    extraText='你沒什麼熱情也不具備相關專業知識的領域'
                />
                <Droppable 
                    name='bottomRight' 
                    properties={boxes.bottomRight} 
                    onDrop={(e)=>handleDrop(e, 'bottomRight')}
                    className='box'
                    propClassName='dragfactor sorted'
                    handleDragStart = {handleDragStart}
                    extraText='你很有熱情但缺乏相關專業知識的領域'
                />
            </div>
        </div>
        <div className='instructionContainer'>
            <p>將下面元素拖拉放入上面 4 個象限中。愈靠近右上角代表你愈有興趣和專業，最後排序會愈前面。</p>
            <p>請至少放 5 個領域至右側 (高熱情) 框框。</p>
        </div>
        <Droppable 
            name='unsorted' 
            properties={boxes.unsorted} 
            onDrop={(e)=>handleDrop(e, 'unsorted')}
            handleDragStart = {handleDragStart}
            className='unsortedFactorContainer'
            propClassName='dragfactor'
        />
        <div className='row center buttonContainer'>
            <LinkButton
                to = '/'
                text = 'Save'
                enable = {boxes.topRight.length + boxes.bottomRight.length >= 5 ? true : false}
                onClick = {handleSave}
            />
        </div>
        
    </div>
  )
}

export default Knowledges
