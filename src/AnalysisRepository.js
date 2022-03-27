import {getQuestions} from './SkillQuestions'

export function getAllAnalysis() {
    let analysis = sessionStorage.getItem('analysis')
    if (analysis === null) {
        sessionStorage.setItem('analysis', JSON.stringify([]))
    }
    try {
        analysis = JSON.parse(analysis)
    } catch (e) {
        analysis = []
    }
    return analysis
}

export function getAnalysis(id) {
    const arr = getAllAnalysis()
    return (arr[id] === undefined) 
        ? initAnalysis(id)
        : arr[id]
}

export function initAnalysis(id) {
    const analysis = getAllAnalysis()
    const qestions = getQuestions()
    const answer = Array(qestions.length).fill(false)
    analysis[id] = answer
    // console.log('init', analysis)
    sessionStorage.setItem('analysis', JSON.stringify(analysis))
    return answer
}