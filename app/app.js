$(document).ready(function () {
    let localStorageData, parsingData;

    localStorageData = localStorage.birthdayDate;
    if (localStorageData) {
        $('#age-template').show();
        setInterval(function () {
            parsingData = new Date(parseInt(localStorageData));
            let now = new Date;
            let duration = now - parsingData;
            let years = duration / 31556900000; // 1 year in millisecond

            let majorMinor = years.toFixed(9).toString().split('.');
            $('#year').text(majorMinor[0]);
            $('#milliseconds').text(majorMinor[1]);
        }, 100);
    } else {
        $('#dob-template').show();
    }

    $('form').on('submit', function (e) {
        e.preventDefault();

        let birthdayDate = $(this).find('#date')[0].valueAsDate;
        if (!birthdayDate) return 'incorrect date';

        if (birthdayDate)
            localStorage.birthdayDate = birthdayDate.getTime();
    });
});