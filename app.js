const validator = require("validator");
const yargs = require("yargs");
const chalk = require("chalk");
const notes = require("./notes.js");

// add, remove, read, list

// const command = process.argv[2]

// if(command === 'add'){
//     console.log('Adding node...')
// }
// else if(command === 'remove'){
//     console.log('Removing node...')

// }
// else{
//     console.log(chalk.bold.red('You provide the wrong argument try the below arguments'))
//     console.log(chalk.bold.blue('node .\\app.js [argument] '))
//     console.log(chalk.bold.blue('[argument]=> \'add\' to add a note'))
//     console.log(chalk.bold.blue('[argument]=> \'remove\' to remove a note'))
//     console.log(chalk.bold.green('eg(example): node .\\app.js add'))
//     console.log(chalk.bold.green('eg(example): node .\\app.js remove'))
// }

yargs.version(chalk.green.bold("1.1.2"));

// add
yargs.command({
  command: "add",
  describe:
    chalk.green('Adding a note ') + chalk.yellow('  Example: node .\\app.js add --title "Your Title" --body "Your body"'),
  builder: {
    title: {
      describe: "Note Title",
      demandOption: true,
      type: "string",
    },
    body: {
      describe: "Note body",
      demandOption: true,
      type: "string",
    },
  },
  handler: function (argv) {
    notes.addNote(argv.title, argv.body);
  },
});

// remove
yargs.command({
  command: "remove",
  describe:
    chalk.green("Removing a note ") +
    chalk.yellow(
      '  Example: node .\\app.js remove --no "your_note_number"'
    ),
  builder: {
    no: {
      describe: "Delete or Removing a note",
      type: "number",
      demandOption: true,
    },
  },
  handler: function (arg) {
    notes.removeNote(arg.no);
  },
});

// list
yargs.command({
  command: "list",
  describe: chalk.green("Listing notes0 ") + chalk.yellow("  Example: node .\\app.js list"),
  handler: function () {
    notes.listNotes();
  },
});

// read
yargs.command({
  command: "read",
  describe:
    chalk.green('Reading a notes ') + chalk.yellow('  Example: node .\\app.js read --no "your_note_number"'),
  builder: {
    no: {
      describe: "Number of Note you want to read",
      type: "number",
      demandOption: true,
    },
  },
  handler: function (arg) {
    notes.readNotes(arg.no);
  },
});

yargs.parse();
