const start       = document.getElementById("start");
const title       = document.getElementById("title");
const statement   = document.getElementById("statement");
const button_1    = document.getElementById("button_1");
const button_2    = document.getElementById("button_2");
const button_3    = document.getElementById("button_3");
const back        = document.getElementById("back");
const next        = document.getElementById("next");
const checkbox_1  = document.createElement("INPUT");
var subject_index = 0
var answer = []

function onloadsite()
{
  button_1.style.display   = "none";
  button_2.style.display   = "none";
  button_3.style.display   = "none";
  back.style.display       = "none";
  next.style.display       = "none";
  checkbox_1
  start.setAttribute("onclick", "post_statement()");
  parties.forEach(function(x, y) {
     parties[y].totalscore = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  });
}

function check_status(text)
{
  for (var i = 0; i < text.length; i++) {
    if (text[i].position == answer[subject_index]) {
      x = text[i].name;
      for (var z = 0; z < parties.length; z++) {
        if (parties[z].name == x && checkbox_1.checked == true) {
          parties[z].totalscore[subject_index] = 2;
        } else if (parties[z].name == x) {
          parties[z].totalscore[subject_index] = 1;
        }
      }
    }
  }
  console.log(parties);
}

function pro_stmt()
{
  back.style.display       = "inline";
  answer[subject_index] = "pro";
  var text = subjects[subject_index].parties;
  var x = subjects.length - 1;
  if (subject_index < x) {
    check_status(text)
    // console.log(parties);
    subject_index++;
    post_statement();
  } else {
    check_status(text)
    finiched();
  }
}

function ambivalent()
{
  back.style.display    = "inline";
  answer[subject_index] = "ambivalent";
  var text = subjects[subject_index].parties;
  var x = subjects.length - 1;
  if (subject_index < x) {
    check_status(text)
    subject_index++;
    post_statement();
  } else {
    check_status(text)
    finiched();
  }
}

function contra()
{
  back.style.display       = "inline";
  answer[subject_index] = "contra";
  var text = subjects[subject_index].parties;
  var x = subjects.length - 1;
  if (subject_index < x) {
    check_status(text)
    subject_index++;
    post_statement();
  } else {
    check_status(text)
    finiched();
  }
}

function post_statement()
{
  if (subject_index <= subjects.length) {
    button_1.style.display   = "inline";
    button_2.style.display   = "inline";
    button_3.style.display   = "inline";
    next.style.display       = "inline";
    var text   = subjects[subject_index]
    var number = subject_index + 1;
    start.style.display    = "none";
    title.innerHTML        = number + ". " + text["title"];
    statement.innerHTML    = text["statement"];
    button_1.setAttribute("onclick", "pro_stmt()");
    button_2.setAttribute("onclick", "ambivalent()");
    button_3.setAttribute("onclick", "contra()");
    back.setAttribute("onclick", "post_statement(subject_index--)");
    next.setAttribute("onclick", "post_statement(subject_index++)");
    checkbox_1.setAttribute("type", "checkbox");
    document.body.appendChild(checkbox_1);
  } else {
    subject_index = 0;
  }
}

function getSum(total, num) {
  return total + num;
}

function finiched()
{
  totalscore = 1
  for (var i = 0; i < parties.length; i++) {
    parties[i].totalscore = parties[i].totalscore.reduce(getSum);
    // console.log(parties);
    if (parties[i].totalscore >= totalscore) {
      totalscore = parties[i].totalscore;
    }
  }
  var names  = []
  var partie = []
  for (var i = 0; i < parties.length; i++) {
    // console.log(totalscore);
    // if (parties[i].totalscore == totalscore) {
    names[i] = parties[i].totalscore;
  }
  names = names.sort((a, b) => b - a);
  for (var i = 0; i < names.length; i++) {
    for (var x = 0; x < parties.length; x++) {
      if (names[i] == parties[x].totalscore) {
        console.log(names[i]);
        console.log(parties[x].name);
        parties[x].totalscore = 0;
        partie[i] = parties[x].name;
        i++;
      }
    }
  }
  console.log(partie);
  title.innerHTML         = "Uitkomst";
  for (var i = 0; i <= names.length; i++) {
    var prec = names[i] * 100 / parties.length;
  }
  partie = partie.slice(0, 5)
  statement.innerHTML     = partie.join('<br>');
  start.style.display     = "none";
  button_1.style.display  = "none";
  button_2.style.display  = "none";
  button_3.style.display  = "none";
  back.style.display      = "none";
  next.style.display      = "none";
}
