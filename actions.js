import * as data from './data.js'



// обнуление ячеек по кликам
export function hitClick(event) {
    if (event.target.children[0]) {
        event.target.children[0].value = ''
        event.target.children[0].focus()
    } else {
        return
    }
}

// буфер пользовательских настроек - сохранение в локал сторадж
export function action(event) {
    event.preventDefault()
    for (let i = 0; i <= 17; i++) {
        data.settings1[i] = data.hitsAll[i].children[0].value
    }
    localStorage.setItem('data.settings1', JSON.stringify(data.settings1))
}

// буфер пользовательских настроек - вызов из локал сторадж
export function inputHits(event) {
    event.preventDefault()
    for (let i = 0; i <= 17; i++) {
        if (localStorage.getItem('data.settings1')) {
            data.hitsAll[i].children[0].value = JSON.parse(localStorage.getItem('data.settings1'))[i]
        } else {
            data.hitsAll[i].children[0].value = data.settings1[i] ?? ''
        }
    }
}

// генерирование вероятного звука
export function oneChar(set) {
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
export function signal(someObject) {
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
export let render = (someObject) => {
    let charAlph = ''
    let oneSig = signal(someObject)

    // let audio = new Audio(); audio.src = `chars/${oneSig}.mp3`; audio.autoplay = true
let audioControl = new Audio(); audioControl.src = `chars/${oneSig}.mp3`;
    document.querySelector('.notationHit').innerHTML = ''
    let img = document.createElement('img')
    img.src = `images/${oneSig}.webp`
    img.classList.add('visual')
    let temp = document.querySelector('.notationHit')
    temp.insertAdjacentElement('afterbegin', img)

lsAudio('xxx')
lsAudio(oneSig)
lsImage(oneSig)

setTimeout(() => {
    let ab = new Audio(audioControl.src  = JSON.parse(localStorage.getItem(`lS${oneSig}`)).src)
    img.src = JSON.parse(localStorage.getItem(`liS${oneSig}`)).src
    ab.play()
    // console.log(ab.src)
},2600);

}

// задание вероятности количества ударов в серии 69
export let random69
export let randomSeries = () => { return oneChar(data.array69) + 1 }

// формирование комбинации с интервалом между ударами
export let kombination = (someObject) => {
    let ms = 0
    random69 = randomSeries()
    for (let i = 0; i < (someObject.series !== '69' ? someObject.series : random69); i++) {
        setTimeout(() => {
            render(someObject)
        }, ms);
        ms += 999
    }
}

// запуск комбинаций 
export function startProg() {
    data.getInputs()
    let instruction = document.querySelector('.instruction')
    instruction.textContent = ''
    // document.querySelector('.notationHit').innerHTML = "К БОЮ!"
    let inCicle

    let cicle = setTimeout(function logM() {
        kombination(data.dispSettings)
        inCicle = setTimeout(logM, (data.dispSettings.series !== '69' ? data.dispSettings.series : random69) * 1000 + 1000 * data.dispSettings.interval)
    }, 0)
    let crutch = setInterval(() => {
        let audioControl = new Audio(); audioControl.src = ``;
        new Audio(audioControl.src  = JSON.parse(localStorage.getItem(`lSxxx`)).src).play()
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


// заносим файлы в ls(audio)

        export function lsAudio(i) {
        fetch(`chars/${i}.mp3`)
            .then(function (res) {
                res.blob().then(function (blob) {
                    let size = blob.size
                    let type = blob.type
                    let reader = new FileReader()
                    reader.addEventListener("loadend", function () {
                        let base64FileData = reader.result.toString()
                        let mediaFile = {
                            fileUrl: `chars/${i}.mp3`,
                            size: blob.size,
                            type: blob.type,
                            src: base64FileData
                        }
                        localStorage.setItem(`lS${i}`, JSON.stringify(mediaFile))
                    })
                    reader.readAsDataURL(blob)
                })
            })

        }

// заносим файлы в ls(images)
           export function lsImage(i) {
           
        fetch(`images/${i}.webp`)
            .then(function (res) {
                res.blob().then(function (blob) {
                    let size = blob.size
                    let type = blob.type
                    let reader = new FileReader()
                    reader.addEventListener("loadend", function () {
                        let base64FileData = reader.result.toString()
                        let mediaFile = {
                            fileUrl: `images/${i}.webp`,
                            size: blob.size,
                            type: blob.type,
                            src: base64FileData
                        }
                        localStorage.setItem(`liS${i}`, JSON.stringify(mediaFile))
                    })
                    reader.readAsDataURL(blob)
                })
            })
                 
        }



