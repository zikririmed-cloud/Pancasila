function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    const icon = document.getElementById('menu-icon');
    if (menu) {
        if (menu.classList.contains('hidden')) {
            menu.classList.remove('hidden');
            if (icon) icon.className = "fas fa-times";
        } else {
            menu.classList.add('hidden');
            if (icon) icon.className = "fas fa-bars";
        }
    }
}

let isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
let username = localStorage.getItem('username') || '';

function updateNavbar() {
    const loginBtn = document.getElementById('login-btn');
    if (loginBtn) {
        if (isLoggedIn) {
            loginBtn.innerHTML = `
                👤 ${username} 
                <span onclick="logout()" class="text-sm ml-2 underline text-red-600 cursor-pointer">(Logout)</span>
            `;
        } else {
            loginBtn.innerHTML = `<i class="fas fa-user"></i> Login`;
        }
    }
}

function showLoginModal() {
    const existing = document.getElementById('loginModal');
    if (existing) existing.remove();

    const modalHTML = `
    <div id="loginModal" class="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-[9999]">
        <div class="bg-white rounded-3xl p-8 w-full max-w-md mx-4 shadow-2xl">
            <h2 class="text-3xl font-bold mb-6 text-center text-[#c8102e]">Login</h2>
            
            <input type="text" id="username" placeholder="Username" 
                   class="w-full p-4 border border-gray-300 rounded-2xl mb-4 focus:outline-none focus:border-[#c8102e]">
            
            <input type="password" id="password" placeholder="Password" 
                   class="w-full p-4 border border-gray-300 rounded-2xl mb-6 focus:outline-none focus:border-[#c8102e]">
            
            <button onclick="handleLogin()" 
                    class="w-full bg-[#c8102e] hover:bg-[#9c0c24] text-white py-4 rounded-2xl font-bold text-lg transition">
                Masuk
            </button>
            
            <p class="text-center text-sm text-gray-500 mt-4">
                Demo Login:<br>
                <strong>Username:</strong> admin <br>
                <strong>Password:</strong> 12345
            </p>
            
            <button onclick="closeLoginModal()" 
                    class="mt-6 text-gray-500 w-full text-sm hover:text-gray-700">
                Batal
            </button>
        </div>
    </div>`;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

function handleLogin() {
    const user = document.getElementById('username').value.trim();
    const pass = document.getElementById('password').value.trim();

    if (user && pass === '12345') {
        isLoggedIn = true;
        username = user || 'Pengguna';
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username', username);
        
        closeLoginModal();
        updateNavbar();
        
        // Tampilan Sukses yang Cantik
        showSuccessMessage(username);
    } else {
        alert("❌ Password salah!\n\nHint: Password = 12345");
    }
}

function showSuccessMessage(name) {
    const successHTML = `
    <div id="successModal" class="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-[10000]">
        <div class="bg-white rounded-3xl p-10 text-center shadow-2xl max-w-sm mx-4">
            <div class="text-5xl mb-4">✅</div>
            <h2 class="text-2xl font-bold text-green-600 mb-2">Login Berhasil!</h2>
            <p class="text-gray-700 text-lg">Selamat datang, <strong>${name}</strong></p>
            <button onclick="closeSuccessModal()" 
                    class="mt-8 bg-[#c8102e] text-white px-10 py-3 rounded-2xl font-bold hover:bg-[#9c0c24]">
                OK
            </button>
        </div>
    </div>`;
    
    document.body.insertAdjacentHTML('beforeend', successHTML);
}

function closeSuccessModal() {
    const modal = document.getElementById('successModal');
    if (modal) modal.remove();
}

function closeLoginModal() {
    const modal = document.getElementById('loginModal');
    if (modal) modal.remove();
}

function logout() {
    if (confirm("Yakin ingin logout?")) {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('username');
        isLoggedIn = false;
        username = '';
        updateNavbar();
    }
}

window.onload = function() {
    updateNavbar();
};

window.toggleMobileMenu = toggleMobileMenu;
window.showLoginModal = showLoginModal;
window.handleLogin = handleLogin;
window.closeLoginModal = closeLoginModal;
window.logout = logout;

