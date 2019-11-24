(function () {

    let $ = document.getElementById.bind(document);
    // let $$ = document.querySelectorAll.bind(document);

    let App = function ($el) {
        this.$el = $el;
        this.load();

        this.$el.addEventListener(
            'submit', this.submit.bind(this)
        );

        if (this.dob) {
            this.renderAgeLoop();
        } else {
            this.renderChoose();
        }
    };

    App.fn = App.prototype;

    App.fn.load = function () {
        let value;

        value = localStorage.dob;
        if (value)
            this.dob = new Date(parseInt(value));
    };

    App.fn.save = function () {
        if (this.dob)
            localStorage.dob = this.dob.getTime();
    };

    App.fn.submit = function (e) {
        e.preventDefault();

        let input = this.$$('input')[0];
        if (!input.valueAsDate) return;

        this.dob = input.valueAsDate;
        this.save();
        this.renderAgeLoop();
    };

    App.fn.renderChoose = function () {
        this.html(this.view('dob')());
    };

    App.fn.renderAgeLoop = function () {
        setInterval(this.renderAge.bind(this), 100);
    };

    App.fn.renderAge = function () {
        let now = new Date;
        let duration = now - this.dob;
        let years = duration / 31556900000; // 1 year in millisecond

        let majorMinor = years.toFixed(9).toString().split('.');

        requestAnimationFrame(function () {
            this.html(this.view('age')({
                year: majorMinor[0],
                milliseconds: majorMinor[1]
            }));
        }.bind(this));
    };

    App.fn.$$ = function (sel) {
        return this.$el.querySelectorAll(sel);
    };

    App.fn.html = function (html) {
        this.$el.innerHTML = html;
    };

    App.fn.view = function (name) {
        let $el = $(name + '-template');
        return Handlebars.compile($el.innerHTML);
    };

    window.app = new App($('app'))

})();
