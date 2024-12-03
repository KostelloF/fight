import * as action from './actions.js'
import * as data from './data.js'

//обнуляем каждое значение по клику
let clearIndex = document.querySelectorAll('.hitClear')
clearIndex.forEach(element => {
    element.onclick = data.setClearInputs
})

//заносим данные из инпутов в LS
let addHit = document.querySelector('#save')
addHit.onclick = data.saveInputsToLs

//вызываем данные из LS в инпуты
let inputHit = document.querySelector('#take')
inputHit.onclick = data.getInputsFromLS

// обработчик клика с запуском комбинации 
let butStart = document.getElementById('start')

butStart.onclick = function() {
    action.startProg()
    this.disabled = 'disabled'
}
