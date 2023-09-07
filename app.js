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

function foo() {
    const name = username.value.trim();
    if (name === '') {
        // Don't add empty tasks
        return;
    }

    // Insert action
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
    username.value = '';
}

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



const deleteAllButton = document.getElementById('deleteall');

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

// ...

function del(e) {
    const row = e.closest('tr'); // Find the closest <tr> element containing the button
    const index = Array.from(recordsDisplay.children).indexOf(row);

    if (index !== -1) {
        userArray.splice(index, 1); // Remove the task from userArray
        SaveInfo(userArray); // Save the updated data to local storage
        DisplayInfo(); // Update the displayed tasks after deletion
    }
}

// ...

function DisplayInfo() {
    const tbody = document.getElementById('li'); // Get the tbody element

    // Clear the existing content
    tbody.innerHTML = '';

    // Check if there are user items to display
    if (userArray.length === 0) {
        const placeholderRow = document.createElement('tr');
        placeholderRow.innerHTML = `
            <th scope="row">1</th>
            <td>e.g Daily Routine, Add Things Before Going to Market</td>
            <td><i class="btn text-light fa fa-edit btn-info mx-2"></i> <i
            class="btn btn-danger text-light fa fa-trash"></i></td>
        `;
        tbody.appendChild(placeholderRow);
    } else {
        // Iterate through the userArray and display items with updated numbering
        userArray.forEach((user, i) => {
            const itemNumber = i + 1;
            const newRow = document.createElement('tr'); // Create a new table row
            newRow.innerHTML = `
                <th scope="row">${itemNumber}</th>
                <td>${user.name}</td>
                <td>
                    <i class="btn text-white fa fa-edit btn-info mx-2" onclick='EditInfo(${i})'></i>
                    <i class="btn btn-danger text-white fa fa-trash" onclick='del(this)'></i>
                </td>
            `;

            tbody.appendChild(newRow); // Append the new row to the tbody
        });
    }

    recordsDisplay.style.display = 'table-row-group'; // Show the tbody
}





































// getAttribute 

// function foo(){
//     var a = document.getElementById('inp')
//     var b = a.getAttribute('name')
//     console.log(b)
// }



// hasAttribute 

// function foo(){
//     var a = document.getElementById('inp')
//     var b = a.hasAttribute('class')
//     console.log(b)
// }




// setAttribute 

// function foo(){
//     var a = document.getElementById('inp')
//     var b = a.setAttribute('class','set')
//     console.log(b)
// }

// var getul = document.getElementById('ul')

// function foo() {
//     var a = document.getElementById('inp')
//     // console.log(a)
//     // document.write(a)
//     var li = document.createElement('li')
//     // console.log(li)
//     var litext = document.createTextNode(a.value)
//     // console.log(litext)
//     li.appendChild(litext)
//     // console.log(li)
//     getul.appendChild(li)
//     a.value = ''
//     var deleteBTN = document.createElement('button')
//     var deleteBTNtext = document.createTextNode('Delete')
//     deleteBTN.appendChild(deleteBTNtext)
//     li.appendChild(deleteBTN)
//     deleteBTN.setAttribute('onclick', 'del(this)')
//     deleteBTN.setAttribute('class', 'btn btn-danger space')

//     var editBTN = document.createElement('button')
//     var editBTNtext = document.createTextNode('Edit')
//     editBTN.appendChild(editBTNtext)
//     li.appendChild(editBTN)
//     editBTN.setAttribute('onclick', 'edit(this)')
//     editBTN.setAttribute('class', 'btn btn-info space')


// }

// function deleteall() {
//     getul.innerHTML = ''
// }
// function del(e) {
//     // console.log(e)
//     e.parentNode.remove()
// }
// function edit(e) {
//     // console.log(e)
//     // var userEdit = prompt(e)
//     var a = prompt('Edit Value', e.parentNode.firstChild.nodeValue)
//     // console.log(e.parentNode.firstChild)
//     e.parentNode.firstChild.nodeValue = a
//     // a.parentNode.childNode.edit() = a.value(eval)
// }
