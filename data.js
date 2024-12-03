
// алфавиты
const alphabetRus = [['л', 'п'], ['а', 'э', 'о', 'ю', 'я', 'ы', 'и', 'е', 'ё', 'у'], ['г', 'т', 'н']]
const alphabetEng = [['l', 'p'], ['a', 'e', 'o', 'yu', 'ya', 'i', 'yi', 'ye', 'yo', 'u'], ['g', 't', 'n']]

export let instruction = document.querySelector('.instruction')


// задаем вероятность количества удара в серии 69
export let array69 = [15, 60, 90, 100]

//выбор всех значений инпутов
export let hitsAll = document.querySelectorAll('.hitClear')

//массив для сохранения всех значений из инпутов
export let settings1 = []

// берем параметры из инпутов html
export let dispSettings = {}
export function getInputs() {
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

// обнуление ячеек по кликам
export function setClearInputs(event) {
    if (event.target.children[0]) {
        event.target.children[0].value = ''
        event.target.children[0].focus()
    } else {
        return
    }
}

// буфер пользовательских настроек - сохранение в LS
export function saveInputsToLs(event) {
    event.preventDefault()
    for (let i = 0; i <= 17; i++) {
        settings1[i] = hitsAll[i].children[0].value
    }
    localStorage.setItem('settings1', JSON.stringify(settings1))
}

// буфер пользовательских настроек - вызов из LS
export function getInputsFromLS(event) {
    event.preventDefault()
    for (let i = 0; i <= 17; i++) {
        if (localStorage.getItem('settings1')) {
            hitsAll[i].children[0].value = JSON.parse(localStorage.getItem('settings1'))[i]
        } else {
            hitsAll[i].children[0].value = settings1[i] ?? ''
        }
    }
}

// заносим файлы в LS(audio)
export function saveAudiosToLs(i) {
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
saveAudiosToLs('xxx')

// заносим файлы в LS(images)
export function saveImagesToLs(i) {
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