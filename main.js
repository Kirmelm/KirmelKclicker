// --- 1. ПЕРЕМЕННЫЕ ---
let count = 0;
let energy = 100;

// --- 2. ПОИСК ЭЛЕМЕНТОВ ---
const scoreDisplay = document.getElementById('score');
const energyBar = document.getElementById('energy-bar');
const energyNum = document.getElementById('energy-num');
const btn = document.getElementById('click-btn');

// --- 3. ЛОГИКА КЛИКА ---
btn.addEventListener('click', () => {
    // Если энергии хватает на клик (минимум 5)
    if (energy >= 5) {
        count++; // +1 к очкам
        energy -= 1; // -5 к энергии
        
        updateUI(); // Обновляем экран
    } else {
        // Если энергии мало — кнопка дрожит (эффект)
        btn.style.transform = "translateX(5px)";
        setTimeout(() => btn.style.transform = "scale(1)", 100);
        console.log("Энергия на нуле!");
    }
});

// --- 4. ВОССТАНОВЛЕНИЕ ЭНЕРГИИ ---
// Каждые 500 миллисекунд (полсекунды) добавляем 1% энергии
setInterval(() => {
    if (energy < 100) {
        energy += 1;
        updateUI();
    }
}, 500);

// --- 5. ФУНКЦИЯ ОБНОВЛЕНИЯ ЭКРАНА ---
function updateUI() {
    // Пишем очки
    scoreDisplay.innerText = count;
    // Пишем цифру энергии
    energyNum.innerText = Math.floor(energy);
    // Двигаем полоску
    energyBar.style.width = energy + "%";

    // Если энергии меньше 5, делаем кнопку тусклой
    if (energy < 5) {
        btn.style.opacity = "0.5";
        btn.style.cursor = "not-allowed";
    } else {
        btn.style.opacity = "1";
        btn.style.cursor = "pointer";
    }
}

