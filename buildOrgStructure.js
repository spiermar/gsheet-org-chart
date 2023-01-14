async function loadSheet() {
    let response
    try {
        response = await gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: '1mJEb1S0QK0EdnY_SPoeYBL2reEOLGxtM5i9V1dbxMXE',
        range: 'Foundation Engineering',
        })
    } catch (err) {
        document.getElementById('content').innerText = err.message
        return
    }
    const range = response.result
    if (!range || !range.values || range.values.length == 0) {
        document.getElementById('content').innerText = 'No values found.';
        return
    }

    let header = range.values[0]
    delete range.values[0]

    let rows = []
    for (const value of Object.values(range.values)) {
        rows.push(Object.values(value))
    }
    return [header, rows]
}

async function getPeople() {
    let [header, rows] = await loadSheet()
    const idIndex = header.indexOf('id')
    const nameIndex = header.indexOf('name')
    const parentIdIndex = header.indexOf('parent_id')
    const positionIndex = header.indexOf('position')
    const areaIndex = header.indexOf('area')

    let people = []
    
    rows.forEach(row => {
        people.push({
            name: row[nameIndex],
            imageUrl: '',
            area: row[areaIndex],
            profileUrl: '',
            office: '',
            tags: '',
            isLoggedUser: '',
            positionName: row[positionIndex],
            id: row[idIndex],
            parentId: row[parentIdIndex],
            size: ''
        })
    })
    return people
}