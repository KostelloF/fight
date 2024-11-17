let alphabetRus = [['л', 'п'], ['а', 'э', 'о', 'ю', 'я', 'ы', 'и', 'е', 'ё', 'у'], ['г', 'т', 'н']]
let alphabetEng = [['l', 'p'], ['a', 'e', 'o', 'yu', 'ya', 'i', 'yi', 'ye', 'yo', 'u'], ['g', 't', 'n']]



// берем параметры из инпутов
let dispSettings = {}
function getInputs() {
    dispSettings.sets = [[], [], []]
    let varSideHitHeight = ['.side', '.hit', '.height']
    varSideHitHeight.forEach((element, index) => {
        let callChar = document.querySelectorAll(element)
        callChar.forEach((e, i) => dispSettings.sets[index][i] = +e.value)
    })
    dispSettings.interval = document.getElementById('speed').value
    dispSettings.time = 60000 * document.getElementById('time').value
    dispSettings.series = document.getElementById('series').value
    dispSettings.alphabet = alphabetRus
}
// getInputs()

// генерирование вероятного звука
function oneChar(set) {
    let summ = 0, part = []
    set.reduce((accum, element, index) => {
        element > 0 ? element = element : element = 0
        part[index] = summ += element
    }, 0)

    let randomNum = Math.ceil(summ * Math.random())

    for (let i = 0; i <= set.length; i++) {
        if (randomNum === 0) {
            return 'x'
        } else if (randomNum <= part[i] && randomNum !== 0) {
            return i
        }
    }
}

// генерирование звуков и сложение сигнала из них
function signal(someObject) {
    let side = oneChar(someObject.sets[0])
    let hit = oneChar(someObject.sets[1])
    let height = oneChar(someObject.sets[2])
    let height2 = oneChar([...someObject.sets[2].slice(0, 2)])

    if (hit === 4 || hit === 5 || hit === 6 || hit === 9 || hit === 'x') {
        return '' + side + hit + height
    } else {
        return '' + side + hit + height2
    }
}

// озвучка сигнала и вывод на экран
let render = (someObject) => {
    let charAlph = ''
    let oneSig = signal(someObject)
    let audio = new Audio(); audio.src = `chars/${oneSig}.mp3`; audio.autoplay = true
    for (let i = 0; i < oneSig.length; i++) {
        charAlph += someObject.alphabet[i][oneSig[i]]
        if (i === oneSig.length - 1) charAlph += "\n"

    }
    // console.log(charAlph.toUpperCase().replaceAll('UNDEFINED', ''))
    // document.querySelector('.notationHit').innerHTML = charAlph.toUpperCase().replaceAll('UNDEFINED', '')
    document.querySelector('.notationHit').innerHTML = ''
    let img = document.createElement('img')
    img.src = `images/${oneSig}.jpg`
    img.classList.add('super')
    let temp = document.querySelector('.notationHit')
    temp.insertAdjacentElement('afterbegin', img)
}

// задание вероятности количества ударов в серии 69
let random69
let randomSeries = () => { return oneChar([20, 40, 30, 10]) + 1 }

// формирование комбинации с интервалом между ударами
let kombination = (someObject) => {
    let ms = 0
    random69 = randomSeries()
    for (let i = 0; i < (someObject.series !== '69' ? someObject.series : random69); i++) {
        setTimeout(() => {
            render(someObject)
        }, ms);
        ms += 999
    }
}


// обработчик клика с запуском комбинации 
document.getElementById('start').addEventListener('click', () => {
    getInputs()
    let instruction = document.querySelector('.instruction')
    instruction.textContent = ''
    document.querySelector('.notationHit').innerHTML = "К БОЮ!"
    let inCicle

    let cicle = setTimeout(function logM() {
        kombination(dispSettings)
        inCicle = setTimeout(logM, (dispSettings.series !== '69' ? dispSettings.series : random69) * 1000 + 1000 * dispSettings.interval)
    }, 0)

    setTimeout(() => {
        clearTimeout(cicle)
        clearTimeout(inCicle)
    }, dispSettings.time)
})
document.getElementById('reset').addEventListener('click', () => {
    location.reload()
})



// обнуление ячеек по кликам
let clearIndex = document.querySelectorAll('.hitClear')
function hitClick(event) {
    if (event.target.children[0]) {
        event.target.children[0].value = ''
        event.target.children[0].focus()
    } else {
        return
    }
}
clearIndex.forEach(element => {
    element.addEventListener('click', hitClick)
})

// буфер пользовательских настроек
let hitsAll = document.querySelectorAll('.hitClear')
let addHit = document.querySelector('#save')
addHit.addEventListener('click', action)

let settings1 = []
function action(event) {
    event.preventDefault()
    for (let i = 0; i <= 17; i++) {
        settings1[i] = hitsAll[i].children[0].value
    }
    localStorage.setItem('settings1', JSON.stringify(settings1))
}
let inputHit = document.querySelector('#take')
inputHit.addEventListener('click', inputHits)
function inputHits(event) {
    event.preventDefault()
    for (let i = 0; i <= 17; i++) {
        if (localStorage.getItem('settings1')) {
            hitsAll[i].children[0].value = JSON.parse(localStorage.getItem('settings1'))[i]
        } else {
            hitsAll[i].children[0].value = settings1[i] ?? ''
        }
    }
}

