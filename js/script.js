const timeNotific = document.querySelector('[data-time]');
const alarm = document.querySelector('[data-alarm]');
const modal = document.querySelector('.alarm-modal-container');
const btnGroup = document.querySelectorAll('.btn-group li');
const appWrapper = document.querySelectorAll('.app-wrapper section');
const secondHand = document.querySelector('[data-second]');
const minutsHand = document.querySelector('[data-minuts]');
const hoursHand = document.querySelector('[data-hours]');
//stopwatch varibable
const swTimerCenter = document.querySelector('.sw-timer');
const swMiliSecond = document.querySelector('.sw-miliSecond');
const swSecond = document.querySelector('.sw-second');
const swMinuts = document.querySelector('.sw-minuts');
const swhour = document.querySelector('.sw-hour');
const loading = document.querySelectorAll('.clockline li');
//Stopwatch btn controll
const swControl = document.querySelectorAll('.sw-Contoler button');
const Start = document.querySelector('[data-play]');
const pause = document.querySelector('[data-pause]');
const Lap = document.querySelector('[data-Lap]');
const reset = document.querySelector('[data-reset]');
const lablist = document.querySelector('.laps');
let selectedItem;
let counter, i, j;
counter = i = j = 0;
let interval1, interval2;
//alarm vaiable;
const days = document.querySelector('[data-days]');
const weekday = document.querySelector('[data-week]');
const month = document.querySelector('[data-month]');
const years = document.querySelector('[data-year]');
const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
//set Alarm
const setHoursAlarm = document.querySelector('[data-setHours]');
const setMiunutsAlarm = document.querySelector('[data-setMinuts]');
const hoursRenge = document.getElementById('hoursReng');
const minRenge = document.getElementById('minReng');
const setDay = document.querySelector('[data-setDays]');
const setDays = document.querySelectorAll('.days li a');
let arrDays = [];
const setOk = document.querySelector('[data-ok]');
const setCancel = document.querySelector('[data-cancel]');
const appendAlarmContainer = document.querySelector('.appendAlarm-container');
//notification time
function timeNotic() {
    const date = new Date();
    const hour = date.getHours();
    const min = date.getMinutes();
    const sec = date.getSeconds();
    timeNotific.textContent = `${hour}:${min}`;
}
setInterval(timeNotic, 1000);
//modal script
alarm.addEventListener('click', () => {
    alarm.classList.toggle('activeAlarm');
    modal.classList.toggle('activeModal');
});
// set display none for all section of appWrappwer
function displayNone() {
    appWrapper.forEach(section => {
        section.style.display = 'none';
    });
}
//set remove active class for all btn-groups
function deactiveAll() {
    btnGroup.forEach(item => item.classList.remove('active'));
}
// active user selectet items
btnGroup.forEach((item, index) => {
    item.addEventListener('click', () => {
        selectedItem = index;
        displayNone();
        deactiveAll();
        appWrapper[selectedItem].style.display = 'flex';
        appWrapper[selectedItem].classList.add('active-slide');
        btnGroup[selectedItem].classList.add('active');
        if (index == 2) alarm.classList.remove(activeAlarm);
    });
});
//
// analog clock
function setClock() {
    const date = new Date();
    const seconds = date.getSeconds() / 60;
    const minuts = (seconds + date.getMinutes()) / 60;
    const hours = (minuts + date.getHours()) / 12;
    setRotation(secondHand, seconds);
    setRotation(minutsHand, minuts);
    setRotation(hoursHand, hours);
}

function setRotation(element, rotationRatio) {
    element.style.setProperty('--rotation', rotationRatio * 360);
}
setInterval(setClock, 1000);
setClock();
//stopwatch 
let activeItem;
swControl.forEach((item, index) => {
    item.addEventListener('click', () => {
        activeItem = index;
        swControl.forEach(item => item.classList.remove('activeBtn'));
        swControl[activeItem].classList.toggle('activeBtn');
    });
});

function getMiliSecond() {
    const now = new Date();
    swMiliSecond.textContent = Math.round(now.getMilliseconds() / 10);
}

function getSecond_Minut() {
    counter++;
    if (counter < 10) swSecond.textContent = `0${counter}`;
    swSecond.textContent = counter;
    if (counter > 60) counter = 1;
    if (counter == 60) {
        i++;
        if (i > 59) i = 1;
        swMinuts.textContent = i;
    }


}

function puaseConter() {
    clearInterval(interval1);
    clearInterval(interval2);
    for (const key in loading) {
        if (Object.hasOwnProperty.call(loading, key)) {
            const element = loading[key];
            element.classList.remove('active-loading');

        }
    }
    swTimerCenter.style.color = 'var(--clock-handel)';
}
pause.addEventListener('click', puaseConter);
Start.addEventListener('click', () => {
    clearInterval(interval1);
    clearInterval(interval2);
    interval1 = setInterval(getMiliSecond, 10);
    interval2 = setInterval(getSecond_Minut, 1000);
    for (const key in loading) {
        if (Object.hasOwnProperty.call(loading, key)) {
            const element = loading[key];
            element.classList.add('active-loading');

        }
    }
    swTimerCenter.style.color = 'var(--loading)';
});
reset.addEventListener('click', () => {
    counter = i = j = playerCounter = 0;
    swhour.textContent = swMinuts.textContent = swSecond.textContent = swMiliSecond.textContent = '00';
    puaseConter();
    for (const key in loading) {
        if (Object.hasOwnProperty.call(loading, key)) {
            const element = loading[key];
            element.classList.remove('active-loading');

        }
    }
    swTimerCenter.style.color = 'var(--clock-handel)';
});
Lap.addEventListener('click', () => {
    const li = document.createElement('li');
    const span = document.createElement('span');
    const trush = document.createElement('i');
    span.classList.add('record');
    span.textContent = swTimerCenter.textContent;
    trush.classList.add("fas");
    trush.classList.add("fa-trash");
    li.append(span, trush);
    lablist.append(li);
    const deleteRecord = document.querySelectorAll('.fa-trash');
    const ligroup = document.querySelectorAll('.laps li');
    for (const key in ligroup) {
        if (Object.hasOwnProperty.call(ligroup, key)) {
            const element = ligroup[key];
            deleteRecord[key].addEventListener('click', () => {
                element.remove();
            });
        }
    }

});
//set alarm
function calender() {
    const now = new Date();
    const year = now.getFullYear();
    const months = now.getMonth();
    const day = now.getDate();
    const daynum = now.getDay();
    years.textContent = year;
    month.textContent = monthNames[months];
    days.textContent = day;
    weekday.textContent = dayNames[daynum];

}
calender();
hoursRenge.addEventListener('input', () => {
    setHoursAlarm.textContent = hoursRenge.value;
});
minRenge.addEventListener('input', () => {
    setMiunutsAlarm.textContent = minRenge.value;
});
setDay.addEventListener('click', (e) => {
    e.target.classList.toggle('select');
});
setOk.addEventListener('click', () => {
    const appendAlarm = document.createElement('div'); // create div.appendAlarm
    appendAlarm.setAttribute('class', 'appendAlarm');
    const appendDate = document.createElement('div'); //  div.appendAlarm=> div.appendDate + lable.toggle-btn
    appendDate.setAttribute('class', 'appendDate'); // appendDate=>.date-Time + date-day
    const dateTime = document.createElement('p');
    dateTime.setAttribute('class', 'Date-time');
    dateTime.textContent = `${setHoursAlarm.textContent}:${setMiunutsAlarm.textContent}`;
    const dateDays = document.createElement('ul');
    dateDays.setAttribute('class', 'Date-days');
    const toggleLable = document.createElement('label'); //  div.appendAlarm=> div.appendDate + lable.toggle-btn
    toggleLable.setAttribute('for', "toggle");
    toggleLable.setAttribute('class', 'toggle-btn');
    const inpcheck = document.createElement('input');
    inpcheck.setAttribute("type", "checkbox");
    inpcheck.setAttribute('id', 'toggle');
    inpcheck.setAttribute('class', 'toggle-input');
    const toggleBox = document.createElement('div');
    toggleBox.setAttribute('class', 'toggle-box');
    const toggleIcon = document.createElement('span');
    toggleIcon.setAttribute('class', 'toggle-icon');
    const powerIcon = document.createElement('i');
    powerIcon.setAttribute('class', 'fas fa-power-off');
    toggleLable.append(inpcheck, toggleBox, toggleIcon);
    toggleIcon.append(powerIcon);
    appendAlarmContainer.append(appendAlarm);
    appendAlarm.append(appendDate, toggleLable); // append div.appendDate & lable.toggle-btn
    appendDate.append(dateTime);
    setDays.forEach(item => {
        if (item.className == 'select') arrDays.push(item.textContent);
    });
    arrDays.forEach(item => {
        let li = document.createElement('li');
        li.textContent = item;
        dateDays.append(li);
    });
    appendDate.append(dateDays);
});
setCancel.addEventListener('click', () => {
    modal.classList.remove('activeModal');
    setDays.forEach(item => {
        item.classList.remove('select');
    });
    arrDays = [];
});