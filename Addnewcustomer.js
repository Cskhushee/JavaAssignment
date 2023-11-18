document.getElementById('customerForm').addEventListener('submit', function(event) {
  event.preventDefault(); 

  
  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;
  const street = document.getElementById('street').value;
  const address = document.getElementById('address').value;
  const city = document.getElementById('city').value;
  const state = document.getElementById('state').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;

  
  const newCustomer = {
    firstName: firstName,
    lastName: lastName,
    street: street,
    address: address,
    city: city,
    state: state,
    email: email,
    phone: phone
  };


  console.log('New Customer Details:', newCustomer);
  
  fetch('https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newCustomer)
  })
  .then(response => {
    
  })
  .catch(error => {
    
  });

  const successMessage = document.createElement('p');
  successMessage.textContent = 'New Customer is Inserted Successfully!';
  document.body.appendChild(successMessage);

  
  setTimeout(function() {
    successMessage.remove();
  }, 3000); 
});

function clearFormFields() {
  
  document.getElementById('firstName').value = '';
  document.getElementById('lastName').value = '';
  document.getElementById('street').value = '';
  document.getElementById('address').value = '';
  document.getElementById('city').value = '';
  document.getElementById('email').value = '';
  document.getElementById('phone').value = '';
  
}

document.getElementById('customerForm').addEventListener('submit', function(event) {
  event.preventDefault();

  
  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;
  const street = document.getElementById('street').value;
  const address = document.getElementById('address').value;
  const city = document.getElementById('city').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  

  
  const newCustomer = {
    firstName: firstName,
    lastName: lastName,
    street: street,
    address: address,
    city: city,
    state: state,
    email: email,
    phone: phone
  };

  addNewCustomerToList(newCustomer);

});

function goToCustomerList() {
    const apiUrl = 'https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp';
  
    fetch(`${apiUrl}?cmd=get_customer_list`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer token_recieved_in_authentication_API_call'
      }
    })
    .then(response => {
      if (response.status === 200) {
        return response.json();
      } else {
        console.error('Failed to get customer list. Status:', response.status);
      }
    })
    .then(data => {
      // Process the received data (list of customers)
      console.log('Customer List:', data);
      // Display the list, update UI, etc.
    })
    .catch(error => {
      console.error('Error:', error);
    });
  
  window.location.href = 'Customerlist.html';
}
