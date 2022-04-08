import { getQuestions } from './SkillQuestions'

export function getAllAnalysis() {
    let analysis = sessionStorage.getItem('analysis')
    if (analysis === null) {
        sessionStorage.setItem('analysis', JSON.stringify([]))
    }
    try {
        analysis = JSON.parse(analysis)
        analysis = (analysis === null) ? [] : analysis
    } catch (e) {
        analysis = []
    }
    return analysis
}

export function getAnalysisByStoyId(arr, id) {
    return (
            arr[id] === undefined
            || arr[id] === null
            || arr[id].isFinished === undefined 
            || arr[id].answers === undefined
        ) 
        ? initAnalysis(id)
        : arr[id]
}

export function initAnalysis(id) {
    const analysis = getAllAnalysis()
    const qestions = getQuestions()
    const answer = {
        isFinished: false,
        answers: Array(qestions.length).fill(false)
    }
    analysis[id] = answer

    sessionStorage.setItem('analysis', JSON.stringify(analysis))
    return answer
}

export function initAllAnalysis() {
    const stories = getStories()
    const qestions = getQuestions()
    const newAnalysis = Array(stories.length).fill(
        {
            isFinished: false,
            answers: Array(qestions.length).fill(false)
        }
    )

    sessionStorage.setItem('analysis', JSON.stringify(newAnalysis))
    return newAnalysis
}

export function getStory(stories, id) {
    // let stories = getStories()
    
    const isNewStory = (stories[id] === undefined)
    const story = isNewStory
        ? {title: `我的第 ${id + 1} 個故事`, content: null}
        : stories[id]
    if (isNewStory) {
        stories.push(story)
        sessionStorage.setItem('stories', JSON.stringify(stories))
        initAnalysis(id)
    }
    return [story, isNewStory]
}

export function getStories() {
    let stories = sessionStorage.getItem('stories')
    try {
        stories = JSON.parse(stories)
        if (!Array.isArray(stories)) {
            initStories()
            return []
        }
        return stories
    } catch (e) {
        initStories()
        return []
    }
}

export function initStories() {
    sessionStorage.setItem('stories', JSON.stringify([]))
    sessionStorage.setItem('analysis', JSON.stringify([]))
}