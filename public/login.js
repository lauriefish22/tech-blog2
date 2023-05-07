const loginFormHandler = async (event) => {
    event.preventDefault();

    const username = document.querySelector('#user-login').value;
    const password = document.querySelector('password-login').value;

    if (username && password) {
        const response = await fetch('/api/user/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'content-type': 'application/json' },
        });
        if (response.ok) {
            document.location.replace('/')
        } else {
            alert('Failed to login');
        }
    }
};
document
    .querySelector('.login-form')
    .addEventListener('submit', loginFormHandler);

