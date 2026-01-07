const HandleRegister = async ()=>{
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const repassword = document.getElementById('repassword').value.trim();

    if (!username || !password || !repassword) {
        showToast("Tài khoản hoặc mật khẩu không hợp lệ!", "error");
        return;
    }
    if (password !== repassword) {
        showToast("Mật khẩu không khớp !", "error");
        return;
    }

    const response =  await fetch('http://localhost:8080/auth/register', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username : username,
            password : password,
        })
    })
    if (response.ok) {
        showToast("Đăng ký thành công !", "success");
    }
    else showToast("Đăng ký thất bại !", "error");
}

function initToast() {
    if (!document.querySelector(".toast-container")) {
        const container = document.createElement("div");
        container.className = "toast-container";
        document.body.appendChild(container);
    }
}

function showToast(message, type = "success", duration = 3000) {
    initToast();

    const toast = document.createElement("div");
    toast.className = `toast ${type}`;

    let icon = "✔";
    if (type === "error") icon = "✖";
    if (type === "warning") icon = "⚠";

    toast.innerHTML = `
        <span class="icon">${icon}</span>
        <span>${message}</span>
    `;

    const container = document.querySelector(".toast-container");
    container.appendChild(toast);

    // Tự động biến mất
    setTimeout(() => {
        toast.style.animation = "fadeOut 0.3s ease forwards";
        setTimeout(() => toast.remove(), 300);
    }, duration);
}
