//1. Dois jogadores jogam ao mesmo tempo 
//2. Um jogador é uma pessoa e o outro é a CPU 
//3. Pedra vence Tesoura 
//4. Papel vence Pedra 
//5. Tesoura vence Papel 
//6. Se os dois escolherem o mesmo item, dá empate  
//7. A pontuação total de cada jogador seja exibida 
//8. A escolha atual de cada jogador seja exibida 
//9. A pontuação possa ser "resetada" 
//10. O jogo só pode começar depois de um sinal de start 
//11. Vence o melhor de n rounds 

class RockPaperScissors {
    constructor(maxRounds) {
        this.personPoints = 0
        this.cpuPoints = 0
        this.personsCurrentChoice = ''
        this.cpusCurrentChoice = ''
        this.roundWinner = null
        this.roundsPlayed = 0
        this.gameWinner = ''
        this.gameOver = false
        this.maxRounds = maxRounds
    }

    getCpuChoice() {
        const choices = ['rock', 'paper', 'scissors']
        const randomNumber = Math.floor(Math.random() * choices.length)

        return choices[randomNumber]
    }

    play(personChoice) {
        if(!this.gameOver) {
            this.personsCurrentChoice = personChoice
            this.cpusCurrentChoice = this.getCpuChoice()
            this.checkRoundWinner()
            this.roundsPlayed ++
        }

        return this
    }

    checkRoundWinner() {
        if(this.personsCurrentChoice !== this.cpusCurrentChoice) {
            if (
                (this.personsCurrentChoice === 'rock' && this.cpusCurrentChoice === 'scissors') ||
                (this.personsCurrentChoice === 'paper' && this.cpusCurrentChoice === 'rock') ||
                (this.personsCurrentChoice === 'scissors' && this.cpusCurrentChoice === 'paper')
            ) {
                this.personPoints++
                this.roundWinner = 'person'
            } else {
                this.cpuPoints++
                this.roundWinner = 'cpu'
            }
        } else {
            this.roundWinner = null
        }
    }

    checkGameOver() {
        if(this.roundsPlayed === this.maxRounds) {
            this.gameOver = true
            if(this.personPoints > this.cpuPoints) {
                this.gameWinner = 'person'
            } else if (this.personPoints < this.cpuPoints) {
                this.gameWinner = 'cpu'
            }
        }

        return this.gameOver
    }

    reset() {
        this.personPoints = 0
        this.cpuPoints = 0
        this.personsCurrentChoice = ''
        this.cpusCurrentChoice = ''
        this.roundWinner = null
        this.roundsPlayed = 0
        this.gameWinner = ''
        this.gameOver = false
    }
}