export default function initFlowerData() {
    //
    const flowerData = []
    sessionStorage.setItem('flowerData', JSON.stringify(flowerData))
    return flowerData
}

/**
 * 
 * @param {string} cate 
 * @param {string} title 
 * @param {string|array} newCotent 
 * @returns {object|undefined}
 */
export function updateRow(cate, title, newCotent) {

    let data = JSON.parse(sessionStorage.getItem('flowerData'));
    if (! Array.isArray(data)) {
        data = []
    }
    const newCotentIsArray = Array.isArray(newCotent)
    const newRow = {
        category: cate,
        title: title,
        sortedFactors: newCotentIsArray ? newCotent : [],
        text: newCotentIsArray ? '' : newCotent
    }

    const target =  data.find(row => row.category == cate && row.title == title)
    if (target === undefined) {
        data.push(newRow)
    } else {
        data = data.map(row => {
            if (row.category == cate && row.title == title) {
                return newRow
            }
            return row
        })
    }
    // console.log(JSON.stringify(data))
    sessionStorage.setItem('flowerData', JSON.stringify(data))
}

/**
 * 
 * @param {string} cate 
 * @param {string} title 
 * @returns {object|undefined}
 */
export function getRow(cate, title) {
    let data = sessionStorage.getItem('flowerData')
    if (data === null) {
        return undefined
    }
    try {
        data = JSON.parse(data)
    } catch (e) {
        return undefined
    }
    return data.find(row => row.category == cate && row.title == title)
}