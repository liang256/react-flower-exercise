import React, { useState } from 'react'
import './Knowledges.css'
import { Droppable } from './DragAndDrop'

function Knowledges() {
    const [knowledges, setKnowledges] = useState([
        {name: '動畫', category: 'unsorted'},
        {name: '角色造型', category: 'unsorted'},
        {name: '美食', category: 'unsorted'},
        {name: '電腦科學', category: 'unsorted'},
        {name: '錢', category: 'unsorted'},
        {name: '植物', category: 'unsorted'},
        {name: '塗鴉', category: 'unsorted'},
        {name: '顧問', category: 'unsorted'},
        {name: '攝影', category: 'unsorted'},
        {name: '分鏡', category: 'unsorted'},
        {name: '神秘學', category: 'unsorted'}
    ])

    const boxes = {
        topRight: [],
        topLeft: [],
        bottomRight: [],
        bottomLeft: [],
        unsorted: []
    }

    knowledges.map(kn => {
        boxes[kn.category].push(kn.name)
    })

    const handleDrop = (e, cate) => {
        const id = e.dataTransfer.getData('id')
        const newKnowledges = knowledges.map(kn => {
            if (kn.name == id) {
                console.log(kn.name,'from',kn.category,'to',cate)
                kn.category = cate
            }
            return kn
        })
        setKnowledges(newKnowledges)
    }
  return (
    <div>
        <div>
        高
        <div className='row'>
            <br/><br/><br/><br/><br/>
            <br/><br/><br/><br/>專業知識
            <div>
                <div className='row'>
                    <Droppable 
                        name='topLeft' 
                        properties={boxes.topLeft} 
                        onDrop={(e)=>handleDrop(e, 'topLeft')}
                        className='box'
                        propClassName='factor'
                    />
                    <Droppable 
                        name='topRight' 
                        properties={boxes.topRight} 
                        onDrop={(e)=>handleDrop(e, 'topRight')}
                        className='box'
                        propClassName='factor'
                    />
                </div>
                <div className='row'>
                    <Droppable 
                        name='bottomLeft' 
                        properties={boxes.bottomLeft} 
                        onDrop={(e)=>handleDrop(e, 'bottomLeft')}
                        className='box'
                        propClassName='factor'
                    />
                    <Droppable 
                        name='bottomRight' 
                        properties={boxes.bottomRight} 
                        onDrop={(e)=>handleDrop(e, 'bottomRight')}
                        className='box'
                        propClassName='factor'
                    />
                </div>
            </div>
        </div>
        低
        &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
        &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
        &emsp;&emsp;&emsp;&emsp;&emsp;
        熱情
        &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
        &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
        &emsp;&emsp;&emsp;&emsp;&emsp;
        高
        </div>
        <div>
            <Droppable 
                name='unsorted' 
                properties={boxes.unsorted} 
                onDrop={(e)=>handleDrop(e, 'unsorted')}
                className=''
                propClassName='factor'
            />
        </div>
    </div>
  )
}

export default Knowledges
