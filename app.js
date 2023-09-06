const getul = document.getElementById('ul');
const username = document.getElementById('username');
const adduser = document.getElementById('adduser');
let userArray = [];
let edit_id = null;
const recordsDisplay = document.getElementById('li');

// Load data from local storage when the page loads
window.addEventListener('load', () => {
    LoadInfo();
});

adduser.onclick = () => {
    const name = username.value.trim(); // Trim whitespace from input
    if (name === '') {
        // Don't add empty tasks
        return;
    }

    if (edit_id !== null) {
        // Edit action
        userArray.splice(edit_id, 1, {
            'name': name
        });
        edit_id = null;
        adduser.innerText = 'Add Task';
    } else {
        // Insert action
        userArray.push({
            'name': name
        });
    }

    // Save the updated data to local storage
    SaveInfo(userArray);

    DisplayInfo();
    username.value = ''; // Clear the input field
};

function DeleteInfo(id) {
    userArray.splice(id, 1);
    SaveInfo(userArray);
}

function edit(e) {
    const index = Array.from(e.parentNode.parentNode.children).indexOf(e.parentNode);
    EditInfo(index);
}

function EditInfo(id) {
    edit_id = id;
    username.value = userArray[id].name;
    adduser.innerText = 'Save Changes';
}

function del(e) {
    const row = e.closest('tr'); // Find the closest <tr> element containing the button
    const index = Array.from(recordsDisplay.children).indexOf(row);

    if (index !== -1) {
        userArray.splice(index, 1); // Remove the task from userArray
        row.remove();
        SaveInfo(userArray); // Save the updated data to local storage
        DisplayInfo(); // Update the displayed tasks after deletion
    }
}

// ...

function DisplayInfo() {
    let statement = '';
    userArray.forEach((user, i) => {
        statement += `<tr>
            <th scope="row">${i + 1}</th>
            <td>${user.name}</td>
            <td><i class="btn text-white fa fa-edit btn-info mx-2" onclick='EditInfo(${i})'></i> <i class="btn btn-danger text-white fa fa-trash" onclick='del(this)'></i></td>
          </tr>`;
    });
    recordsDisplay.innerHTML = statement;

    // Add event listeners for dynamically created delete buttons
    const deleteButtons = recordsDisplay.querySelectorAll('.fa-trash');
    deleteButtons.forEach((button, i) => {
        button.addEventListener('click', () => {
            del(button);
        });
    });
}

const deleteAllButton = document.getElementById('deleteall');

// ...

function deleteall() {
    userArray = [];
    SaveInfo(userArray); // Save an empty array to clear local storage
    const tbody = document.getElementById('li');
    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
    }
}

// Save data to local storage
function SaveInfo(data) {
    localStorage.setItem('userArray', JSON.stringify(data));
}

// Load data from local storage
function LoadInfo() {
    const data = localStorage.getItem('userArray');
    if (data) {
        userArray = JSON.parse(data);
        DisplayInfo();
    }
}
