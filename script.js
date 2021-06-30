const createANoteField =
    `<textarea id="inputTitle" type="text" placeholder="Note Title"></textarea>
    <div class="actions">
                <abbr title="Save Note"><img onclick="saveNote()" src="images/save.png" alt="save"></abbr>
                
                <abbr title="Cancel"><img onclick="cancelNoteCreation()" src="images/delete-cancel.png" alt="delete"></abbr>
    </div>
    <textarea name="" id="inputNote" cols="30" rows="10" placeholder="NOTE"></textarea>
    `

const cancelButton =
    `
    <abbr title="Cancel"><img onclick="cancelNoteCreation()" src="images/delete-cancel.png" alt="delete"></abbr>
    `
const noNotes =
    `
    <h1 class="no-notes">OPEN A NOTE</h1>
    `
var noteList = (localStorage.getItem("notesList") != null) ? (JSON.parse(localStorage.getItem("notesList"))) : ([]);

const notes = {
    title: "",
    content: "",
    id: NaN,
};

window.onload = showNotesList();

function addNote() {
    let getHTML = document.getElementById("openedNote");
    getHTML.textContent = ""
    getHTML.insertAdjacentHTML("afterbegin", createANoteField);
}

function cancelNoteCreation() {
    let getHTML = document.getElementById("openedNote");
    getHTML.textContent = ""
    getHTML.insertAdjacentHTML("afterbegin", noNotes);
}

function saveNote() {
    let getNoteTitle = document.getElementById("inputTitle").value;

    let getNoteContent = document.getElementById("inputNote").value;

    notes.title = getNoteTitle;
    notes.content = getNoteContent;
    notes.id = generateNoteId();

    noteList.push(notes);

    let toJson = JSON.stringify(noteList)

    localStorage.setItem(`notesList`, toJson);

    cancelNoteCreation();
    showNotesList()
    jsonToObject();

}

function jsonToObject() {
    noteList = JSON.parse(localStorage.getItem("notesList"));
}


function showNotesList() {
    var getHTML = document.getElementById("everyNote")

    getHTML.textContent = "";

    for (let i = 0; i < noteList.length; i++) {


        let finalHTML = `<h2 class="eachNote" onclick="showOpenedNote(${i})">${noteList[i].title}</h2>`

        getHTML.insertAdjacentHTML("beforeend", finalHTML)
    }

    console.log("entrou");
}

function generateNoteId() {
    let id = Math.floor(Math.random() * (499 - 99) + 99);

    for (let i = 0; i < noteList.length; i++) {
        if (id == noteList[i].id) {
            console.log("achou igual")
            generateNoteId()
        }
    }

    return id;
}


function showOpenedNote(i) {
    let getHTML = document.getElementById("openedNote");
    getHTML.textContent = "";

    let finalHTML =
        `
            <div id="top">
                <abbr title="Delete note"><img onclick="#" src="images/delete-file-icon.png" alt="add note"></abbr>
                <h2>${noteList[i].title}</h2>
            </div>
                <p>${noteList[i].content}</p>
            `

    getHTML.insertAdjacentHTML("beforeend", finalHTML);

}