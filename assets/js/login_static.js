$(document).on('submit', '#form-login', function(event) {
    event.preventDefault();
    var un = $('#username').val();
    var pw = $('#password').val();

    // Default admin credentials
    var storedPassword = localStorage.getItem('admin_password') || 'admin';

    if (un === 'admin' && pw === storedPassword) {
        localStorage.setItem('session_user', 'admin');
        window.location.href = 'home.html';
    } else {
        alert('Invalid Username / Password!');
    }
});
