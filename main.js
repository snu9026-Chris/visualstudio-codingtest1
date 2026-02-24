// Theme toggle logic
const themeToggle = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme');

if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'dark') {
        themeToggle.textContent = '☀️ Light Mode';
    }
}

themeToggle.addEventListener('click', () => {
    let theme = document.documentElement.getAttribute('data-theme');
    if (theme === 'dark') {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
        themeToggle.textContent = '🌙 Dark Mode';
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        themeToggle.textContent = '☀️ Light Mode';
    }
});

class LottoTicket extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });

        const wrapper = document.createElement('div');
        wrapper.setAttribute('class', 'ticket');
        wrapper.setAttribute('aria-live', 'polite');

        const title = document.createElement('h1');
        title.textContent = 'Lotto Number Generator';

        const profileImg = document.createElement('img');
        profileImg.src = 'person.jpg';
        profileImg.setAttribute('class', 'profile-img');
        profileImg.alt = 'Lucky Muse';

        const numbersContainer = document.createElement('div');
        numbersContainer.setAttribute('class', 'numbers');

        const button = document.createElement('button');
        button.textContent = 'Generate New Numbers';
        button.setAttribute('aria-label', 'Generate a new set of lottery numbers');
        button.addEventListener('click', () => this.generateNumbers(numbersContainer));

        const style = document.createElement('style');
        style.textContent = `
            :host {
                --color-yellow: #f9d949;
                --color-blue: #6cb2f5;
                --color-red: #f47a7a;
                --color-gray: #b0b0b0;
                --color-green: #82e0aa;
            }

            .ticket {
                display: flex;
                flex-direction: column;
                align-items: center;
                padding: 40px;
                background: var(--ticket-bg, #ffffff);
                color: var(--text-color, #333333);
                border-radius: 20px;
                box-shadow: 0 10px 30px var(--shadow-color), 0 0 0 1px var(--border-color);
                width: 320px;
                transition: all 0.3s ease;
            }

            .profile-img {
                width: 120px;
                height: 120px;
                border-radius: 50%;
                object-fit: cover;
                margin-bottom: 20px;
                border: 4px solid var(--color-blue);
                box-shadow: 0 5px 15px var(--shadow-color);
            }
            
            h1 {
                margin: 0 0 30px 0;
                font-size: 1.5em;
                color: var(--text-color, #333333);
                font-weight: 600;
            }

            .numbers {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 15px;
                margin-bottom: 30px;
            }

            .number {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 60px;
                height: 60px;
                border-radius: 50%;
                font-size: 1.5em;
                font-weight: 600;
                color: #333;
                background-color: #eee;
                border: 2px solid transparent;
                transition: transform 0.2s ease;
            }

            .number:hover {
                transform: scale(1.1);
            }

            button {
                padding: 15px 30px;
                border: none;
                border-radius: 10px;
                background-color: #007bff;
                color: #fff;
                font-size: 1.1em;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
                box-shadow: 0 4px 15px rgba(0, 123, 255, 0.3);
            }

            button:hover {
                background-color: #0056b3;
                transform: translateY(-2px);
                box-shadow: 0 8px 25px rgba(0, 123, 255, 0.4);
            }
        `;

        shadow.appendChild(style);
        shadow.appendChild(wrapper);
        wrapper.appendChild(profileImg);
        wrapper.appendChild(title);
        wrapper.appendChild(numbersContainer);
        wrapper.appendChild(button);

        this.generateNumbers(numbersContainer);
    }

    getColorForNumber(number) {
        if (number <= 10) return 'var(--color-yellow)';
        if (number <= 20) return 'var(--color-blue)';
        if (number <= 30) return 'var(--color-red)';
        if (number <= 40) return 'var(--color-gray)';
        return 'var(--color-green)';
    }

    generateNumbers(container) {
        container.innerHTML = '';
        const numbers = new Set();
        while (numbers.size < 6) {
            numbers.add(Math.floor(Math.random() * 45) + 1);
        }

        const sortedNumbers = [...numbers].sort((a, b) => a - b);
        
        let numberString = 'Generated lottery numbers are: ';

        for (const number of sortedNumbers) {
            const numberElement = document.createElement('div');
            numberElement.setAttribute('class', 'number');
            numberElement.textContent = number;
            const color = this.getColorForNumber(number);
            numberElement.style.backgroundColor = color;
            numberElement.style.borderColor = color.replace(')', ', 0.5)').replace('var(', 'rgba(');
            numberElement.setAttribute('aria-label', `Lottery number ${number}`);
            container.appendChild(numberElement);
            numberString += `${number}, `;
        }
        container.setAttribute('aria-label', numberString.slice(0, -2));
    }
}

customElements.define('lotto-ticket', LottoTicket);