const logInUsername = document.getElementById('logInUsername');
const logInPassword = document.getElementById('logInPassword');

const signUpUsername = document.getElementById('signUpUsername');
const signUpPassword = document.getElementById('signUpPassword');

const logInButton = document.querySelector('#logInForm input[type="submit"]');
const signUpButton = document.querySelector('#signUpForm input[type="submit"]');

function logIn(e) {
    e.preventDefault();

    const username = logInUsername.value;
    const password = logInPassword.value;

    fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                console.log(data.msg);
                window.location = 'http://localhost:5500/client/home.html';
            } else {
                console.log(data.msg);
                const message = document.createElement('p');
                message.textContent = data.msg;
                message.style.color = 'rgb(180, 130, 70)'; // Change the color to steel blue

                const signUpForm = document.querySelector('#logInForm');
                signUpForm.insertBefore(message, signUpForm.children[signUpForm.children.length - 1]);
            }
        })
        .catch(error => console.error('Error:', error));
}

function signUp(e) {
    e.preventDefault();

    const username = signUpUsername.value;
    const password = signUpPassword.value;

    fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                console.log(data.msg);
                let message = document.querySelector('#message');
                if (!message) {
                    message = document.createElement('p');
                    message.id = 'message';
                    const signUpForm = document.querySelector('#signUpForm');
                    signUpForm.insertBefore(message, signUpForm.children[signUpForm.children.length - 1]);
                }
                message.textContent = "User registered successfully";
                message.style.color = 'rgb(34, 139, 34)';
            } else {
                console.log(data.msg);
                let message = document.querySelector('#message');
                if (!message) {
                    message = document.createElement('p');
                    message.id = 'message';
                    const signUpForm = document.querySelector('#signUpForm');
                    signUpForm.insertBefore(message, signUpForm.children[signUpForm.children.length - 1]);
                }
                message.textContent = data.msg;
                message.style.color = 'rgb(178, 34, 34)';
            }
        })
        .catch(error => console.error('Error:', error));

}

// Event listeners
logInButton.addEventListener('click', logIn);
signUpButton.addEventListener('click', signUp);