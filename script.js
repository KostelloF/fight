import * as action from './actions.js'

// сохранение файлов в local storage
// action.lsAandI()

//обнуляем каждое значение по клику
let clearIndex = document.querySelectorAll('.hitClear')
clearIndex.forEach(element => {
    element.onclick = action.hitClick
})

//заносим данные из инпутов в local storage
let addHit = document.querySelector('#save')
addHit.onclick = action.action

//вызываем данные из local storage в инпуты
let inputHit = document.querySelector('#take')
inputHit.onclick = action.inputHits

// обработчик клика с запуском комбинации 
let butStart = document.getElementById('start')

butStart.onclick = function() {
    action.startProg()
    this.disabled = 'disabled'
}
