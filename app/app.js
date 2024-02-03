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
        var minutes = 1000 * 60;
        var hours = minutes * 60;
        var days = hours * 24;
        var years1 = days * 365.25;
        localStorageData = localStorage.birthdayDate;
        setInterval(function () {
            parsingData = new Date(parseInt(localStorageData));
            let now = new Date;
            let duration = now - parsingData;

            let years = duration / years1;

            let majorMinor = years.toFixed(9).toString().split('.');
            $('#year').text(majorMinor[0]);
            $('#milliseconds').text(majorMinor[1]);
        }, 100);
        $('#age-template').show();
    }
});