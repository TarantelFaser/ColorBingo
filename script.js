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

function generateCard() {
    const colorCount = Number(document.querySelector('input[name="colorCount"]:checked').value);
    const colors = colorCount === 6 ? COLORS_6 : COLORS_4;
    const pool = buildColorPool(colors);

    const card = document.getElementById('card');
    card.innerHTML = '';

    const centerColor = colors[Math.floor(Math.random() * colors.length)];

    let poolIndex = 0;
    for (let i = 0; i < TOTAL_CELLS; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        if (i === CENTER_INDEX) {
            cell.classList.add(centerColor);
        } else {
            cell.classList.add(pool[poolIndex++]);
        }
        card.appendChild(cell);
    }
}

document.getElementById('generateBtn').addEventListener('click', generateCard);
document.getElementById('printBtn').addEventListener('click', () => window.print());

generateCard();
