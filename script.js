let isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
let username = localStorage.getItem('username') || '';

function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    const icon = document.getElementById('menu-icon');
    
    if (!menu) return;

    menu.classList.toggle('hidden');
    if (icon) {
        icon.className = menu.classList.contains('hidden') ? 'fas fa-bars' : 'fas fa-times';
    }
}

function updateNavbar() {
    const loginButtons = document.querySelectorAll('[id^="login-btn"], button[onclick="showLoginModal()"]');
    
    loginButtons.forEach(btn => {
        if (isLoggedIn) {
            btn.className = "flex items-center gap-2 bg-gray-100 text-gray-800 px-5 py-2 rounded-2xl font-medium border border-gray-200";
            btn.innerHTML = `
                <i class="fas fa-user text-green-600"></i> 
                <span>${username}</span>
                <span onclick="event.stopPropagation(); logout();" class="text-xs ml-2 text-red-600 hover:underline cursor-pointer font-bold">(Logout)</span>
            `;
            btn.removeAttribute('onclick');
        } else {
            btn.className = "flex items-center justify-center gap-2 bg-[#c8102e] text-white px-5 py-2 rounded-2xl font-medium hover:bg-[#9c0c24] transition-colors w-full md:w-auto";
            btn.innerHTML = `<i class="fas fa-user"></i> Login`;
            btn.setAttribute('onclick', 'showLoginModal()');
        }
    });
}

function showLoginModal() {
    const existing = document.getElementById('loginModal');
    if (existing) existing.remove();

    const modalHTML = `
    <div id="loginModal" class="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-[9999] p-4 transition-opacity duration-300">
        <div class="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl transform scale-100 transition-transform">
            <h2 class="text-3xl font-bold mb-6 text-center text-[#c8102e]">Login</h2>
            
            <input type="text" id="username" placeholder="Username" 
                   class="w-full p-4 border border-gray-200 rounded-2xl mb-4 focus:outline-none focus:border-[#c8102e] bg-gray-50 focus:bg-white transition-all">
            
            <input type="password" id="password" placeholder="Password" 
                   class="w-full p-4 border border-gray-200 rounded-2xl mb-6 focus:outline-none focus:border-[#c8102e] bg-gray-50 focus:bg-white transition-all">
            
            <button onclick="handleLogin()" 
                    class="w-full bg-[#c8102e] hover:bg-[#9c0c24] text-white py-4 rounded-2xl font-bold text-lg transition shadow-sm">
                Masuk
            </button>
            
            <p class="text-center text-sm text-gray-500 mt-5 bg-gray-50 p-3 rounded-xl border border-gray-100">
                <strong>Demo Akses:</strong><br>
                Username: <span class="font-mono text-gray-800">admin</span> | Password: <span class="font-mono text-gray-800">12345</span>
            </p>
            
            <button onclick="closeLoginModal()" 
                    class="mt-5 text-gray-400 w-full text-sm hover:text-gray-600 transition-colors">
                Batal
            </button>
        </div>
    </div>`;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

function handleLogin() {
    const userField = document.getElementById('username');
    const passField = document.getElementById('password');

    const user = userField ? userField.value.trim() : '';
    const pass = passField ? passField.value.trim() : '';

    if (user && pass === '12345') {
        isLoggedIn = true;
        username = user;
        
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username', username);
        
        closeLoginModal();
        updateNavbar();
        showSuccessMessage(username);
    } else {
        alert("❌ Password salah!\n\nPetunjuk: Isikan password dengan 12345");
    }
}

function showSuccessMessage(name) {
    const successHTML = `
    <div id="successModal" class="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-[10000] p-4">
        <div class="bg-white rounded-3xl p-10 text-center shadow-2xl max-w-sm w-full transform transition-all">
            <div class="text-5xl mb-4 animate-bounce">✅</div>
            <h2 class="text-2xl font-bold text-green-600 mb-2">Login Berhasil!</h2>
            <p class="text-gray-600 text-base">Selamat datang kembali, <br><strong class="text-gray-800 text-lg">${name}</strong></p>
            <button onclick="closeSuccessModal()" 
                    class="mt-6 w-full bg-[#c8102e] text-white py-3 rounded-2xl font-bold hover:bg-[#9c0c24] transition-colors shadow-sm">
                Selesai
            </button>
        </div>
    </div>`;
    
    document.body.insertAdjacentHTML('beforeend', successHTML);
}

function closeLoginModal() {
    const modal = document.getElementById('loginModal');
    if (modal) modal.remove();
}

function closeSuccessModal() {
    const modal = document.getElementById('successModal');
    if (modal) modal.remove();
}

function logout() {
    if (confirm("Apakah Anda yakin ingin keluar dari akun?")) {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('username');
        
        isLoggedIn = false;
        username = '';
        
        updateNavbar();
        
        const mobileMenu = document.getElementById('mobile-menu');
        if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
            toggleMobileMenu();
        }
    }
}

window.onload = function() {
    updateNavbar();
};

window.toggleMobileMenu = toggleMobileMenu;
window.showLoginModal = showLoginModal;
window.handleLogin = handleLogin;
window.closeLoginModal = closeLoginModal;
window.closeSuccessModal = closeSuccessModal;
window.logout = logout;
