/* game.js */
document.addEventListener('DOMContentLoaded', () => {
    const startScreen = document.getElementById('start-screen');
    const startButton = document.getElementById('start-button');
    const gameContainer = document.getElementById('game-container');
    const heartsContainer = document.getElementById('hearts-container');
    const message = document.getElementById('message');
    const timerElement = document.getElementById('time');
    const gameOverScreen = document.getElementById('game-over-screen');
    const retryButton = document.getElementById('retry-button');
    const victoryScreen = document.getElementById('victory-screen');
    const presentButton = document.getElementById('present-button');
    const popup = document.querySelector('.popup');
    const erroAudio = new Audio('erro.mp3');
    const sucessoAudio = new Audio('sucesso.mp3');
    let heartCount, correctHeartIndex, countdownInterval;

    startButton.addEventListener('click', startGame);
    retryButton.addEventListener('click', restartGame);
    presentButton.addEventListener('click', handlePresentButtonClick);

    function startGame() {
        startScreen.classList.add('hidden');
        gameContainer.classList.remove('hidden');
        heartCount = Math.floor(Math.random() * 11) + 15; // entre 15 e 25
        correctHeartIndex = Math.floor(Math.random() * heartCount);
        createHearts();
        startTimer(15); // 15 segundos
    }

    function startTimer(duration) {
        let timer = duration, minutes, seconds;
        
        countdownInterval = setInterval(() => {
            timer--;
            
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            timerElement.textContent = minutes + ":" + seconds;

            if (timer <= 0) {
                clearInterval(countdownInterval);
                endGame(false);
            } else if (timer <= 3) {
                timerElement.classList.add('countdown');
            }
        }, 1000);
    }

    function createHearts() {
        heartsContainer.innerHTML = ''; // Limpar corações anteriores
        for (let i = 0; i < heartCount; i++) {
            const heart = document.createElement('div');
            heart.classList.add('heart');
            if (i === correctHeartIndex) {
                heart.classList.add('correct');
            }
            heart.addEventListener('click', () => {
                if (heart.classList.contains('correct')) {
                    sucessoAudio.play();
                    endGame(true);
                } else {
                    erroAudio.play();
                    message.textContent = 'Amor errado!';
                }
            });
            heartsContainer.appendChild(heart);
        }
    }

    function endGame(success) {
        gameContainer.classList.add('hidden');
        if (success) {
            victoryScreen.classList.remove('hidden');
        } else {
            gameOverScreen.classList.remove('hidden');
        }
    }

    function restartGame() {
        gameOverScreen.classList.add('hidden');
        victoryScreen.classList.add('hidden'); // Certificar-se de que a tela de vitória esteja oculta ao reiniciar
        heartsContainer.innerHTML = '';
        message.textContent = '';
        startGame();
    }

    function handlePresentButtonClick() {
        showPopup();
        setTimeout(redirectToPresent, 15000); // Adicionar atraso de 15 segundos antes de redirecionar
    }

    function showPopup() {
        popup.classList.remove('hidden');
    }

    function redirectToPresent() {
        // Redirecionar para a página do presente
        window.location.href = 'mensagem_final.html'; // Substitua pelo URL da página do presente
    }
});
