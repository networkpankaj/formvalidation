document.addEventListener('DOMContentLoaded', function() {
    const radioButtons = document.querySelectorAll('.radioButton');
    const hidFirst = document.querySelector('.dropdownFirst');
    const hidSecond = document.querySelector('.dropdownSecond');
    const radioSecond = document.querySelector('.OthodonticCheckbox');
    const form = document.getElementById('myForm');

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

            resetDropdownOptions(hidFirst);
            resetDropdownOptions(hidSecond);
        });
    });

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        if (validateForm()) {
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            data.radio = document.querySelector('input[name="radio"]:checked').id;
            data.metal = document.getElementById('metal').checked;

            localStorage.setItem('formData', JSON.stringify(data));
            window.location.href = 'result.html';
        }
    });

    function validateForm() {
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const modalitySelected = document.querySelector('input[name="radio"]:checked');
        const checkboxChecked = document.querySelector('.OthodonticCheckbox input[type="checkbox"]').checked;

        let isValid = true;

        if (name === '') {
            setError('nameError', 'Please fill in your name.');
            isValid = false;
        } else {
            setError('nameError', '');
        }

        if (phone === '') {
            setError('phoneError', 'Please fill in your phone number.');
            isValid = false;
        } else if (!isValidPhone(phone)) {
            setError('phoneError', 'Please enter a valid phone number.');
            isValid = false;
        } else {
            setError('phoneError', '');
        }

        if (email === '') {
            setError('emailError', 'Please fill in your email.');
            isValid = false;
        } else if (!isValidEmail(email)) {
            setError('emailError', 'Please enter a valid email address.');
            isValid = false;
        } else {
            setError('emailError', '');
        }

        if (!modalitySelected) {
            setError('modalityError', 'Please select an Orthodontic Treatment Modality.');
            isValid = false;
        } else {
            setError('modalityError', '');
        }

        if (!checkboxChecked) {
            setError('checkboxError', 'Please check the required checkbox.');
            isValid = false;
        } else {
            setError('checkboxError', '');
        }

        return isValid;
    }

    function setError(id, message) {
        const errorSpan = document.getElementById(id);
        errorSpan.innerText = message;
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function isValidPhone(phone) {
        return /^\d{10}$/.test(phone);
    }

    function resetDropdownOptions(dropdown) {
        if (dropdown) {
            const options = dropdown.querySelectorAll('option');
            options.forEach((option, index) => {
                if (index === 0) {
                    option.selected = true;
                } else {
                    option.selected = false;
                    option.disabled = true;
                }
            });
        }
    }

    document.getElementById('name').addEventListener('input', function() {
        if (this.value.trim() !== '') {
            setError('nameError', '');
        }
    });

    document.getElementById('phone').addEventListener('input', function() {
        if (this.value.trim() !== '' && isValidPhone(this.value)) {
            setError('phoneError', '');
        }
    });

    document.getElementById('email').addEventListener('input', function() {
        if (this.value.trim() !== '' && isValidEmail(this.value)) {
            setError('emailError', '');
        }
    });

    document.querySelectorAll('input[name="radio"]').forEach(radio => {
        radio.addEventListener('change', function() {
            if (document.querySelector('input[name="radio"]:checked')) {
                setError('modalityError', '');
            }
        });
    });

    document.querySelector('.OthodonticCheckbox input[type="checkbox"]').addEventListener('change', function() {
        if (this.checked) {
            setError('checkboxError', '');
        }
    });
});
