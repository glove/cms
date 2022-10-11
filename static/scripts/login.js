document.getElementById('submit').addEventListener('click', () => {
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value

    fetch('/login', {
        email: email,
        password: password
    }).then(r => {
        console.log(r)
    })
})