fetch('/api/v1/stats')
    .then(res => res.json())
    .then(res => {
        document.getElementById('total-users').innerText = res['total_users']
        document.getElementById('active-tickets').innerText = res['active_tickets']
        document.getElementById('assigned-tickets').innerText = res['assigned_tickets']
        document.getElementById('total-customers').innerText = res['total_customers']
        document.getElementById('total-representatives').innerText = res['total_csrs']
        document.getElementById('total-administrators').innerText = res['total_admins']
    })