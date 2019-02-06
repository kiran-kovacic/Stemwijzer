const start       = document.getElementById("start");
const title       = document.getElementById("title");
const statement   = document.getElementById("statement");
const button_1    = document.getElementById("button_1");
const button_2    = document.getElementById("button_2");
const button_3    = document.getElementById("button_3");
const back        = document.getElementById("back")
var subject_index = 0

function onloadsite()
{
  start.setAttribute("onclick", "statements()");
  button_1.style.display = "none";
  button_2.style.display = "none";
  button_3.style.display = "none";
  back.style.display     = "none";
}


function statements()
{
  var text = subjects[subject_index]
  var number = subject_index + 1;
  title.innerHTML        = number + ". " + text["title"];
  statement.innerHTML    = text["statement"];
  start.style.display    = "none";
  button_1.innerHTML     = "eens";
  button_1.style.display = "inline";
  button_1.setAttribute("onclick", "statements(subject_index++)");
  button_2.innerHTML     = "geen van bijde";
  button_2.style.display = "inline";
  button_2.setAttribute("onclick", "statements(subject_index++)");
  button_3.innerHTML     = "oneens";
  button_3.style.display = "inline";
  button_3.setAttribute("onclick", "statements(subject_index++)");
  console.dir(subject_index)
  if (subject_index => 1) {
    back.style.display     = "inline";
    back.setAttribute("onclick", "statements(subject_index--)");
  } else {
    back.style.display = "none";
  }
}
