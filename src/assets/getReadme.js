const el = document.getElementById('readme')

const xmlHttp = new XMLHttpRequest()
xmlHttp.open('GET', 'https://raw.githubusercontent.com/112batman/112batman/master/readme.md', true)
xmlHttp.onreadystatechange = () => {
    if(xmlHttp.readyState === 4 && xmlHttp.status === 200) {
        el.innerHTML = xmlHttp.responseText
    }
}
xmlHttp.send(null)