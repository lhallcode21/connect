//var PouchDB = require("pouchdb-node");
var db = new PouchDB('todos');
var remoteCouch = false;//'http://user:pass@myname.example.com/todos';

function addTodo() {
  var todo = {
    user: document.getElementById("user").value,
    _id: new Date().toISOString(),
    title: document.getElementById("action").value,
    completed: true
  };
  db.put(todo, function callback(err, result) {
    if (!err) {
      console.log('Successfully posted a todo! ', todo);
    }
  });
}

function showTodos() {
  db.allDocs({ include_docs: true, descending: true }, function(err, doc) {
    console.log('loaded from db', doc.rows);
  });
}

db.changes({
  since: "now",
  live: true
}).on("change", showTodos);