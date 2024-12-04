const viewCountElement = document.getElementById('viewCount');
const clickCountElement = document.getElementById('clickCount');
const button = document.getElementById('redirectButton');

if (!localStorage.getItem('viewCount')) localStorage.setItem('viewCount', 0);
if (!localStorage.getItem('clickCount')) localStorage.setItem('clickCount', 0);

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
    updateCounts();
}

button.addEventListener('click', () => {
    incrementClickCount();
    window.location.href = 'https://example.com';
});

incrementViewCount();
