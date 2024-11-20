const loginButton = document.getElementById('loginButton');

loginButton.addEventListener('click', event => {
    event.preventDefault(); // Prevent the form from reloading the page

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
    .then(response => {
        if (!response.ok) {
            return response.text().then(text => { throw new Error(text); });
        }
        return response.text();
    })
    .then(data => {
        alert(data); // Show success message
    })
    .catch(error => {
        alert('Error: ' + error.message); // Show error message
    });
});