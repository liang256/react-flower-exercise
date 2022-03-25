export default function updateRow(cate, title, newCotent) {

    let data = sessionStorage.getItem('flowerData');
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