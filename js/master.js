let cards = document.querySelectorAll('.memory-card')
let second = document.getElementById('sec')
let minute = document.getElementById('min')
let game = document.getElementsByClassName('memory-game')[0]
let flippedCard = false;
let firstCard;
let secondCard;
let numSec = 00;
let numMin = 00
let click = 0;
let lockBoard = false;
let correctFlipp = 1;




function play() {

    var audio = new Audio('../audio/mp3.mp3')
    audio.loop = true;
    audio.play();


}


cards.forEach(card => { card.addEventListener('click', func) });
cards.forEach(card1 => {
    let randomSet = Math.ceil(Math.random() * 18)
    card1.style.order = randomSet
})


function func() {

    if (lockBoard) return;
    this.classList.add('flip')
    if (!flippedCard) {
        flippedCard = true;
        firstCard = this;
        return;
    } else {
        secondCard = this;
        flippedCard = false;
    }

    let fDataName = firstCard.getAttribute('data-name')

    let sDataName = secondCard.getAttribute('data-name')



    if (fDataName === sDataName) {
        correctFlipp += 1;
        firstCard.removeEventListener('click', func)
        secondCard.removeEventListener('click', func)


    }
    if (fDataName !== sDataName) {
        lockBoard = true
        setTimeout(() => {
            firstCard.classList.remove('flip')
            secondCard.classList.remove('flip')
            firstCard.style.animationName = "shake"
            firstCard.style.animationDuration = "0.5s"
            firstCard.style.animationIterationCount = "alternative"

            secondCard.style.animationName = "shake"
            secondCard.style.animationDuration = "0.5s"
            secondCard.style.animationIterationCount = "alternative"
            lockBoard = false
        }, 1000);

    }

    if (click == 0) {

        timer = setInterval(myTimer, 1000)
        click++
        return
    }

    if (correctFlipp >= 9) {
        clearInterval(timer)
    }

    if (correctFlipp > 9) {
        confetti({
            particleCount: 200,
            spread: 90,
            origin: {
                y: 0.6
            }
        })

    }

    function myTimer() {
        numSec++
        if (numSec <= 9) {
            second.innerHTML = '0' + numSec
        }
        if (numSec > 9) {

            second.innerHTML = numSec
        }
        if (numSec > 59) {

            numMin++
            minute.innerHTML = '0' + numMin;
            numSec = 0;
            second.innerHTML = "0" + numSec;

        }
        if (numSec > 9) {

            minute.innerHTML = numMin
        }


    }

}