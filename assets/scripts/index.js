const btnRock = document.getElementById('rock')
const btnPaper = document.getElementById('paper')
const btnScissors = document.getElementById('scissors')
const btnReset = document.getElementById('reset')
const btnStart = document.getElementById('start')
const btnAudio = document.getElementById('audio')
const displayPersonChoice = document.querySelector('.person-choice')
const displayCpuChoice = document.querySelector('.cpu-choice')
const displayPersonScore = document.querySelector('.person-score span')
const displayCpuScore = document.querySelector('.cpu-score span')
const winAudio = document.getElementById('win-audio')
const loseAudio = document.getElementById('lose-audio')
const gameBgAudio = document.getElementById('game-bg-audio')
const tieAudio = document.getElementById('tie-audio')
const drumAudio = document.getElementById('drum-audio')
const endMessage = document.querySelector('.end-message')
const userWonMessage = endMessage.querySelector('.user-won')
const cpuWonMessage = endMessage.querySelector('.cpu-won')
const tieMessage = endMessage.querySelector('.tie-game')

gameBgAudio.volume = .2 
winAudio.volume = .3
loseAudio.volume = .3
tieAudio.volume = .3
drumAudio.volume = .3

let audio = true


const game = new RockPaperScissors(3)

function changeChoiceImage(parent, source) {
    parent.innerHTML = ''
    const image = document.createElement('img')
    image.setAttribute('src', `./assets/img/${source}.svg`)
    image.setAttribute('width', '50px')
    parent.appendChild(image)
}

function playDrum() {
    drumAudio.play()
    gameBgAudio.volume = .05
}

function stopDrum() {
    drumAudio.pause()
    drumAudio.currentTime = 0
    gameBgAudio.volume = .2
}

function cpuChoice(game, round, callback) {
    const images = ['rock', 'paper', 'scissors']
    count = 0
    playDrum()

    const intervalId = setInterval(() => {
        const rand = Math.floor(Math.random() * images.length)
        changeChoiceImage(displayCpuChoice, images[rand])
        count += 150
        if(count>3000) {
            clearInterval(intervalId)
            stopDrum()
            changeChoiceImage(displayCpuChoice, round.cpusCurrentChoice)
            callback(game)
        }
    }, 150);
}

function checkWinner(game) {
    if(game.roundWinner === 'person') {
        displayPersonChoice.classList.add('animate-blink')
        winAudio.play()
    } else if (game.roundWinner === 'cpu') {
        displayCpuChoice.classList.add('animate-blink')
        loseAudio.play()
    } else {
        displayPersonChoice.classList.add('animate-blink')
        displayCpuChoice.classList.add('animate-blink')
        tieAudio.play()
    }

    displayPersonScore.innerHTML = game.personPoints
    displayCpuScore.innerHTML = game.cpuPoints

    if(game.checkGameOver()) {
        endMessage.style.display = 'block'
        if(game.gameWinner === 'person') {
            userWonMessage.style.display = 'block'
        } else if (game.gameWinner === 'cpu') {
            cpuWonMessage.style.display = 'block'
        } else {
            tieMessage.style.display = 'block'
        }
    }
}


function playGame(event) {
    displayPersonChoice.classList.remove('animate-blink')
    displayCpuChoice.classList.remove('animate-blink')

    const choice = event.currentTarget.getAttribute('id')
    const round = game.play(choice)

    changeChoiceImage(displayPersonChoice, round.personsCurrentChoice)
    cpuChoice(game, round, checkWinner)
}

function enableButtons() {
    if(gameBgAudio.classList.contains('bg-audio-active')) {
        gameBgAudio.play()
    }

    btnRock.removeAttribute('disabled')
    btnPaper.removeAttribute('disabled')
    btnScissors.removeAttribute('disabled')
}

function disableButtons() {
    btnRock.setAttribute('disabled', true)
    btnPaper.setAttribute('disabled', true)
    btnScissors.setAttribute('disabled', true)
}

function resetGame() {
    game.reset()
    displayPersonScore.innerHTML = game.personPoints
    displayCpuScore.innerHTML = game.cpuPoints
    displayPersonChoice.innerHTML = ''
    displayCpuChoice.innerHTML = ''
    displayPersonChoice.classList.remove('animate-blink')
    displayCpuChoice.classList.remove('animate-blink')
    endMessage.style.display = 'none'
    userWonMessage.style.display = 'none'
    cpuWonMessage.style.display = 'none'
    tieMessage.style.display = 'none'
    disableButtons()
}

function toogleAudio() {
    if(audio === true) {
        gameBgAudio.pause()
        audio = false
        btnAudio.innerText = 'Music OFF'
    } else {
        gameBgAudio.play()
       audio = true
        btnAudio.innerText = 'Music ON'
    }
}

const choiceButtons = document.querySelectorAll('.choice-button')
choiceButtons.forEach((button) => {
    button.onclick = playGame
})

btnReset.onclick = resetGame
btnStart.onclick = enableButtons
btnAudio.onclick = toogleAudio