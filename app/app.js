document.addEventListener('DOMContentLoaded', function () {
    let localStorageData, parsingData;

    localStorageData = localStorage.getItem('birthdayDate');
    if (localStorageData) {
        renderAgeLoop();
    } else {
        document.getElementById('dob-template').style.display = 'block';
    }

    document.querySelector('form').addEventListener('submit', function (e) {
        e.preventDefault();

        let birthdayDateInput = document.getElementById('date');
        let birthdayDate = birthdayDateInput.valueAsDate;

        if (birthdayDate) {
            localStorage.setItem('birthdayDate', birthdayDate.getTime());
            document.getElementById('dob-template').style.display = 'none';
            renderAgeLoop();
        } else {
            return 'incorrect date';
        }
    });

    function renderAgeLoop() {
        localStorageData = localStorage.getItem('birthdayDate');
        setInterval(function () {
            parsingData = new Date(parseInt(localStorageData));
            let now = new Date();
            let duration = now - parsingData;
            let years = duration / 31556900000; // 1 year in milliseconds

            let majorMinor = years.toFixed(9).toString().split('.');
            document.getElementById('year').textContent = majorMinor[0];
            document.getElementById('milliseconds').textContent = majorMinor[1];
        }, 100);
        document.getElementById('age-template').style.display = 'block';
    }
});
