document.addEventListener('DOMContentLoaded', function() {
    const resultElement = document.getElementById('result');
    const formData = JSON.parse(localStorage.getItem('formData'));

    if (formData) {
        resultElement.innerText = JSON.stringify(formData, null, 2);
    } else {
        resultElement.innerText = 'No form data found.';
    }
});
