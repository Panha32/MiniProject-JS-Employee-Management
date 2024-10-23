function showTime() {
  var date = new Date();
  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();
  var session = "AM";

  if (hour == 0) {
    hour = 12;
  }

  if (hour > 12) {
    hour = hour - 12;
    session = "PM";
  }

  hour = hour < 10 ? "0" + hour : hour;
  minute = minute < 10 ? "0" + minute : minute;
  second = second < 10 ? "0" + second : second;

  var time = hour + ":" + minute + ":" + second + " <span class='session'>" + session + "</span>";
  document.getElementById("DigitalClock").innerHTML = time;

  setTimeout(showTime, 1000);
}

showTime();

function setClock() {
  var date = new Date();
  var s = date.getSeconds();
  var min = date.getMinutes();
  var h = date.getHours();

  var secDeg = (s / 60) * 360;
  var minDeg = (min / 60) * 360 + (s / 60) * 6;
  var hDeg = ((h % 12) / 12) * 360 + (min / 60) * 30;

  document.querySelector(".second-hand").style.transform = `rotate(${secDeg}deg)`;
  document.querySelector(".minute-hand").style.transform = `rotate(${minDeg}deg)`;
  document.querySelector(".hour-hand").style.transform = `rotate(${hDeg}deg)`;
}

setInterval(setClock, 1000);
setClock();
