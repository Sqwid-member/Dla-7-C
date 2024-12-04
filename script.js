// Elements
const loginButton = document.getElementById('loginButton');
const createAccountButton = document.getElementById('createAccountButton');
const createAccountModal = document.getElementById('createAccountModal');
const createAccountForm = document.getElementById('createAccountForm');
const errorMessage = document.getElementById('error-message');
const hiddenButton = document.getElementById('hiddenButton');
const adminPanel = document.getElementById('adminPanel');
const adminButton = document.getElementById('adminButton');

// Data Storage (replace with actual server-side handling later)
let users = JSON.parse(localStorage.getItem('users')) || [];
let tokens = []; // Replace with actual token storage

// Show create account modal
createAccountButton.addEventListener('click', () => {
    createAccountModal.style.display = 'block';
});

// Close modal
function closeModal() {
    createAccountModal.style.display = 'none';
}

// Handle create account form submission
createAccountForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password1 = document.getElementById('password1').value;
    const password2 = document.getElementById('password2').value;
    
    // Validate passwords
    if (password1 !== password2) {
        errorMessage.textContent = 'Hasła nie pasują!';
        return;
    }

    if (password1.length < 5) {
        errorMessage.textContent = 'Hasło musi mieć przynajmniej 5 znaków!';
        return;
    }

    // Save user to "database"
    users.push({ username, password: password1 });
    localStorage.setItem('users', JSON.stringify(users)); // Save to local storage for now

    // Close modal
    closeModal();
    alert('Konto zostało utworzone!');
});

// Show hidden button
loginButton.addEventListener('click', () => {
    hiddenButton.classList.remove('hidden');
});

// Show admin panel with button
hiddenButton.addEventListener('click', () => {
    adminPanel.classList.remove('hidden');
});

// Admin button (you can add functionality here)
adminButton.addEventListener('click', () => {
    alert('Przycisk admina kliknięty');
});
