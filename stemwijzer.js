const start       = document.getElementById("start");
const title       = document.getElementById("title");
const statement   = document.getElementById("statement");
const button_1    = document.getElementById("button_1");
const button_2    = document.getElementById("button_2");
const button_3    = document.getElementById("button_3");
const back        = document.getElementById("back");
const next        = document.getElementById("next");
const checkbox_1  = document.getElementById("checkbox_1");
const checkbox_2  = document.getElementById("checkbox_2");
const checkbox_3  = document.getElementById("checkbox_3");
const hidden      = document.getElementsByClassName("hidden");
const started     = document.getElementsByClassName("start");
var subject_index = 0;
var big_parties = false;
var secular_parties = false;
var answer = [];

function onloadsite() {
  for (var i = 0; i < hidden.length; i++) {
    hidden[i].style.display = "none";
  }
  start.setAttribute("onclick", "post_statement()");
  parties.forEach(function(x, y) {
     parties[y].totalscore = [];
  });
}

function check_status(text) {
  if (text) {
    for (var i = 0; i < text.length; i++) {
      if (text[i].position == answer[subject_index]) {
        x = text[i].name;
        for (var z = 0; z < parties.length; z++) {
          if (parties[z].name == x && checkbox_1.checked == true) {
            parties[z].totalscore[subject_index] = 2;
          } else if (parties[z].name == x) {
            parties[z].totalscore[subject_index] = 1;
          } else if (parties[z].name != x && parties[z].totalscore[subject_index] == 0 || parties[z].totalscore[subject_index] == null) {
            parties[z].totalscore[subject_index] = 0;
          }
        }
      }
    }
  }
}

function check_secular_and_size(text) {
  var x = 0;
  var z = [];
  var partie_name = subjects[subject_index].parties;
  if (secular_parties) {
    for (var i = 0; i < parties.length; i++) {
      var y = parties[i].secular;
      if (y) {
        z[x] = parties[i].name;
        x++;
      }
    }
    for (var i = 0; i < z.length; i++) {
      for (var q = 0; q < partie_name.length; q++) {
        if (z[i] == partie_name[q].name) {
          text[i] = subjects[subject_index].parties[q]
        }
      }
    }
  } else if (big_parties) {
    for (var i = 0; i < parties.length; i++) {
      var y = parties[i].size;
      if (y >= 5) {
        z[x] = parties[i].name;
        x++;
      }
    }
    for (var i = 0; i < z.length; i++) {
      for (var q = 0; q < partie_name.length; q++) {
        if (z[i] == partie_name[q].name) {
          text[i] = subjects[subject_index].parties[q]
        }
      }
    }
  } else {
    text = subjects[subject_index].parties;
  }
  return text;
}

function pro_stmt(text) {
  answer[subject_index] = "pro";
  var text = [];
  text = check_secular_and_size(text)
  var x = subjects.length - 1;
  if (subject_index < x) {
    check_status(text)
    subject_index++;
    post_statement();
  } else {
    check_status(text)
    finished();
  }
}

function ambivalent(text) {
  answer[subject_index] = "ambivalent";
  var text = [];
  check_secular_and_size(text)
  var text = subjects[subject_index].parties;
  var x = subjects.length - 1;
  if (subject_index < x) {
    check_status(text)
    subject_index++;
    post_statement();
  } else {
    check_status(text)
    finished();
  }
}

function contra(text) {
  answer[subject_index] = "contra";
  var text = [];
  check_secular_and_size(text)
  text = check_secular_and_size(text)
  var x = subjects.length - 1;
  if (subject_index < x) {
    check_status(text)
    subject_index++;
    post_statement();
  } else {
    check_status(text)
    finished();
  }
}

function next_stmt() {
  answer[subject_index] = "none";
  var text = [];
  check_secular_and_size(text)
  text = check_secular_and_size(text)
  var x = subjects.length - 1;
  if (subject_index < x) {
    check_status()
    subject_index++;
    post_statement();
  } else {
    check_status()
    finished();
  }
}

function back_to_stmt() {
  subject_index--;
  if (answer[subject_index] == "pro") {
    button_1.style.color = "green";
    button_2.style.color = "black";
    button_3.style.color = "black";
    post_statement()
  } else if (answer[subject_index] == "ambivalent") {
    button_2.style.color = "green";
    button_1.style.color = "black";
    button_3.style.color = "black";
    post_statement()
  } else if (answer[subject_index] == "contra") {
    button_3.style.color = "green"
    button_1.style.color = "black";
    button_2.style.color = "black";
    post_statement()
  } else if (answer[subject_index] == "none") {
    button_3.style.color = "black"
    button_1.style.color = "black";
    button_2.style.color = "black";
    post_statement()
  }
}

function post_statement() {
  if (subject_index <= subjects.length) {
    if (checkbox_2.checked == true) {
      secular_parties = true;
    } else if (checkbox_3.checked == true) {
      big_parties = true;
    } else if (checkbox_2.checked == true && checkbox_3.checked == true) {
      big_parties = true;
      secular_parties = true;
    }
    if (subject_index == 0) {
      for (var i = 0; i < hidden.length; i++) {
        hidden[i].style.display = "inline";
      }
      back.style.display  = "none";
    } else {
      for (var i = 0; i < hidden.length; i++) {
        hidden[i].style.display = "inline";
      }
    }
    var text   = subjects[subject_index]
    var number = subject_index + 1;
    for (var i = 0; i < started.length; i++) {
      started[i].style.display = "none";
    }
    title.innerHTML        = number + ". " + text["title"];
    statement.innerHTML    = text["statement"];
    if (answer[subject_index] == "pro") {
      button_1.style.color = "green";
      button_2.style.color = "black";
      button_3.style.color = "black";
    } else if (answer[subject_index] == "ambivalent") {
      button_1.style.color = "black";
      button_2.style.color = "green";
      button_3.style.color = "black";
    } else if (answer[subject_index] == "contra") {
      button_1.style.color = "black";
      button_2.style.color = "black";
      button_3.style.color = "green";
    } else if (answer[subject_index] == null) {
      button_3.style.color = "black"
      button_1.style.color = "black";
      button_2.style.color = "black";
    }
    button_1.setAttribute("onclick", "pro_stmt()");
    button_2.setAttribute("onclick", "ambivalent()");
    button_3.setAttribute("onclick", "contra()");
    back.setAttribute("onclick", "back_to_stmt()");
    next.setAttribute("onclick", "next_stmt()");
    checkbox_1.setAttribute("type", "checkbox");
  } else {
    subject_index = 0;
  }
}

function getSum(total, num) {
  return total + num;
}

function finished() {
  totalscore = 1;
  for (var i = 0; i < parties.length; i++) {
    parties[i].totalscore = parties[i].totalscore.reduce(getSum);
    if (parties[i].totalscore >= totalscore) {
      totalscore = parties[i].totalscore;
    }
  }
  var names  = []
  var partie = []
  for (var i = 0; i < parties.length; i++) {
    names[i] = parties[i].totalscore;
  }
  var skiped = []
  names = names.sort((a, b) => b - a);
  for (var i = 0; i < names.length; i++) {
    for (var x = 0; x < parties.length; x++) {
      if (names[i] == parties[x].totalscore && skiped.includes(x) == false) {
        skiped[i] = x;
        partie[i] = parties[x].name;
      }
    }
  }
  title.innerHTML         = "Uitkomst";
  for (var i = 0; i <= names.length; i++) {
    var prec = names[i] * 100 / parties.length;
  }
  partie = partie.slice(0, 5)
  statement.innerHTML     = partie.join('<br>');
  for (var i = 0; i < hidden.length; i++) {
    hidden[i].style.display = "none";
  }
}
