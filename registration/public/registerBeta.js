const writeButton = document.getElementById('writeButton');

writeButton.addEventListener("click", () => {
  function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var heble = Math.random() * 16 | 0, miau = c === 'x' ? heble : (heble & 0x3 | 0x8);
      return miau.toString(16);
    });
  }

  const UUID = generateUUID();
  const firstName = document.getElementById('firstName').value;
  const secondName = document.getElementById('secondName').value;
  const gender = document.querySelector('select').value;
  const email = document.getElementById('E-mail').value;
  const password = document.getElementById('password').value;

  const content = {
    user: {
      uuid: UUID,
      firstName: firstName,
      secondName: secondName,
      gender: gender,
      email: email,
      password: password
    }
  };

  fetch('http://localhost:3000/write-file', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ content })
  })
    .then(response => {
      if (!response.ok) {
        return response.text().then(text => {
          throw new Error(text);
        });
      }
      return response.text();
    })
    .then(data => {
      alert(data);
    })
    .catch(error => {
      alert('Error: ' + error.message);
    });
});
