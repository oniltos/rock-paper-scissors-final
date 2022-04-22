//1. Dois jogadores jogam ao mesmo tempo X
//2. Um jogador é uma pessoa e o outro é a CPU X
//3. Pedra vence Tesoura X
//4. Papel vence Pedra X
//5. Tesoura vence Papel X
//6. Se os dois escolherem o mesmo item, dá empate  X
//7. A pontuação total de cada jogador seja exibida X
//8. A escolha atual de cada jogador seja exibida X
//9. A pontuação possa ser "resetada" X
//10. O jogo só pode começar depois de um sinal de start X


//11. Criar uma classe para o Jogo X
//12. Vence o melhor de 5

class RockPaperScissors {
    constructor() {
        this.personPoints = 0
        this.cpuPoints = 0
        this.personsCurrentChoice = ''
        this.cpusCurrentChoice = ''
        this.roundWinner = null
        this.gameOver = false
    }

    getCpuChoice() {
        const choices = ['rock', 'paper', 'scissors']
        const randomNumber = Math.floor(Math.random() * choices.length)

        return choices[randomNumber]
    }

    play(personChoice) {
        this.personsCurrentChoice = personChoice
        this.cpusCurrentChoice = this.getCpuChoice()
        this.checkRoundWinner()
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
        }
    }

    reset() {
        this.personPoints = 0
        this.cpuPoints = 0
    }
}