// Get references to the form and list elements
const form = document.getElementById('expence-form');
const list = document.getElementById('expence-list');

// Get the data from local storage or create an empty array
let data = JSON.parse(localStorage.getItem('expences')) || [];

// Add a submit event listener to the form
form.addEventListener('submit', e => {
  // Prevent the form from submitting normally
  e.preventDefault();
  
  // Get the input values and add them to the data array
  const expenceamount = form.elements.expenceamount.value;
  const description = form.elements.description.value;
  const category = form.elements.category.value;
  data.push({ expenceamount, description, category });
  
  // Save the updated data array to local storage
  localStorage.setItem('expences', JSON.stringify(data));
  
  // Clear the form inputs
  form.reset();
  
  // Refresh the list of expences
  showExpences();
});

// Function to create a list item for an expence
function createExpenceListItem(expence, index) {
  // Create the list item element
  const li = document.createElement('li');
  li.classList.add('list-group-item');
  
  // Create the title element (category and amount)
  const title = document.createElement('h5');
  title.classList.add('mb-1');
  title.innerText = `${expence.category}: ${expence.expenceamount}`;
  li.appendChild(title);
  
  // Create the description element
  const description = document.createElement('p');
  description.classList.add('mb-1');
  description.innerText = expence.description;
  li.appendChild(description);
  
  // Create the delete button
  const deleteBtn = document.createElement('button');
  deleteBtn.classList.add('btn', 'btn-danger', 'me-2');
  deleteBtn.innerText = 'Delete';
  deleteBtn.addEventListener('click', () => {
    // Remove the expence from the data array and save to local storage
    data.splice(index, 1);
    localStorage.setItem('expences', JSON.stringify(data));
    
    // Refresh the list of expences
    showExpences();
  });
  li.appendChild(deleteBtn);
  
  // Create the edit button
  const editBtn = document.createElement('button');
  editBtn.classList.add('btn', 'btn-primary');
  editBtn.innerText = 'Edit';
  editBtn.addEventListener('click', () => {
    // Update the form inputs with the expence data
    form.elements.expenceamount.value = expence.expenceamount;
    form.elements.description.value = expence.description;
    form.elements.category.value = expence.category;
    
    // Remove the expence from the data array and save to local storage
    data.splice(index, 1);
    localStorage.setItem('expences', JSON.stringify(data));
    
    // Refresh the list of expences
    showExpences();
  });
  li.appendChild(editBtn);
  
  return li;
}

// Function to show the list of expences
function showExpences() {
  // Clear the list
  list.innerHTML = '';
  
  // Create a list item for each expence in the data array
  data.forEach((expence, index) => {
    const li = createExpenceListItem(expence, index);
    list.appendChild(li);
  });
}

// Show the initial list of expences
showExpences();
