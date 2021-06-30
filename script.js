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

// -------SE JÁ TIVER DADOS SALVOS RECEBE OS DADOS E TRANSFORMA EM OBJETO, SENÃO RECEBE UM ARRAY VAZIO-------
var noteList = (localStorage.getItem("notesList") != null) ? (JSON.parse(localStorage.getItem("notesList"))) : ([]);

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

    const notes = {
        title: getNoteTitle,
        content: getNoteContent,
    };


    noteList.push(notes);

    let toJson = JSON.stringify(noteList)

    localStorage.setItem(`notesList`, toJson);

    cancelNoteCreation();
    jsonToObject();
    window.onload
}

function jsonToObject() {

    noteList = JSON.parse(localStorage.getItem("notesList"));

}


function showNotesList() {
    var getHTML = document.getElementById("everyNote")

    getHTML.textContent = "";

    for (let i = 0; i < noteList.length; i++) {


        let finalHTML = `<h2 class="eachNote">${noteList[i].title}</h2>`

        getHTML.insertAdjacentHTML("beforeend", finalHTML)
    }

    console.log("entrou");
}

