let alphabetRus = [['л', 'п'], ['а', 'э', 'о', 'ю', 'ы', 'и', 'я', 'е', 'ё', 'у'], ['г', 'т', 'н']]
let alphabetEng = [['l', 'p'], ['a', 'e', 'o', 'yu', 'i', 'yi', 'ya', 'ye', 'yo', 'u'], ['g', 't', 'n']]

let sample = {
    sets: [[0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0]],
    interval: '1',
    time: '50000',
    alphabet: alphabetEng,
    series: "2"
}
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

function oneChar(set) {
    let summ = 0, part = []
    set.reduce((accum, element, index) => {
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
let kombination = (someObject) => {
    let ms = 0
    let charAlph = ''
    randomNum = randomSeries()
    for (let i = 0; i < (someObject.series !== '69' ? someObject.series : randomNum); i++) {
        setTimeout(() => {
            let oneSig = signal(someObject)
            let audio = new Audio(); audio.src = `chars/${oneSig}.wav`; audio.autoplay = true

            for (let i = 0; i < oneSig.length; i++) {
                charAlph += someObject.alphabet[i][oneSig[i]]
                if (i === oneSig.length - 1) charAlph += "\n"
            }
            console.log(charAlph.toUpperCase().replaceAll('UNDEFINED', ''))
            document.getElementById('notationHit').innerHTML = charAlph.toUpperCase().replaceAll('UNDEFINED', '')
        }, ms);
        ms += 800
    }
}

document.getElementById('start').addEventListener('click', () => {
    getInputs()
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




