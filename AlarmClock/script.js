const currentTime = document.querySelector("h1"),
content = document.querySelector(".content"),
selectMenu = document.querySelectorAll("select"),
setAlarmBtn = document.querySelector("button");

let alarmTime, isAlarmSet = false,
ringTone = new Audio("./files/ringTone.mp3");

for (let i=12; i >0; i--) {
  i = i < 10 ? "0" + i : i;
  let option = `<option value="${i}">${i}</option>`;
  selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
}

for (let i=59; i >=0; i--) {
  i = i < 10 ? "0" + i : i;
  let option = `<option value="${i}">${i}</option>`;
  selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
}

for (let i=2; i >0; i--) {
  let ampm = i == 1 ? "AM" : "PM";
  let option = `<option value="${ampm}">${ampm}</option>`;
  selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option);
}

setInterval(() => {
  let date = new Date(),
  hour = date.getHours(),
  min = date.getMinutes(),
  sec = date.getSeconds(),
  ampm = "AM";

  if(hour >= 12){
    hour = hour - 12;
    ampm = "PM";
  }

  hour = hour == 0 ? hour = 12 : hour;

  hour = hour < 10 ? "0" + hour : hour;
  min = min < 10 ? "0" + min : min;
  sec = sec < 10 ? "0" + sec : sec;

  currentTime.innerText = `${hour}:${min}:${sec} ${ampm}`;
  if(alarmTime == `${hour}:${min} ${ampm}`) {
    ringTone.play();
    ringTone.loop == true;
  }
}, 1000)

function setAlarm() {
  if(isAlarmSet) {
    alarmTime = "";
    ringTone.pause();
    content.classList.remove("disable");
    setAlarmBtn.innerText = "Set Alarm";
    return isAlarmSet = false;
  }
  let time = `${selectMenu[0].value}:${selectMenu[1].value} ${selectMenu[2].value}`

  if(time.includes("Hour") || time.includes("Minute") || time.includes("AM/PM")) {
    content.classList.remove("disable");
    alert("Select time");
  } else {
    isAlarmSet = true;
    alarmTime = time;
    content.classList.add("disable");
    setAlarmBtn.innerText = "Clear Alarm";
  }
  
}

setAlarmBtn.addEventListener("click", setAlarm);