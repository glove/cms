fetch('/api/v1/stats')
    .then(res => res.json())
    .then(res => {
        const totalUsers = res['total_users']
        const activeTickets = res['active_tickets']

        document.getElementById('total-users').innerText = totalUsers
        document.getElementById('active-tickets').innerText = activeTickets
    })