$(document).ready(function () {
    let localStorageData, parsingData;

    localStorageData = localStorage.birthdayDate;
    if (localStorageData) {
        renderAgeLoop();
    } else {
        $('#dob-template').show();
    }

    $('form').on('submit', function (e) {
        e.preventDefault();

        let birthdayDate = $(this).find('#date')[0].valueAsDate;

        if (birthdayDate) {
            localStorage.birthdayDate = birthdayDate.getTime();
            $('#dob-template').hide();
            renderAgeLoop();
        } else {
            return 'incorrect date';
        }
    });

    function renderAgeLoop() {
        localStorageData = localStorage.birthdayDate;
        setInterval(function () {
            parsingData = new Date(parseInt(localStorageData));
            let now = new Date;
            let duration = now - parsingData;
            let years = duration / 31556900000; // 1 year in millisecond

            let majorMinor = years.toFixed(9).toString().split('.');
            $('#year').text(majorMinor[0]);
            $('#milliseconds').text(majorMinor[1]);
        }, 100);
        $('#age-template').show();
    }
});
