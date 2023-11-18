function createNewCustomer() {
  const apiUrl = 'https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp';

  const customerData = {
    first_name: 'Jane',
    last_name: 'Doe',
    street: 'Elvnu Street',
    address: 'H no 2',
    city: 'Delhi',
    state: 'Delhi',
    email: 'sam@gmail.com',
    phone: '12345678'
  };

  fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer token_recieved_in_authentication_API_call'
    },
    body: JSON.stringify({
      cmd: 'create',
      ...customerData
    })
  })
  .then(response => {
    if (response.status === 201) {
      console.log('Customer created successfully.');
      
    } else if (response.status === 400) {
      console.error('First Name or Last Name is missing.');
      
    } else {
      console.error('Failed to create customer. Status:', response.status);
      
    }
  })
  .catch(error => {
    console.error('Error:', error);
    
  });
}


const customers = [
  {
    id: 1,
    firstName: 'Jane',
    lastName: 'Doe',
    address: 'Elvnu Street',
    city: 'Delhi',
    state: 'Delhi',
    email: 'sam@gmail.com',
    phone: '12345678'
  },
  
];

function displayCustomers() {
  const tableBody = document.querySelector('.customer-table tbody');
  tableBody.innerHTML = '';

  customers.forEach(customer => {
    const row = document.createElement('tr');
    row.setAttribute('data-id', customer.id); 
    row.innerHTML = `
      <td>${customer.firstName}</td>
      <td>${customer.lastName}</td>
      <td>${customer.address}</td>
      <td>${customer.city}</td>
      <td>${customer.state}</td>
      <td>${customer.email}</td>
      <td>${customer.phone}</td>
      <td>
        <button onclick="editCustomer(${customer.id})">Edit</button>
        <button onclick="deleteCustomer(${customer.id})">Delete</button>
        <button style="display:none;" onclick="saveChanges(${customer.id})">Save</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

function editCustomer(customerId) {
  const customerRow = document.querySelector(`tr[data-id="${customerId}"]`);
  const customerColumns = customerRow.querySelectorAll('td');

  customerColumns.forEach((column, index) => {

    if (index !== customerColumns.length - 1) {
      const currentValue = column.textContent;
      const inputField = document.createElement('input');
      inputField.value = currentValue;
      column.textContent = '';
      column.appendChild(inputField);
    }
  });

  const buttons = customerRow.querySelectorAll('button');
  buttons.forEach(button => {
    button.style.display = button.textContent === 'Edit' ? 'none' : 'inline-block';
  });
}

function saveChanges(customerId) {
  const customerRow = document.querySelector(`tr[data-id="${customerId}"]`);
  const inputFields = customerRow.querySelectorAll('input');

  inputFields.forEach((field, index) => {
    const newValue = field.value;
    const cell = field.parentElement;
    cell.textContent = newValue;
  });

  const buttons = customerRow.querySelectorAll('button');
  buttons.forEach(button => {
    button.style.display = button.textContent === 'Save' ? 'none' : 'inline-block';
  });
}

function deleteCustomer(uuid) {
  const apiUrl = 'https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp';

  fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer token_recieved_in_authentication_API_call'
    },
    body: JSON.stringify({
      cmd: 'delete',
      uuid: uuid
    })
  })
  .then(response => {
    if (response.status === 200) {
      console.log('Successfully deleted');
      // Optionally, you can perform some actions after successful deletion
    } else if (response.status === 500) {
      console.error('Error: Not deleted');
    } else if (response.status === 400) {
      console.error('UUID not found');
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });
}


window.onload = function() {
  displayCustomers();
};

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
  const apiUrl = 'https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp';

  fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      cmd: 'create',
      first_name: newCustomer.firstName,
      last_name: newCustomer.lastName,
      street: newCustomer.street,
      address: newCustomer.address,
      city: newCustomer.city,
      state: newCustomer.state,
      email: newCustomer.email,
      phone: newCustomer.phone
    })
  })
    .then(response => {
      if (response.status === 201) {
        const successMessage = document.createElement('p');
        successMessage.textContent = 'New Customer is Inserted Successfully!';
        document.body.appendChild(successMessage);

        setTimeout(function() {
          successMessage.remove();
        }, 3000);

        document.getElementById('customerForm').reset();
      } else {
        console.error('Failed to add new customer. Status:', response.status);
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
});

  
  
