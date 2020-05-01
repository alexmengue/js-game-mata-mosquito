let height = 0
let width = 0
let emptyHearts = 1
let time = 15

var setMosquitoTime = 1500

let level = window.location.search

//testa o nível escolhido pelo usuário e define o tempo.

level = level.replace('?', '')

if (level === 'facil') {
    var setMosquitoTime = 1500

} else if (level === 'normal') {
    var setMosquitoTime = 1000

} else if (level === 'dificil') {
    var setMosquitoTime = 750
    
}

document.getElementById('timer').innerHTML = time

//ajusta o tamanho de acordo com a tela do usuário

function adjustSize() {
    height = window.innerHeight
    width = window.innerWidth
}

adjustSize()

let timer = setInterval(function() {
    time -= 1

    if (time < 0) {
        clearInterval(timer)
        clearInterval(setMosquito)
        window.location.href = 'victory.html'   //se o tempo acabar e o player ainda tiver corações, vitória.
    } else {
        document.getElementById('timer').innerHTML = time
    }
}, 1000)

function randomPosition() {
    if (document.getElementById('mosquito')) {
        document.getElementById('mosquito').remove()

        if (emptyHearts > 3) {
            window.location.href = 'game_over.html'     //se o player tiver perdido os 3 corações, game over.
        } else {
            document.getElementById('l' + emptyHearts).src="images/empty_heart.png"     //senão, retira um coração.

            emptyHearts++
        }

    }

    //gera uma posição aleatória para os mosquitos que aparecem.

    let positionX = Math.floor(Math.random() * width) - 90
    let positionY = Math.floor(Math.random() * height) - 90

    positionX = positionX < 0 ? 0 : positionX
    positionY = positionY < 0 ? 0 : positionY

    //criando elemento HTML mosquito.

    let mosquito = document.createElement('img')
    mosquito.src = 'images/mosquito.png'
    mosquito.className = randomSize() + ' ' + randomSide()
    mosquito.style.left = positionX + 'px'
    mosquito.style.top = positionY + 'px'
    mosquito.style.position = 'absolute'
    mosquito.id = 'mosquito'
    mosquito.onclick = function() {
        this.remove()
    }

    document.body.appendChild(mosquito)

}

//gera um tamanho aleatório para os mosquitos.

function randomSize() {
    let size = Math.floor(Math.random() * 3)

    switch (size) {
        case 0:
            return 'mosquito1'
        case 1:
            return 'mosquito2'
        case 2:
            return 'mosquito3'
    }
}

//define aleatoriamente o lado para qual o mosquito está virado.

function randomSide() {
    let side = Math.floor(Math.random() * 2)

    switch (side) {
        case 0:
            return 'Aside'
        case 1:
            return 'Bside'
    }
}

//timer para spawnar os mosquitos na tela.

let setMosquito = setInterval(function() {
    randomPosition()
}, setMosquitoTime)

//inicia o jogo e, caso o player não tenha escolhido um nível, exibe um alerta.

function startGame() {
    let level = document.getElementById('level').value

    if (level === '') {
        alert('Selecione um nível para iniciar o jogo!')
        return false
    }

    window.location.href = 'game.html?' + level
}