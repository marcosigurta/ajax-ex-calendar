function printMonth(month) {
    var dayInMonth = month.daysInMonth();
    console.log(dayInMonth);

    var template = $('#template').html();
    var compiled = Handlebars.compile(template);
    var target = $('.list');

    target.html('');
    for (var i = 1; i <= dayInMonth; i++) {
        var dateComplete = moment({ year: month.year(), month: month.month(), day: i });
        var dayHTML = compiled({
            "value": i,
            "dateComplete": dateComplete.format("YYYY-MM-DD")
        });
        target.append(dayHTML);
    }
}


function printHoliday(month) {
    var cYear = month.year();
    var cMonth = month.month();
    $.ajax({
        url: 'https://flynn.boolean.careers/exercises/api/holidays',
        method: 'GET',
        data: {
            'year': cYear,
            'month': cMonth
        },
        success: function (data, state) {
            var holidays = data['response'];
            for (var i = 0; i < holidays.length; i++) {
                console.log(holidays[i]);
                var element = $('.list li[data-dateComplete="' + holidays[i]["date"] + '"]');
                element.addClass('holidays');
                element.append('<br>' + holidays[i]['name']);

            }
        },
        error: function (error) {
            console.log('error');
        }
    });
}


function init() {
    var month = moment("2018-01-01");
    printMonth(month);
    printHoliday(month);
};

$(document).ready(init);
