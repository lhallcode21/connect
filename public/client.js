//var PouchDB = require("pouchdb-node");
var db = new PouchDB("todos");
var remoteCouch = false; //'http://user:pass@myname.example.com/todos';

function addTodo() {
  document.getElementById("errors").value = "";
  if (document.getElementById("user").value === "") {
    document.getElementById("errors").innerHTML = "username is blank";
    console.log(document.getElementById("errors").value);
    return;
  }
  if (document.getElementById("action").value === "") {
    document.getElementById("errors").innerHTML = "action is blank";
    console.log(document.getElementById("errors").value);
    return;
  }
  var todo = {
    user: document.getElementById("user").value,
    _id: new Date().toISOString(),
    task: document.getElementById("action").value,
    completed: true
  };
  db.put(todo, function callback(err, result) {
    if (!err) {
      console.log("Successfully posted a todo! ", todo);
    }
  });
}

function showTodos() {
  const user = document.getElementById("user").value;
  for (var index = document.getElementById("others").rows.length;
      index > 0; index--) {
    document.getElementById("others").deleteRow(index-1);
  }
  var pointsmap = {};
  document.getElementById("completedActions").value = "";
  db.allDocs({ include_docs: true, descending: true }, function(err, doc) {
    console.log("loaded from db", doc.rows);
    for (var index = 0; index < doc.rows.length; index++) {
      if (doc.rows[index].doc.task !== undefined) {
        const userInRow = doc.rows[index].doc.user;
        if (pointsmap[userInRow] !== undefined) {
          pointsmap[userInRow] += 10;
        } else {
          pointsmap[userInRow] = 10;
        }
      }
      if (doc.rows[index].doc.user === user) {
        document.getElementById("completedActions").value =
          document.getElementById("completedActions").value +
          "\n" +
          doc.rows[index].doc.task;
        console.log("loaded from db", doc.rows[index]);
      }
    }

    document.getElementById("points").innerHTML =
      "Points you have: " + pointsmap[user];
    var othersIndex = 0;
    Object.keys(pointsmap).forEach(key => {
      if (key !== user) {
        var row = document.getElementById("others").insertRow(othersIndex);
      row.insertCell(0).innerHTML =
          "Points " + key + " has " + pointsmap[key];
      }
    });
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
