import React, { useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import './Story.css'

export default function Story() {
    
    const params = useParams()
    const storyId = parseInt(params.storyId, 10)
    // console.log('story id', storyId)

    const [stories, setStories] = useState(getStories())
    const [story, isNewStory] = getStory(storyId)
    const [selectorId, setSelectorId] = useState(storyId)
    const contentInputRef = useRef()
    const titleInputRef = useRef()
    // console.log('render, stories', stories)
    const storyOptions = stories.map((story, index) => {
        return (
            <option
                value={index}
                key={index}
            >
                {story.title}
            </option>
        )
    })
    return (
        <div>
            <div className='storyTitle'>
                <input 
                    ref={titleInputRef}
                    defaultValue={isNewStory ? `我的第 ${storyId + 1} 個故事` : story.title}
                ></input>
            </div>
            <div className='storyContent'>
                <textarea 
                ref = {contentInputRef}
                    onChange={(e) => {
                        let newStories = stories
                        newStories[storyId]['content'] = e.target.value
                        sessionStorage.setItem('stories', JSON.stringify(newStories))
                    }}
                    defaultValue={
                    isNewStory 
                    ? (
                        "每個故事都要包含以下要素：\n"
                        + "A 目標 (你想要達成的事)\n"
                        + "B 你遇到的某種困難、阻礙、限制 (個人考量或客觀因素)\n"
                        + "C 描述你做了哪些事，如何完成每個步驟 (解釋你如何克服困難達成目標)\n"
                        + "D 描述最終結果\n"
                        + "E 用一些量化數據表達你對這個成果的評價"
                    )
                    : story.content
                }></textarea>
            </div>
            <div>
                {
                    stories.length > 0 && <div className='storySelector'>
                        <select
                            defaultValue={selectorId}
                            onChange = {(e) => {
                                setSelectorId(e.target.value)
                            }}
                        >
                            {storyOptions}
                        </select>
                        <button onClick={() => {
                            contentInputRef.current.focus()
                            let [targetStory, isNewStory] = getStory(selectorId)
                            contentInputRef.current.value = targetStory.content
                            titleInputRef.current.value = targetStory.title
                        }}>
                            <Link to={'/stories/' + selectorId}>前往編輯</Link>
                        </button>
                    </div>
                }
                <button className='analysisButton'>
                    <Link to={'/stories/' + selectorId + '/analysis'}>分析</Link>
                </button>
            </div>
        </div>
    )
}

function getStory(id) {
    const stories = JSON.parse(sessionStorage.getItem('stories'))
    // console.log('get story, stories', stories)
    return (stories[id] === undefined)
        ? [{title: `我的第 ${id + 1} 個故事`, content: null}, true]
        : [stories[id], false]
}

function getStories() {
    let stories = sessionStorage.getItem('stories')
    // console.log( stories)
    if (stories ===  null) {
        sessionStorage.setItem('stories', JSON.stringify([]))
        return []
    }
    stories = JSON.parse(sessionStorage.getItem('stories'))
    return Array.isArray(stories) ? stories : []
}