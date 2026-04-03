document.addEventListener('DOMContentLoaded', () => {
    
    // --- BÀI TẬP 1: TÌM KIẾM SẢN PHẨM ---
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        const products = [
            { name: "Laptop Dell XPS", price: "25.000.000đ" },
            { name: "iPhone 15 Pro", price: "28.000.000đ" },
            { name: "Bàn phím cơ ATRI", price: "1.200.000đ" },
            { name: "Chuột không dây", price: "450.000đ" },
            { name: "Tai nghe Lavender", price: "1.500.000đ" }
        ];

        const renderProducts = (list) => {
            const container = document.getElementById('product-list');
            const msg = document.getElementById('message');
            container.innerHTML = list.map(p => `
                <div class="card">
                    <h3>${p.name}</h3>
                    <p style="color: #ff007f">${p.price}</p>
                </div>
            `).join('');
            msg.textContent = list.length === 0 ? "⚠️ Không tìm thấy sản phẩm!" : "";
        };

        searchInput.addEventListener('input', (e) => {
            const keyword = e.target.value.toLowerCase().trim();
            const filtered = products.filter(p => p.name.toLowerCase().includes(keyword));
            renderProducts(filtered);
        });
        
        renderProducts(products); // Khởi tạo lần đầu
    }

    // --- BÀI TẬP 2: VALIDATE FORM & LOCALSTORAGE ---
    const regForm = document.getElementById('regForm');
    if (regForm) {
        regForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

            if (!emailRegex.test(email)) {
                alert("Email không hợp lệ!");
                return;
            }
            if (!passRegex.test(password)) {
                alert("Mật khẩu phải từ 8 ký tự, gồm chữ hoa, thường và số!");
                return;
            }

            const userData = { email, timestamp: new Date().toLocaleString() };
            localStorage.setItem('user_session', JSON.stringify(userData));
            alert("Đăng ký thành công! Đã lưu session vào LocalStorage.");
        });
    }

    // --- BÀI TẬP 3: COUNTDOWN TIMER ---
    const timerDisplay = document.getElementById('timer');
    if (timerDisplay) {
        let duration = 600; // 10 phút
        const interval = setInterval(() => {
            let min = Math.floor(duration / 60);
            let sec = duration % 60;
            
            timerDisplay.textContent = `${min}:${sec < 10 ? '0' + sec : sec}`;
            
            if (duration <= 60) timerDisplay.classList.add('warning');
            
            if (duration <= 0) {
                clearInterval(interval);
                alert("Hết giờ làm bài!");
            }
            duration--;
        }, 1000);
    }
});
