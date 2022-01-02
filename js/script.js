const alarm = document.querySelector('[data-alarm]');
const modal = document.querySelector('.alarm-modal-container');
alarm.addEventListener('click', () => {
    modal.classList.toggle('activeModal');
});