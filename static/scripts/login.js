document.getElementById('submit').addEventListener('click', () => {
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value

    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    })
        .then(response => response.status)
        .then(status => {
            switch (status) {
                case 200:
                    window.location.href = '/dashboard'
                    break
                default:
                    document.getElementById('invalid-text').style.visibility = 'visible'
                    break
            }
        })
})