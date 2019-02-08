const start       = document.getElementById("start");
const title       = document.getElementById("title");
const statement   = document.getElementById("statement");
const button_1    = document.createElement("BUTTON");
const button_2    = document.createElement("BUTTON");
const button_3    = document.createElement("BUTTON");
const back        = document.createElement("BUTTON");
var subject_index = 0
var answer = []

function onloadsite()
{
  start.setAttribute("onclick", "post_statement()");
  button_1.innerHTML  = "eens";
  button_2.innerHTML  = "geen van bijde";
  button_3.innerHTML  = "oneens";
  back.innerHTML      = "<--";
}

function pro_stmt()
{
  answer[subject_index] = "pro";
  if (subject_index < 11) {
    subject_index++;
    post_statement();
  } else {
    finiched();
  }
}

function ambivalent()
{
  answer[subject_index] = "ambivalent";
  if (subject_index < 11) {
    subject_index++;
    post_statement();
  } else {
    finiched();
  }
}

function contra()
{
  answer[subject_index] = "contra";
  if (subject_index < 11) {
    subject_index++;
    post_statement();
  } else {
    finiched();
  }
}


function post_statement()
{
  if (subject_index <= 11) {
    document.body.appendChild(back);
    var text   = subjects[subject_index]
    var number = subject_index + 1;
    document.body.appendChild(button_1);
    document.body.appendChild(button_2);
    document.body.appendChild(button_3);
    start.style.display    = "none";
    title.innerHTML        = number + ". " + text["title"];
    statement.innerHTML    = text["statement"];
    button_1.style.display = "inline";
    console.dir(subject_index)
    button_1.setAttribute("onclick", "pro_stmt()");
    button_2.setAttribute("onclick", "ambivalent()");
    button_3.setAttribute("onclick", "contra()");
    back.setAttribute("onclick", "statements(subject_index--)");
  } else {
    subject_index = 0;
  }
}

function finiched()
{
  var text = subjects[0].parties;
  title.innerHTML         = "hello";
  for (var i = 0; i < text.length; i++) {
    statement.innerHTML   = text[i].position;
  }
  start.style.display     = "none";
  button_1.style.display  = "none";
  button_2.style.display  = "none";
  button_3.style.display  = "none";
  back.style.display      = "none";
}
