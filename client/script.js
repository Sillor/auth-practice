from;

const logInUsername = document.getElementById('logInUsername');
const logInPassword = document.getElementById('logInPassword');

const signInUsername = document.getElementById('signInUsername');
const signInPassword = document.getElementById('signInPassword');

const logInButton = document.querySelector('#logInForm input[type="submit"]');
const signInButton = document.querySelector('#signInForm input[type="submit"]');

function logIn(e) {
    e.preventDefault();

    const username = logInUsername.value;
    const password = logInPassword.value;

    fetch(['/login'], {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                window.location.href = '/home.html';
            } else {
                alert(data.message);
            }
        })
        .catch(err => console.log(err));
}



// Event listeners
logInButton.addEventListener('click', logIn);
signInButton.addEventListener('click', signIn);