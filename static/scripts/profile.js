document.getElementById('submit').addEventListener('click', () => {
    const newUsername = document.getElementById('username').value

    fetch('/api/v1/namechange', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: newUsername
        })
    }).then(r => r.status)
      .then(status => {
          const responseElement = document.getElementById('response')

          switch (status) {
                case 200:
                    responseElement.innerText = 'Successfully changed username!'
                    break
              default:
                  responseElement.innerText = 'An error occurred while attempting to change your username!'
                  break
            }
        }
      )
})