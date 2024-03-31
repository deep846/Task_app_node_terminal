const fs = require("fs");
const chalk = require("chalk");

const getNotes = function () {
  return "your notes is ";
};

const addNote = function (title, body) {
  const notes = loadNotes();

  const duplicateNotes = notes.filter(function (note) {
    return note.title === title;
  });

  if (duplicateNotes.length === 0) {
    // console.log(duplicateNotes);

    notes.push({
      title: title,
      body: body,
    });

    saveNotes(notes);
    console.log(chalk.bgGreen.white("New Note Added"));
  } else {
    console.log(chalk.bgRed("Note Title Taken"));
    // console.log(duplicateNotes);
  }
};

//Reading Notes

const readNotes = function (no) {
  const notes = loadNotes();

  if (notes.length === 0) {
    console.log(chalk.bgRed("no note avialable"));
  } else {
    if (notes.length >= no && no - 1 >= 0) {
      console.log(chalk.green.bold("Title: " + notes[no - 1]["title"]));
      console.log(chalk.green("Body:  " + notes[no - 1]["body"]));
    } else {
      console.log(chalk.bgRed("No such note number exist"));
    }
  }
};

//Removing Notes
const removeNote = function (no) {
  const notes = loadNotes();

  if (notes.length === 0) {
    console.log(chalk.bgRed("no note avialable"));
  } else {
    if (notes.length >= no && no - 1 >= 0) {
      console.log(chalk.bgYellow(" Removing.... Title: " + notes[no - 1]["title"]));
      notes.splice(no-1,1);
      console.log(chalk.bgGreen('Removied'));
      saveNotes(notes)
    } else {
      console.log(chalk.bgRed("No such note to remove"));
    }
  }
};

//Listing Notes
const listNotes = function () {
  const notes = loadNotes();

  if (notes.length === 0) {
    console.log(chalk.bgRed("no note avialable"));
  } else {
    let i = 0;
    notes.filter(function (note) {
      console.log(chalk.green.bold(`${++i}. ` + note.title));
    });
  }
};

// Saving a note
const saveNotes = function (notes) {
  const saveNote = JSON.stringify(notes);
  fs.writeFileSync("notes.json", saveNote);
};

// Loading a note
const loadNotes = function () {
  try {
    const data = JSON.parse(fs.readFileSync("notes.json"));
    return data;
  } catch (e) {
    return [];
  }
};


module.exports = {
  getaNotes: getNotes,
  addNote: addNote,
  listNotes: listNotes,
  readNotes: readNotes,
  removeNote: removeNote,
};
