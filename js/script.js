const alarm = document.querySelector('[data-alarm]');
const modal = document.querySelector('.alarm-modal-container');
const btnGroup = document.querySelectorAll('.btn-group li');
const appWrapper = document.querySelectorAll('.app-wrapper section');
const secondHand = document.querySelector('[data-second]');
const minutsHand = document.querySelector('[data-minuts]');
const hoursHand = document.querySelector('[data-hours]');

let selectedItem;

//modal script
alarm.addEventListener('click', () => {
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
    });
});

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