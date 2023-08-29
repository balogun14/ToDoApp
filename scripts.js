const screen = document.getElementById("screen");
const btn = document.getElementById("button");
const body = document.getElementById("body");
const colors = [
  "#A06CD5",
  "#E2cfea",
  "#6247aa",
  "#782cf6",
  "#D357FE",
  "#450D59",
  "#11053B",
];

const DB_NAME = 'toDo'
const DB_VERSION = 1;
const DB_STORE_NAME = "toDo";
var db;
function getObjectStore(store_name, mode) {
  var tx = db.transaction(store_name, mode);
  return tx.objectStore(store_name);
}


function createDb() {
  console.log("Opening db");
  const request = indexedDB.open(DB_NAME, DB_VERSION);
  // on upgrade needed
  request.onupgradeneeded = (e) => {
    db = e.target.result;
    console.log("openDb.onupgradeneeded");
    var store = e.currentTarget.result.createObjectStore(DB_STORE_NAME, {
      keyPath: "id",
      autoIncrement: true,
    });

    store.createIndex("body", "body", { unique: true });
  };
  // on sucess
  request.onsuccess = (e) => {
    db = e.target.result;
    const transaction = db.transaction("toDo", "readonly");
    const objectStore = transaction.objectStore("toDo");
    objectStore.openCursor().onsuccess = (event) => {
      const cursor = event.target.result;
      if (cursor) {
        const data = cursor.value;
          var randomColor = Math.floor(Math.random() * colors.length);
        bodyEl = document.createElement("article");
        bodyEl.classList.add("list");
        bodyEl.innerText = data.body;
        bodyEl.style.color = "white";
        bodyEl.style.backgroundColor = colors[randomColor];
        body.appendChild(bodyEl);
        // const listItem = document.createElement("article");
        // listItem.innerHTML = `
        // <article class="list">
        // ${data.body}
        // </article>
        // `;
        // body.appendChild(listItem);
        cursor.continue();
      }
    };
  };

  // on error

  request.onerror = (e) => {
    alert(`error is called ${e.target.error}`);
  };
}


// console.log(randomColor);
function createList(value) {
  const todo = {
    body: value
  }
    const tx = db.transaction("toDo", "readwrite");
    const toDo = tx.objectStore("toDo");
    toDo.add(todo);
  // bodyEl = document.createElement("article");
  // bodyEl.classList.add("list");
  // bodyEl.innerText = value;
  // bodyEl.style.color = "white";
  // bodyEl.style.backgroundColor = colors[randomColor];
  // body.appendChild(bodyEl);
}

function displayPubList(store) {
  console.log("displayPubList");
  if (typeof store == "undefined")
    store = getObjectStore(DB_STORE_NAME, "readonly");

  var pub_list = $("#body");
  // pub_list.empty();
  // Resetting the iframe so that it doesn't display previous content

  var req;
  req = store.count();
  // Requests are executed in the order in which they were made against the
  // transaction, and their results are returned in the same order.
  // Thus the count text below will be displayed before the actual pub list
  // (not that it is algorithmically important in this case).

  req.onerror = function (evt) {
    console.error("add error", this.error);
  };

  var i = 0;
  req = store.openCursor();
  req.onsuccess = function (evt) {
    var cursor = evt.target.result;

    // If the cursor is pointing at something, ask for the data
    if (cursor) {
      console.log("displayPubList cursor:", cursor);
      req = store.get(cursor.key);
      req.onsuccess = function (evt) {
        var value = evt.target.result;
        // bodyEl = document.createElement("article");
        // bodyEl.classList.add("list");
        // bodyEl.innerText = value.body;
        // bodyEl.style.color = "white";
        // bodyEl.style.backgroundColor = colors[randomColor];
        // body.appendChild(bodyEl);
        // var list_item = $(
        //   "<article class='list'>" +
        //     value.body +
        //     "</article>"
        // );
        // {
        //   pub_list.appendChild(list_item);
        // }

        // Move on to the next object in store
        cursor.continue();

        // This counter serves only to create distinct ids
        i++;
      };
    }
  };
};

btn.onclick = (e) => {
  var value = screen.value;
  console.log(value);
  createList(value);
  location.reload()
}
createDb()
displayPubList()