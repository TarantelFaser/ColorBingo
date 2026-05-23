const COLORS_4 = ['red', 'blue', 'green', 'yellow'];
const COLORS_6 = ['red', 'blue', 'green', 'yellow', 'orange', 'purple'];

const GRID_SIZE = 5;
const TOTAL_CELLS = GRID_SIZE * GRID_SIZE;
const CENTER_INDEX = Math.floor(TOTAL_CELLS / 2);

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function buildColorPool(colors) {
    const colorableCells = TOTAL_CELLS - 1;
    const perColor = colorableCells / colors.length;
    const pool = [];
    for (const color of colors) {
        for (let i = 0; i < perColor; i++) {
            pool.push(color);
        }
    }
    return shuffle(pool);
}

function fillCard(cardEl, colors) {
    const pool = buildColorPool(colors);
    const centerColor = colors[Math.floor(Math.random() * colors.length)];

    cardEl.innerHTML = '';

    let poolIndex = 0;
    for (let i = 0; i < TOTAL_CELLS; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        if (i === CENTER_INDEX) {
            cell.classList.add(centerColor);
        } else {
            cell.classList.add(pool[poolIndex++]);
        }
        cardEl.appendChild(cell);
    }
}

function generateCards() {
    const colorCount = Number(document.querySelector('input[name="colorCount"]:checked').value);
    const colors = colorCount === 6 ? COLORS_6 : COLORS_4;
    fillCard(document.getElementById('card1'), colors);
    fillCard(document.getElementById('card2'), colors);
}

document.getElementById('generateBtn').addEventListener('click', generateCards);
document.getElementById('printBtn').addEventListener('click', () => window.print());

generateCards();
