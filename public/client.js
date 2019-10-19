//var PouchDB = require("pouchdb-node");
var db = new PouchDB('todos');
var remoteCouch = false;//'http://user:pass@myname.example.com/todos';

function addTodo() {
  var todo = {
    user: document.getElementById("user").value,
    _id: new Date().toISOString(),
    task: document.getElementById("action").value,
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
    for (var index = 0; index < doc.rows.length; index ++) {
      if(doc.rows[index].doc.task !== undefined) {
      
    
    document.getElementById("completedActions").value =
      document.getElementById("completedActions").value + '\n' + doc.rows[index].doc.task;
        console.log('loaded from db', doc.rows[index]);
      }
      
  }
});
}
/*
function showTodos() {
  db.allDocs({ include_docs: true, descending: true }, function(err, doc) {
    console.log('loaded from db', doc.rows);
  });
}*/

db.changes({
  since: "now",
  live: true
}).on("change", showTodos);