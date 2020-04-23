var height = 0
var width = 0
var emptyHearts = 1
var time = 15

var setMosquitoTime = 1500

var level = window.location.search

level = level.replace('?', '')

if (level === 'facil') {
    var setMosquitoTime = 1500

} else if (level === 'normal') {
    var setMosquitoTime = 1000

} else if (level === 'dificil') {
    var setMosquitoTime = 750
    
}

document.getElementById('timer').innerHTML = time

function adjustSize() {
    height = window.innerHeight
    width = window.innerWidth
}

adjustSize()

var timer = setInterval(function() {
    time -= 1

    if (time < 0) {
        clearInterval(timer)
        clearInterval(setMosquito)
        window.location.href = 'victory.html'
    } else {
        document.getElementById('timer').innerHTML = time
    }
}, 1000)

function randomPosition() {
    if (document.getElementById('mosquito')) {
        document.getElementById('mosquito').remove()

        if (emptyHearts > 3) {
            window.location.href = 'game_over.html'
        } else {
            document.getElementById('l' + emptyHearts).src="images/empty_heart.png"

            emptyHearts++
        }

    }

    var positionX = Math.floor(Math.random() * width) - 90
    var positionY = Math.floor(Math.random() * height) - 90

    positionX = positionX < 0 ? 0 : positionX
    positionY = positionY < 0 ? 0 : positionY

    var mosquito = document.createElement('img')
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

function randomSize() {
    var size = Math.floor(Math.random() * 3)

    switch (size) {
        case 0:
            return 'mosquito1'
        case 1:
            return 'mosquito2'
        case 2:
            return 'mosquito3'
    }
}

function randomSide() {
    var side = Math.floor(Math.random() * 2)

    switch (side) {
        case 0:
            return 'Aside'
        case 1:
            return 'Bside'
    }
}

var setMosquito = setInterval(function() {
    randomPosition()
}, setMosquitoTime)

function startGame() {
    var level = document.getElementById('level').value

    if (level === '') {
        alert('Selecione um nível para iniciar o jogo!')
        return false
    }

    window.location.href = 'game.html?' + level
}