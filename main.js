// ---  ПЕРЕМЕННЫЕ  ВРОДЕ---
let count = 0;
let energy = 100;

// Загрузка
let stats = JSON.parse(localStorage.getItem('save')) || {
    score: 0, clickLvl: 1, autoLvl: 0, energyLvl: 1
};

function save() { localStorage.setItem('save', JSON.stringify(stats)); }

// Цены: начальная * 1.5 в степени уровня
const getPrice = (base, lvl) => Math.floor(base * Math.pow(1.5, lvl));

function updateUI() {
    document.getElementById('score').innerText = Math.floor(stats.score);
    
    // Обновляем магазин
    document.getElementById('cLvl').innerText = stats.clickLvl;
    document.getElementById('cPrice').innerText = getPrice(10, stats.clickLvl - 1);
    
    document.getElementById('aLvl').innerText = stats.autoLvl;
    document.getElementById('aPrice').innerText = getPrice(50, stats.autoLvl);
    
    document.getElementById('eLvl').innerText = stats.energyLvl;
    document.getElementById('ePrice').innerText = getPrice(30, stats.energyLvl - 1);
}

function handClick() {
    stats.score += stats.clickLvl;
    updateUI();
    save();
}

function buy(type) {
    let price;
    if(type === 'click') {
        price = getPrice(10, stats.clickLvl - 1);
        if(stats.score >= price) { stats.score -= price; stats.clickLvl++; }
    } 
    else if(type === 'auto') {
        price = getPrice(50, stats.autoLvl);
        if(stats.score >= price) { stats.score -= price; stats.autoLvl++; }
    }
    else if(type === 'energy') {
        price = getPrice(30, stats.energyLvl - 1);
        if(stats.score >= price) { stats.score -= price; stats.energyLvl++; }
    }
    updateUI();
    save();
}

function toggleShop() { document.getElementById('shopMenu').classList.toggle('shop-hidden'); }

// Автоклик (работает раз в секунду)
setInterval(() => {
    if(stats.autoLvl > 0) {
        stats.score += stats.autoLvl;
        updateUI();
        save();
    }
}, 1000);

updateUI();


// ---  ПОИСК ЭЛЕМЕНТОВ ---
const scoreDisplay = document.getElementById('score');
const energyBar = document.getElementById('energy-bar');
const energyNum = document.getElementById('energy-num');
const btn = document.getElementById('click-btn');

// ---  ЛОГИКА КЛИКА ---
btn.addEventListener('click', () => {
    // Если энергии хватает на клик (минимум 1)
    if (energy >= 5) {
        count++; // +1 к очкам
        energy -= 1; // -1 от энергии
        
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

