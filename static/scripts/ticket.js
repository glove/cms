document.getElementById('submit').addEventListener('click', () => {
    const response = document.getElementById('response').value

    fetch('/api/v1/ticket?id=' + document.getElementById('title').innerText.replace('Ticket ', ''), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            message: response
        })
    })
        .then(r => r.status)
        .then(r => {
            if (r === 200) {
                window.location.reload()
            }
        })
})