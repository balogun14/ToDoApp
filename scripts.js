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
// console.log(randomColor);
function createList(value, randomColor) {
  bodyEl = document.createElement("article");
  bodyEl.classList.add("list");
  bodyEl.innerText = value;
  bodyEl.style.color = 'white'
  bodyEl.style.backgroundColor = colors[randomColor];
  body.appendChild(bodyEl);
}

btn.addEventListener("click", (e) => {
  var value = e.target.value;
  var randomColor = Math.floor(Math.random() * colors.length);
  if (value.length =! 0) {
    createList(value, randomColor);
    value = ''
  } 
//   else if (value.length == 0){
//     alert('you didn\'t right anything')
//   }

  //   console.log(value)
});
