import React, { useRef, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import LinkButton from '../LinkButton'
import './Story.css'
import {
    getStories,
    getStory,
    initStories
} from '../StoryModule'

export default function Story() {
    const navigate = useNavigate()
    
    const params = useParams()
    const storyId = parseInt(params.storyId, 10)
    // console.log('story id', storyId)

    const [titleEditing, setTitleEditing] = useState(false)
    const [stories, setStories] = useState(getStories())
    const [story, isNewStory] = getStory(stories, storyId)
    const [selectorId, setSelectorId] = useState(storyId)
    const contentInputRef = useRef()
    const titleInputRef = useRef()

    const switchToSelectedId = (id) => {
        contentInputRef.current.focus()
        let [targetStory, isNewStory] = getStory(stories, id)
        contentInputRef.current.value = targetStory.content
        titleInputRef.current.value = targetStory.title
    }

    const handleTitleInputKeyDown = (e) => {
        console.log(e.target.value)
        if (e.key === 'Enter' && e.target.value !== '') {
            const newStories = stories.map((s, i) => {
                if (i === storyId) {
                    s.title = e.target.value
                }
                return s
            })
            sessionStorage.setItem('stories', JSON.stringify(newStories))
            setStories(newStories)
            setTitleEditing(false)
        }
    }

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
        <div 
            className='storyDetailContainer'
            onClick={(e) => {
                e.stopPropagation()
                if (titleEditing) {
                    setTitleEditing(false)
                }
            }}
        >
            <div className='titleContainer'>
                <h2 
                    className={titleEditing ? 'storyTitle hidden' : 'storyTitle'}
                    onClick={(e) => {
                        e.stopPropagation()
                        if (!titleEditing) {
                            setTitleEditing(true)
                        }
                        titleInputRef.current.value = story.title
                        titleInputRef.current.focus()
                    }}
                >
                    {story.title}
                </h2>
                <input
                    className={titleEditing ? 'titleInput' : 'titleInput hidden'}
                    type = 'text'
                    ref = {titleInputRef}
                    defaultValue={story.title}
                    onKeyDown={(e) => handleTitleInputKeyDown(e)}
                    onClick={(e) => {e.stopPropagation()}}
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
                    placeholder = {(
                        "每個故事都要包含以下要素：\n"
                        + "A 目標 (你想要達成的事)\n"
                        + "B 你遇到的某種困難、阻礙、限制 (個人考量或客觀因素)\n"
                        + "C 描述你做了哪些事，如何完成每個步驟 (解釋你如何克服困難達成目標)\n"
                        + "D 描述最終結果\n"
                        + "E 用一些量化數據表達你對這個成果的評價"
                    )}
                    defaultValue={story.content}></textarea>
            </div>
            <div className='row center storySwitcher'>
                {
                    stories.length > 0 && <div className='storySelector'>
                        <select
                            defaultValue={selectorId}
                            onChange = {(e) => {
                                setSelectorId(e.target.value)
                                navigate('/stories/' + e.target.value)
                                switchToSelectedId(e.target.value)
                            }}
                        >
                            {storyOptions}
                        </select>
                    </div>
                }
            </div>
            <div className='row center buttonContainer'>
                <LinkButton to='/stories' text='Back'/>
                &nbsp;
                &nbsp;
                <LinkButton
                    to={'/stories/' + selectorId + '/analysis'}
                    text='Analysis'
                />
            </div>
        </div>
    )
}

// function getStory(stories, id) {
//     // let stories = getStories()
    
//     const isNewStory = (stories[id] === undefined)
//     const story = isNewStory
//         ? {title: `我的第 ${id + 1} 個故事`, content: null}
//         : stories[id]
//     if (isNewStory) {
//         console.log('is arr',Array.isArray(stories))
//         stories.push(story)
//         // console.log('hi', id, newStories)
//         sessionStorage.setItem('stories', JSON.stringify(stories))
//     }
//     return [story, isNewStory]
// }

// function getStories() {
//     let stories = sessionStorage.getItem('stories')
//     try {
//         stories = JSON.parse(stories)
//         if (!Array.isArray(stories)) {
//             initStories()
//             return []
//         }
//         return stories
//     } catch (e) {
//         initStories()
//         return []
//     }
// }

// function initStories() {
//     sessionStorage.setItem('stories', JSON.stringify([]))
//     sessionStorage.setItem('analysis', JSON.stringify([]))
// }