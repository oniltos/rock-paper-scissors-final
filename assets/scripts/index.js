//1. For para eventos em botões X
//2. Refac de seletores
//3. Alerta para vencedor
//4. Animação para escolha
//5. Audio para escolha
//6. Audio para vencedor






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


const game = new RockPaperScissors(3)


function playGame(event) {
    displayPersonChoice.classList.remove('animate-blink')
    displayCpuChoice.classList.remove('animate-blink')

    const choice = event.currentTarget.getAttribute('id')
    const round = game.play(choice)
    
    displayPersonChoice.innerHTML = ''
    displayCpuChoice.innerHTML = ''

    const personChoiceImage = document.createElement('img')
    personChoiceImage.setAttribute('src', `./assets/img/${round.personsCurrentChoice}.svg`)
    personChoiceImage.setAttribute('width', '50px')
    displayPersonChoice.appendChild(personChoiceImage)
    
    const cpuChoiceImage = document.createElement('img')
    cpuChoiceImage.setAttribute('src', `./assets/img/${round.cpusCurrentChoice}.svg`)
    cpuChoiceImage.setAttribute('width', '50px')
    displayCpuChoice.appendChild(cpuChoiceImage)
    
    displayPersonScore.innerHTML = game.personPoints
    displayCpuScore.innerHTML = game.cpuPoints

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

    if(game.checkGameOver()) {
        setTimeout(() => {
            alert('Game Over! The winner is the ' + game.gameWinner)
        }, 40)
        
    }
}

function enableButtons() {
    gameBgAudio.play()
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
    disableButtons()
}

function toogleAudio() {
    if(gameBgAudio.classList.contains('bg-audio-active')) {
        gameBgAudio.pause()
        gameBgAudio.classList.remove('bg-audio-active')
        gameBgAudio.classList.add('bg-audio-inactive')
        btnAudio.innerText = 'Music OFF'
    } else {
        gameBgAudio.play()
        gameBgAudio.classList.remove('bg-audio-inactive')
        gameBgAudio.classList.add('bg-audio-active')
        btnAudio.innerText = 'Music ON'
    }
}

const choiceButtons = document.querySelectorAll('.choice-button')
choiceButtons.forEach((button) => {
    button.addEventListener('click', playGame)
})

btnReset.addEventListener('click', resetGame)
btnStart.addEventListener('click', enableButtons)
btnAudio.addEventListener('click', toogleAudio)