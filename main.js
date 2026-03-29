// Загружаем данные с защитой от ошибок
let data = JSON.parse(localStorage.getItem('kirmel_v5')) || {
    score: 0, clickP: 1, energy: 100, maxE: 100, autoP: 0,
    c1: 10, c2: 50, c3: 100
};

// Проверка на NaN и битые данные
Object.keys(data).forEach(k => { if(isNaN(data[k])) data[k] = 0; });
if(data.maxE <= 0) data.maxE = 100;
if(data.clickP <= 0) data.clickP = 1;
if(data.c2 <= 0) data.c2 = 50; // Защита для цены автоклика

function update() {
    document.getElementById('score').innerText = Math.floor(data.score);
    document.getElementById('energy').innerText = Math.floor(data.energy);
    document.getElementById('max-energy').innerText = data.maxE;
    
    // Полоска энергии
    const energyPerc = (data.energy / data.maxE) * 100;
    document.getElementById('energy-bar').style.width = energyPerc + "%";
    
    // Обновление цен в магазине
    document.getElementById('p-click').innerText = data.c1;
    document.getElementById('p-auto').innerText = data.c2;
    document.getElementById('p-energy').innerText = data.c3;
    
    // Сохраняем прогресс
    localStorage.setItem('kirmel_v5', JSON.stringify(data));
}

// Клик по главной кнопке
document.getElementById('click-btn').onclick = () => {
    if (data.energy >= 1) {
        data.score += data.clickP;
        data.energy -= 1;
        update();
    }
};

// Переключение вкладок (Игра / Магазин)
window.showTab = (t) => {
    document.querySelectorAll('.tab').forEach(el => el.classList.remove('active'));
    document.getElementById(t + '-tab').classList.add('active');
};

// ИСПРАВЛЕННАЯ ФУНКЦИЯ ПОКУПОК 
window.buy = (type) => {
    if (type === 'click' && data.score >= data.c1) {
        data.score -= data.c1; 
        data.clickP++; 
        data.c1 = Math.floor(data.c1 * 1.8);
    } 
    else if (type === 'auto' && data.score >= data.c2) { 
        data.score -= data.c2; 
        data.autoP++; 
        data.c2 = Math.floor(data.c2 * 2.1);
    } 
    else if (type === 'energy' && data.score >= data.c3) {
        data.score -= data.c3; 
        data.maxE += 20; 
        data.energy = data.maxE; 
        data.c3 = Math.floor(data.c3 * 2.5);
    }
    update();
};

// Регенерация энергии и Автоклик (раз в секунду)
setInterval(() => {
    // Восстановление энергии
    if (data.energy < data.maxE) {
        data.energy = Math.min(data.maxE, data.energy + 1);
    }
    // Работа автокликера
    if (data.autoP > 0) {
        data.score += data.autoP;
    }
    update();
}, 1000);

// Сброс игры
window.reset = () => { 
    if(confirm("Реально сбросить весь прогресс?")) { 
        localStorage.removeItem('kirmel_v5'); 
        location.reload(); 
    }
};

// Запуск интерфейса при загрузке
update();
