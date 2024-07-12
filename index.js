const radioButtons = document.querySelectorAll('.radioButton');
const radioSecond = document.querySelector('.radioSecond');
const hidFirst = document.querySelector('.hidfirst');
const hidSecond = document.querySelector('.hidsecond');

radioButtons.forEach((radioButton, index) => {
    radioButton.addEventListener('click', () => {
        hidFirst.style.display = 'none';
        hidSecond.style.display = 'none';
        radioSecond.style.display = 'block';
        if (index === 1) {
            hidFirst.style.display = 'block';
        } else if (index === 2) {
            hidSecond.style.display = 'block';
        }
        document.querySelectorAll('#metal').forEach(checkbox => {
            checkbox.checked = false;
        });
    });
});
const message = document.querySelector('.sub')
    message.addEventListener('click', () => {
        alert('Thank you for your submission!');
        
    });

