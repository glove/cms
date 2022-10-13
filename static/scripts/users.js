document.getElementById('submit').addEventListener('click', () => {
    const type = document.getElementById('query-type').value
    const query = document.getElementById('query').value

    fetch('/api/v1/customers', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify({
            type: type,
            query: query
        })
    }).then(r => r.json())
      .then(response => {
          const elements = document.getElementById('elements')
          elements.childNodes.forEach(node => node.remove())

          for(let user of response) {
              const element = document.createElement('li')
              const emails = user['email']

              element.innerHTML = '' +
                  '<h3>' + user['name'] + '</h3>' +
                  'Address: ' + user['address'] + '<br>' +
                  'Phone Number: ' + user['phone'] + '<br>' +
                  'Email Addresses: ' + emails.join(', ')

              elements.appendChild(element)
          }
      })
})