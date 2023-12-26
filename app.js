const app = {
    score : 0,
    winnerIs : '',
    winnerWith : '',
    resultMessage : '',

    init: function () {
        app.resultMessage = '';
        app.winnerIs = '';
        app.winnerWith = '',
        app.removeAnimation();
        

        app.hideCompare();
        app.listener();
    },

    listener: function () {
        document.querySelectorAll('.select-choice .game-choice-button').forEach(element => {
            element.addEventListener('click', app.getPlayerChoice);
        });

        document.querySelector('.play-again').addEventListener('click', app.init);

        document.querySelector('.rules-button').addEventListener('click', () => {
            document.querySelector('.modal-container').classList.remove('is-hidden');
        })

        document.querySelector('.close-modal').addEventListener('click', () => {
            document.querySelector('.modal-container').classList.add('is-hidden');
        })
    },

    getPlayerChoice: function (event) {
        app.playerChoice = event.target.closest('.game-choice-button').id;

        app.compareChoice();
        app.showCompare();
    },

    generateDealerChoice: function() {
        let getRandomNb = Math.ceil(Math.random() * 3)
        if (getRandomNb === 1) {
            app.dealerChoice = 'paper'; 
        } else if (getRandomNb === 2) {
            app.dealerChoice = 'scissors';
        } else if (getRandomNb === 3) {
            app.dealerChoice = 'rock';
        }
    },

    compareChoice: function () {
        app.generateDealerChoice();

        if ((app.playerChoice === 'paper' && app.dealerChoice === 'rock') ||  (app.playerChoice === 'scissors' && app.dealerChoice === 'paper') || (app.playerChoice === 'rock' && app.dealerChoice === 'scissors')) {
            app.resultMessage = 'YOU WIN';
            app.winnerIs = 'you-picked';
            app.winnerWith = app.playerChoice;
            app.score++;
        } else if (app.playerChoice === app.dealerChoice) {
            app.resultMessage = 'MATCH NUL'; 
        } else {
            app.resultMessage = 'YOU LOSE';
            app.winnerIs = 'house-picked';
            app.winnerWith = app.dealerChoice;
            app.score--;
        }
    },

    showCompare: function () {
        document.querySelector('.select-choice').classList.add('is-hidden');
        document.querySelector('.compare-choice').classList.remove('is-hidden');

        document.querySelector(`.you-picked .${app.playerChoice}`).classList.remove('is-hidden');

        document.querySelector('.play-again').classList.add('is-hidden');
        document.querySelector('.result-message').textContent = '';

        setTimeout(()=> {
            document.querySelector(`.house-picked .${app.dealerChoice}`).classList.remove('is-hidden');
            document.querySelector('.result-message').textContent = app.resultMessage;
            document.querySelector('.play-again').classList.remove('is-hidden');
            document.querySelector('.score').textContent = app.score;
            if (app.winnerIs) {
                app.addAnimation(app.winnerIs, app.winnerWith)
            }
        }, "800");
    },

    hideCompare: function () {
        document.querySelector('.select-choice').classList.remove('is-hidden');
        document.querySelector('.compare-choice').classList.add('is-hidden');

        if (app.playerChoice) {
            document.querySelector(`.you-picked .${app.playerChoice}`).classList.add('is-hidden');
        }
        if (app.dealerChoice) {
            document.querySelector(`.house-picked .${app.dealerChoice}`).classList.add('is-hidden');
        }
    },

    addAnimation: function (winnerIs, type) {
        for ( i=1; i <= 4; i++) {
            animElem = document.createElement('div');
            animElem.classList.add(`circle`, `delay${i}`);
            document.querySelector(`.${winnerIs} .${type}`).appendChild(animElem);
        }
        console.log()
    },

    removeAnimation: function () {
        circleElem = document.querySelectorAll(`.circle`)
        if (document.querySelector(`.circle`)) {
            circleElem.forEach((circle) => {

                circle.remove();
            })
        }
    }
}

document.addEventListener('DOMContentLoaded', app.init);