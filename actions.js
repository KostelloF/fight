import * as data from './data.js'

// доля каждого удара и их сумма (для выражения%)
let part = [[], [], []]
function getShareOfSumm(arr) {
    arr.forEach((elem, ind) => {
        elem.reduce((accum, element, index) => {
            element > 0 ? element = element : element = 0
            part[ind].push(accum += element)
            return accum
        }, 0);
    });
    return part
}

//генерирование вероятного звука 
function generationOneNum(set) {
    let randomNum = Math.ceil(set[set.length - 1] * Math.random())
    for (let i = 0; i <= set.length; i++) {
        if (randomNum === 0) {
            return 'x'
        } else if (randomNum <= set[i] && randomNum !== 0) {
            return i
        }
    }
}

// генерирование звуков и сложение сигнала из них
export function concatSignal(someObject) {
    let side = generationOneNum(someObject[0])
    let hit = generationOneNum(someObject[1])
    let height = generationOneNum(someObject[2])
    let height2 = generationOneNum([...someObject[2].slice(0, 2)])
    if (hit === 4 || hit === 5 || hit === 6 || hit === 9 || hit === 'x') {
        return '' + side + hit + height
    } else {
        return '' + side + hit + height2
    }
}

// озвучка сигнала и вывод на экран
export let renderSignal = (someObject) => {
    let charAlph = ''
    let oneSig = concatSignal(part)
    let audioControl = new Audio(); audioControl.src = `./chars/${oneSig}.mp3`;
    let img = document.createElement('img')
    img.src = `./images/${oneSig}.webp`; img.alt = ''
    img.classList.add('visual')
    let temp = document.querySelector('.notationHit')

    data.saveAudiosToLs('xxx')
    data.saveAudiosToLs(oneSig)
    data.saveImagesToLs(oneSig)

    setTimeout(() => {
        let phone = new Audio(audioControl.src = JSON.parse(localStorage.getItem(`lS${oneSig}`)).src)
        document.querySelector('.notationHit').innerHTML = ``
        temp.insertAdjacentElement('afterbegin', img)
        img.src = JSON.parse(localStorage.getItem(`liS${oneSig}`)).src
        phone.play()
    }, 2600);
}

// задание вероятности количества ударов в серии 69
let random69
let generationRandomSeriesNum = () => { return generationOneNum(data.array69) + 1 }

// формирование комбинации с интервалом между ударами
export let createKombination = (someObject) => {
    let ms = 0
    random69 = generationRandomSeriesNum()
    for (let i = 0; i < (someObject.series !== '69' ? someObject.series : random69); i++) {
        setTimeout(() => {
            renderSignal(someObject)
        }, ms);
        ms += 999
    }
}

// запуск комбинаций 
let audioControl = new Audio(); audioControl.src = ``;

export function startProg() {
    data.getInputs()
    getShareOfSumm(data.dispSettings.sets)
    data.instruction.textContent = ''
    document.querySelector('.notationHit').innerHTML = "К БОЮ!"

    let inCicle
    let cicle = setTimeout(function logM() {
        createKombination(data.dispSettings)
        inCicle = setTimeout(logM, (data.dispSettings.series !== '69' ? data.dispSettings.series : random69) * 1000 + 1000 * data.dispSettings.interval)
    }, 0)
    let crutch = setInterval(() => {

        new Audio(audioControl.src = JSON.parse(localStorage.getItem(`lSxxx`)).src).play()
    }, 700);

    setTimeout(() => {
        clearTimeout(cicle)
        clearTimeout(inCicle)
        // clearTimeout(crutch)
    }, data.dispSettings.time)
}
document.getElementById('reset').addEventListener('click', () => {
    location.reload()
})
