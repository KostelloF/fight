let alphabetRus = [['л', 'п'], ['а', 'э', 'о', 'ю', 'ы', 'и', 'я', 'е', 'ё', 'у'], ['г', 'т', 'н']]
let alphabetEng = [['l', 'p'], ['a', 'e', 'o', 'yu', 'i', 'yi', 'ya', 'ye', 'yo', 'u'], ['g', 't', 'n']]

let sample = {
    sets: [[0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0]],
    interval: '1',
    time: '50000',
    alphabet: alphabetEng,
    series: "2"
}

// задание вероятности количества ударов в серии
let randomNum
let randomSeries = (i) => {
    return oneChar([20, 40, 30, 10]) + 1
}

let user = new Object(sample)
function getInputs() {
    user.sets[0] = [+document.getElementById('l').value, +document.getElementById('p').value]
    user.sets[1] = [+document.getElementById('a').value,
    +document.getElementById('e').value,
    +document.getElementById('o').value,
    +document.getElementById('yu').value,
    +document.getElementById('i').value,
    +document.getElementById('yi').value,
    +document.getElementById('ya').value,
    +document.getElementById('ye').value,
    +document.getElementById('yo').value,
    +document.getElementById('u').value]
    user.sets[2] = [+document.getElementById('g').value,
    +document.getElementById('t').value,
    +document.getElementById('n').value]
    user.interval = document.getElementById('speed').value
    user.time = 60000 * document.getElementById('time').value
    user.alphabet = alphabetRus
    user.series = document.getElementById('series').value
    return user
}

// генерирование вероятного звука
function oneChar(set) {
    let summ = 0, part = []
    set.reduce((accum, element, index) => {
    element > 0 ? element=element : element=0
        part[index] = summ += element
    }, 0)

    let randomNum = Math.ceil(summ * Math.random())

    for (let i = 0; i <= set.length; i++) {
        if (randomNum === 0) {
            return 'n'
        } else if (randomNum <= part[i] && randomNum !== 0) {
            return i
        }
    }
}

// сложение вероятных звуков
function signal(someObject) {
    let side = oneChar(someObject.sets[0])
    let hit = oneChar(someObject.sets[1])
    let height = oneChar(someObject.sets[2])
    let heightCut = [...someObject.sets[2]]; heightCut.pop()
    let height2 = oneChar(heightCut);

    if (hit === 4 || hit === 5 || hit === 6 || hit === 9 || hit === 'n') {
        return '' + side + hit + height
    } else {
        return '' + side + hit + height2
    }
}

// формирование комбинации с внутренним интервалом и вызовом звука
let kombination = (someObject) => {
    let ms = 0
    let charAlph = ''
    let sound
    randomNum = randomSeries()
    for (let i = 0; i < (someObject.series !== '69' ? someObject.series : randomNum); i++) {
        setTimeout(() => {
            let oneSig = signal(someObject)
            let phone = () => {
                // let audio = new Audio(); audio.src = `chars/${oneSig}.mp3`; audio.autoplay = true
                let audio = new Audio(); audio.src = `chars/${oneSig}.mp3`
                    sound = audio.play()

                    for (let i = 0; i < oneSig.length; i++) {
                        charAlph += someObject.alphabet[i][oneSig[i]]
                        if (i === oneSig.length - 1) charAlph += "\n"
                    }
                    console.log(charAlph.toUpperCase().replaceAll('UNDEFINED', ''))
                    document.querySelector('.notationHit').innerHTML = charAlph.toUpperCase().replaceAll('UNDEFINED', '')
            }
            phone()
            
        }, ms);
        ms += 950
    }
    return [sound]
}

// обработчик клика с запуском комбинации 
document.getElementById('start').addEventListener('click', () => {
    getInputs()
    let instruction = document.querySelector('.instruction')
    instruction.textContent=''
    let inCicle
    let cicle = setTimeout(function logM() {
        kombination(user)
        inCicle = setTimeout(logM, (user.series !== '69' ? user.series : randomNum) * 1000 + 1000 * user.interval)
    }, 0)

    setTimeout(() => {
        clearTimeout(cicle)
        clearTimeout(inCicle)
    }, user.time)
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
        settings1[i]=hitsAll[i].children[0].value
    }
localStorage.setItem('settings1', JSON.stringify(settings1))
}

let inputHit = document.querySelector('#take')
inputHit.addEventListener('click', inputHits)
function inputHits(event) {
    event.preventDefault()
    for (let i = 0; i <= 17; i++) {
        if (localStorage.getItem('settings1')){
        hitsAll[i].children[0].value=JSON.parse(localStorage.getItem('settings1'))[i]
    } else {
        hitsAll[i].children[0].value=settings1[i]??''
    }
}
}


// открытие в этом же окне по селектору (а в новом окне нужно через window.open('https://example.ru/2.html', '_blank'))
// let logo = document.querySelector('.logo')
// logo.addEventListener('click', wind)
// function wind (){
//     location.href ='#main'
// }

// let sound
// let audio = new Audio(); audio.src = `chars/${oneSig}.mp3`??''
// sound = audio.play()
// return [sound]

// проверка вероятности
// let nAr = []
// for (let i = 0; i < 100; i++) {
//     nAr.push(oneChar(dispSettings.sets[1]))
// }
//     let summ = 0
//     for (let i = 0; i <= 9; i++) {
//         nAr.forEach((element) => {
//             if (element === i) {
//                 summ += 1
//             }
//         })
//         console.log(summ)
//         summ = 0
//     }
// console.log(nAr)

// сложение вероятных звуков



// document.getElementById('start').addEventListener('click', () => {
//     getInputs()
//     let instruction = document.querySelector('.instruction')
//     instruction.textContent = ''
//     let inCicle
//     let cicle = setTimeout(function logM() {
//         kombination(dispSettings)
//         inCicle = setTimeout(logM, (dispSettings.series !== '69' ? dispSettings.series : random69) * 1000 + 1000 * dispSettings.interval)
//     }, 0)

//     setTimeout(() => {
//         clearTimeout(cicle)
//         clearTimeout(inCicle)
//     }, dispSettings.time)
// })
// 2 вариант, не работает 69 и звук в сафари браузера только по кнопке...
// document.getElementById('start').addEventListener('click', () => {
//     getInputs()
//     let instruction = document.querySelector('.instruction')
//     instruction.textContent = ''
//     document.querySelector('.notationHit').innerHTML = "К БОЮ!"

//     let cicle = setInterval(function () {
//         kombination(dispSettings)
//     }, ((dispSettings.series /* !== '69' ? dispSettings.series : random69*/) * 1000 + 1000 * dispSettings.interval))

//     setTimeout(() => {
//         clearInterval(cicle)
//     },  dispSettings.time)
// })