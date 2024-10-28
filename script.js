document.getElementById('save').addEventListener('click', () => {
let sample = {
    sideHits: [],
    someHits: [],
    heightHits: [],
    heightHits2: [],
    interval: '',
    time: '',
    alphabet: [],
    series: '',
}
let alphabetRus = ['л', 'п', 'а', 'э', 'о', 'ю', 'ы', 'и', 'я', 'е', 'ё', 'у', 'г', 'т', 'н']
let alphabetEng = ['l', 'p', 'a', 'e', 'o', 'yu', 'i', 'yi', 'ya', 'ye', 'yo', 'u', 'g', 't', 'n']



let user = new Object(sample)
{
    user.sideHits[0] = +document.getElementById('l').value
    user.sideHits[1] = +document.getElementById('p').value
    user.someHits[0] = +document.getElementById('a').value
    user.someHits[1] = +document.getElementById('e').value
    user.someHits[2] = +document.getElementById('o').value
    user.someHits[3] = +document.getElementById('yu').value
    user.someHits[4] = +document.getElementById('i').value
    user.someHits[5] = +document.getElementById('yi').value
    user.someHits[6] = +document.getElementById('ya').value
    user.someHits[7] = +document.getElementById('ye').value
    user.someHits[8] = +document.getElementById('yo').value
    user.someHits[9] = +document.getElementById('u').value
    user.heightHits[0] = +document.getElementById('g').value
    user.heightHits[1] = +document.getElementById('t').value
    user.heightHits[2] = +document.getElementById('n').value
    user.heightHits2[0] = user.heightHits[0]
    user.heightHits2[1] = user.heightHits[1]
    user.interval = 1000 * document.getElementById('speed').value
    user.time = 60000 * document.getElementById('time').value
    alphabet = alphabetEng
    series = 2
}

let signalSide = [alphabet[0], alphabet[1]]
let signalSome = [alphabet[2], alphabet[3], alphabet[4], alphabet[5], alphabet[6], alphabet[7], alphabet[8], alphabet[9], alphabet[10], alphabet[11]]
let signalHeight = [alphabet[12], alphabet[13], alphabet[14]]
let signalHeight2 = [signalHeight[0], signalHeight[1]]

function oneChar(signal, hits) {
    let summ = 0, part = []
    hits.reduce((accum, element, index) => {
        part[index] = summ += element
    }, 0)

    let randomNum = Math.ceil(summ * Math.random())

    for (i = 0; i <= signal.length; i++) {
        if (randomNum === 0) {
            return ''
    }else if (randomNum <= part[i] && randomNum !== 0) {
        return signal[i]
    }
}
}

function renderChars() {
    let sideChar = oneChar(signalSide, user.sideHits)??''
    let someChar = oneChar(signalSome, user.someHits)??''
    let heightChar = oneChar(signalHeight, user.heightHits)??''
    let heightChar2 = oneChar(signalHeight2, user.heightHits2)??''
    if (someChar === signalSome[4] || someChar === signalSome[5] || someChar === signalSome[6] || someChar === signalSome[9]) {
        return sideChar + ' ' + someChar + ' ' + heightChar
    } else {
        return sideChar + ' ' + someChar + ' ' + heightChar2
    }
}

console.log()
console.log()
console.log()

function name(params) {
    
}


    setInterval(()=>{
    gluing = renderChars().replaceAll(' ','')
    document.getElementById('wow').innerHTML = gluing
console.log(gluing)
    let adress = `../fightNotat/chars/threeChar/${gluing}.wav`
    let audio = new Audio(); audio.src = adress; audio.autoplay = true 
},user.interval)
    setTimeout(() => {clearInterval(user.interval)}, time);
    
})
document.getElementById('reset').addEventListener('click', () => {
    location.reload()
})




// function seriesRender(renderChars) {
// switch (series) {
//     case 4: return renderChars() + ', '+renderChars() + ', '+renderChars() + ', '+renderChars()
//         break;
//         case 3: return renderChars() + ', '+renderChars() + ', '+renderChars()
//         break;
//         case 2: return renderChars() + ', '+renderChars() 
//         break;
//         case 1: return renderChars()
//         break;
//     default : case 2: return renderChars() + ', '+renderChars() 
//         break;
// }
// }

// console.log(seriesRender(renderChars).split(', '))

// let gluing = seriesRender(renderChars).split(', ')
// gluing.reduce((accum, element, index) => {
//     console.log(element.replaceAll(' ', ''))
// },0)


// document.getElementById('save').addEventListener('click', () => {
//     let gluing = seriesRender(renderChars).split(', ')
//     gluing.reduce((accum, element, index) => {
//     console.log(element.replaceAll(' ', ''))
// },0)
// })

