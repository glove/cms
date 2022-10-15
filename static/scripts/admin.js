document.getElementById('csr-submit').addEventListener('click', () => {
    const username = document.getElementById('csr-username').value
    const email = document.getElementById('csr-email').value
    const password = document.getElementById('csr-password').value

    const response = document.getElementById('csr-response')

    if (username.length < 3 || !email.includes('@') || password.length < 8) {
        response.innerHTML = 'An unexpected error occurred while attempting to create a new CSR account!' +
            '<br>Please ensure that your username is greater than 3 characters in length, ' +
            '<br>that your email address is valid, and password is greater than 8 characters.'
        return
    }

    fetch('/api/v1/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            username: username,
            password: password,
            role: 'csr'
        })
    })
        .then(r => r.status)
        .then(status => {
            switch (status) {
                case 500:
                    response.innerHTML = 'Unable to create account! Data missing.'
                    break
                case 401:
                    response.innerHTML = 'You don\'t have permission to do this!'
                    break
                case 400:
                    response.innerHTML = 'A user with that username or email already exists!'
                    break
                case 200:
                    response.innerHTML = 'Successfully created account!'
                    break
            }
        }
    )
})