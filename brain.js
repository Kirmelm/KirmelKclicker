// Переменная для хранения очков
let count = 0;

// Находим элементы на странице по их ID
const scoreDisplay = document.getElementById('score');
const btn = document.getElementById('click-btn');

// работает типо клики = кнопка
btn.addEventListener('click', () => {
    // Прибавляем 1 к счету
    count = count + 1;
    
    // Обновляем 
    scoreDisplay.innerText = count;
    
    // Маленький визуальный эффект: цифра чуть подпрыгивает при клике
    scoreDisplay.style.transform = 'scale(1.2)';
    setTimeout(() => {
        scoreDisplay.style.transform = 'scale(1)';
    }, 100);
});

