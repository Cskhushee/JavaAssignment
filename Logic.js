document.getElementById('loginForm').addEventListener('submit', function (event) {
  event.preventDefault(); 

  
  const loginId = document.getElementById('login_id').value;
  const password = document.getElementById('password').value;

  
  const loginEndpoint = ': https://qa2.sunbasedata.com/sunbase/portal/api/assignment_auth.jsp';

  
  fetch(loginEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
      body :JSON.stringify({ login_id: loginId, password: password })
  })
    .then(response => {
      if (response.ok) {
        return response.json(); 
      } else {
        throw new Error('Login failed');
      }
    })
    .then(data => {
      
      document.getElementById('tokenDisplay').innerText = `Bearer Token: ${data.token}`;
      
    })
    .catch(error => {
      document.getElementById('tokenDisplay').innerText = 'Failed to authenticate. Please check your credentials.';
      console.error('Login Error:', error);
    });
});
function authenticateUser() {
  const authUrl = 'https://qa2.sunbasedata.com/sunbase/portal/api/assignment_auth.jsp';
  const loginId = 'test@sunbasedata.com';
  const password = 'Test@123';

  const requestBody = {
    login_id: loginId,
    password: password
  };

  fetch(authUrl, {
    method: 'POST',
    body: JSON.stringify(requestBody),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .then(data => {
    if (data.token) {
      const token = data.token;
      
      console.log('Token:', token);
      
    } else {
      console.error('Authentication failed. Please check credentials.');
      
    }
  })
  .catch(error => {
    console.error('Error:', error);
    
  });
}
