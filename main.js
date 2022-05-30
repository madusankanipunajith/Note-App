// Variables
var form = document.getElementById("add-frm");
var items = document.getElementById('items');
var title = document.getElementById('n-title');
var body = document.getElementById('n-body');
var tableDiv = document.getElementById('tbl-div');
var search = document.getElementById('srch');

var noteCount = 0;
var newNote = '';

// Events
window.onload = updateTable;
form.addEventListener('submit', addNote);

// For Search
search.addEventListener('keyup', searchNotes);

// For Remove
items.addEventListener('click', removeNote);

// Functions
function updateTable() {
    if (noteCount > 0) {
        tableDiv.style.display = ''
        items.appendChild(newNote);
    }else{
        tableDiv.style.display = 'none';
    }
}

function addNote(e) {
    e.preventDefault();

    if (title.value == '' || body.value == '') {
        alert('Please fill out the all fields !');
    }else{
        var tr = document.createElement('tr');
        tr.className = 'item';

        // td for title and body
        var td1 = document.createElement('td');
        var span = document.createElement('span');
        td1.appendChild(document.createTextNode(title.value));
        span.className = 'note-body';
        span.appendChild(document.createTextNode(body.value));
        td1.appendChild(span);

        // td for view
        var td2 = document.createElement('td');
        td2.className = 'cell-v';
        var btn1 = document.createElement('button');
        btn1.appendChild(document.createTextNode('View'));
        btn1.setAttribute('id', 'vw');
        td2.appendChild(btn1);

        // td for delete
        var td3 = document.createElement('td');
        td3.className = 'cell-d';
        var btn2 = document.createElement('button');
        btn2.appendChild(document.createTextNode('Delete'));
        btn2.setAttribute('id', 'del');
        td3.appendChild(btn2);

        // Add all tds to tr
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);

        noteCount++;
        newNote = tr;

        // Add or Update the note of the table
        updateTable();
        
        console.log(tr);
    }
}

function searchNotes(e) {
    var searchText = e.target.value.toLowerCase();
    
    // get list
    var list = items.getElementsByClassName('item'); // HTML Collection
    var listArr = Array.from(list);
    listArr.forEach((item)=>{
        var noteTitle = item.firstChild.textContent;
        if (noteTitle.toLowerCase().indexOf(searchText) != -1) {
            item.style.display = '';
        }else{
            item.style.display = 'none';
        }
    });
}

function removeNote(e) {
    if (e.target.id === 'del') {
        if (confirm("Are you sure ? ")) {
            // delete the note
            var tr = e.target.parentElement.parentElement;
            items.removeChild(tr);
        }
    }
}