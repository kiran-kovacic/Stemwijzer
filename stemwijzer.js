const start       = document.getElementById("start");
const title       = document.getElementById("title");
const statement   = document.getElementById("statement");
const button_1    = document.createElement("BUTTON");
const button_2    = document.createElement("BUTTON");
const button_3    = document.createElement("BUTTON");
const back        = document.createElement("BUTTON");
const next        = document.createElement("BUTTON");
// const all_parties = ["PVV", "SP", "D66", "GroenLinks", "Partij voor de Dieren",
//                      "50Plus", "VNL", "Nieuwe Wegen", "Forum voor Democratie",
//                      "De Burger Beweging", "Vrijzinnige Partij", "Piratenpartij",
//                      "Libertarische Partij", "Lokaal in de Kamer", "VVD",
//                      "PvdA", "CDA", "ChristenUnie", "SGP", "OndernemersPartij",
//                      "DENK", "Artikel 1"]
// var parties       = {
//       "PVV":[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//       "SP":[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//       "D66":[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//       "GroenLinks":[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//       "Partij voor de Dieren":[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//       "50Plus":[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//       "VNL":[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//       "Nieuwe Wegen":[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//       "Forum voor Democratie":[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//       "De Burger Beweging":[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//       "Vrijzinnige Partij":[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//       "Piratenpartij":[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//       "Libertarische Partij":[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//       "Lokaal in de Kamer":[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//       "VVD":[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//       "PvdA":[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//       "CDA":[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//       "ChristenUnie":[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//       "SGP":[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//       "OndernemersPartij":[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//       "DENK":[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//       "Artikel 1":[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
// }
var subject_index = 0
var answer = []

function onloadsite()
{
  start.setAttribute("onclick", "post_statement()");
  button_1.innerHTML      = "eens";
  button_2.innerHTML      = "geen van bijde";
  button_3.innerHTML      = "oneens";
  back.innerHTML          = "<--";
  next.innerHTML          = "Sla deze vraag over -->"
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
        if (parties[z].name == x) {
          parties[z].totalscore[subject_index] = 1;
        }
      }
      console.log(x);
    }
  }
}

function pro_stmt()
{
  answer[subject_index] = "pro";
  var text = subjects[subject_index].parties;
  if (subject_index < 11) {
    check_status(text)
    console.log(parties);
    subject_index++;
    post_statement();
  } else {
    check_status(text)
    finiched();
  }
}

function ambivalent()
{
  answer[subject_index] = "ambivalent";
  var text = subjects[subject_index].parties;
  if (subject_index < 11) {
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
  answer[subject_index] = "contra";
  var text = subjects[subject_index].parties;
  if (subject_index < 11) {
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
    button_1.setAttribute("onclick", "pro_stmt()");
    button_2.setAttribute("onclick", "ambivalent()");
    button_3.setAttribute("onclick", "contra()");
    back.setAttribute("onclick", "post_statement(subject_index--)");
    document.body.appendChild(next);
    next.setAttribute("onclick", "post_statement(subject_index++)");
  } else {
    subject_index = 0;
  }
}

function getSum(total, num) {
  return total + num;
}

function finiched()
{
  totalscore = 4
  for (var i = 0; i < parties.length; i++) {
    parties[i].totalscore = parties[i].totalscore.reduce(getSum);
    console.log(parties[i].totalscore);
    if (parties[i].totalscore >= totalscore) {
      totalscore = parties[i].totalscore;
    }
  }
  // for (var i = 0; i < all_parties.length; i++) {
  //   var partie = all_parties[i];
  //   if (parties[partie] == totalscore) {
  //     statement.innerHTML = parties[name];
  //   }
  // }
  title.innerHTML         = "Uitkomst";
  statement.innerHTML     = "";
  console.log(parties)
  start.style.display     = "none";
  button_1.style.display  = "none";
  button_2.style.display  = "none";
  button_3.style.display  = "none";
  back.style.display      = "none";
  next.style.display      = "none";
}
