
// алфавиты
let alphabetRus = [['л', 'п'], ['а', 'э', 'о', 'ю', 'я', 'ы', 'и', 'е', 'ё', 'у'], ['г', 'т', 'н']]
let alphabetEng = [['l', 'p'], ['a', 'e', 'o', 'yu', 'ya', 'i', 'yi', 'ye', 'yo', 'u'], ['g', 't', 'n']]

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

// задаем вероятность количества удара в серии 69
export let array69 = [20, 40, 30, 10]

//выбор всех значений инпутов
export let hitsAll = document.querySelectorAll('.hitClear')
//массив для сохранения всех значений из инпутов
export let settings1 = []
//сохранение всех значений инпутов



