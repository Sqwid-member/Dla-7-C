const viewCountElement = document.getElementById('viewCount');
const clickCountElement = document.getElementById('clickCount');
const button = document.getElementById('redirectButton');
const hiddenButton = document.getElementById('hiddenButton');
const adminPanel = document.getElementById('adminPanel');
const adminPassword = document.getElementById('adminPassword');
const submitPassword = document.getElementById('submitPassword');
const ipList = document.getElementById('ipList');

const adminPasswordValue = '1234';

if (!localStorage.getItem('viewCount')) localStorage.setItem('viewCount', 0);
if (!localStorage.getItem('clickCount')) localStorage.setItem('clickCount', 0);
if (!localStorage.getItem('ipList')) localStorage.setItem('ipList', JSON.stringify([]));

function updateCounts() {
    viewCountElement.textContent = localStorage.getItem('viewCount');
    clickCountElement.textContent = localStorage.getItem('clickCount');
}

function incrementViewCount() {
    localStorage.setItem('viewCount', parseInt(localStorage.getItem('viewCount'), 10) + 1);
    updateCounts();
}

function incrementClickCount() {
    localStorage.setItem('clickCount', parseInt(localStorage.getItem('clickCount'), 10) + 1);
    saveUserIP();
    updateCounts();
}

async function saveUserIP() {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    const ips = JSON.parse(localStorage.getItem('ipList'));
    ips.push(data.ip);
    localStorage.setItem('ipList', JSON.stringify(ips));
}

function showAdminPanel() {
    adminPanel.classList.remove('hidden');
}

function hideAdminPanel() {
    adminPanel.classList.add('hidden');
    ipList.classList.add('hidden');
}

function validatePassword() {
    if (adminPassword.value === adminPasswordValue) {
        const ips = JSON.parse(localStorage.getItem('ipList'));
        ipList.innerHTML = `<h3>Adresy IP użytkowników:</h3><ul>${ips.map(ip => `<li>${ip}</li>`).join('')}</ul>`;
        ipList.classList.remove('hidden');
    } else {
        alert('Nieprawidłowe hasło!');
    }
}

button.addEventListener('click', () => {
    incrementClickCount();
    window.location.href = 'https://example.com';
});

hiddenButton.addEventListener('click', showAdminPanel);
submitPassword.addEventListener('click', validatePassword);
adminPassword.addEventListener('blur', hideAdminPanel);

incrementViewCount();
updateCounts();
const canvas = document.getElementById('rippleCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ripples = [];

class Ripple {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = 0;
        this.alpha = 1;
    }

    draw() {
        if (this.alpha <= 0) return;

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.strokeStyle = `rgba(200, 200, 200, ${this.alpha})`;
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.closePath();

        this.radius += 2;
        this.alpha -= 0.02;
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ripples.forEach((ripple, index) => {
        ripple.draw();
        if (ripple.alpha <= 0) {
            ripples.splice(index, 1);
        }
    });

    requestAnimationFrame(animate);
}

canvas.addEventListener('click', (e) => {
    const x = e.clientX;
    const y = e.clientY;

    ripples.push(new Ripple(x, y));
});

animate();
