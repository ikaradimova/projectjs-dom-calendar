window.addEventListener('load', function () {
    localStorage.clear();

    /** adding calendar component */
    $('body').addElement('calendar-component');
    let calendar = $('calendar-component').addClass('hide').setAttribute('id', 'datepicker');
    let calendarComponent = new CalendarComponent('datepicker');
    calendarComponent.calendar(calendar);

    /** Date */
    let today = new Date();
    let currentMonth = today.getMonth();
    let currentYear = today.getFullYear();
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    /** html elements */
    let datepickerInput = $('#datepicker');
    let selectYear = $('#year').elems[0];
    let selectMonth = $('#month').elems[0];
    let previousButton = $('#previous').elems[0];
    let nextButton = $('#next').elems[0];

    /** initial calendar show and option for choosing date */
    showCalendar(currentMonth, currentYear);
    addDate();

    /**
     * Function for getting previous month data
     */
    function previous() {
        currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
        currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
        showCalendar(currentMonth, currentYear);
        addDate();
    }

    /**
     * Function for getting next month data
     */
    function next() {
        currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
        currentMonth = (currentMonth + 1) % 12;
        showCalendar(currentMonth, currentYear);
        addDate();
    }

    /**
     * Function for getting month and year from select and showing calendar for these values
     */
    function jump() {
        currentYear = parseInt(selectYear.value);
        currentMonth = parseInt(selectMonth.value);
        showCalendar(currentMonth, currentYear);
        addDate();
    }

    /** Event listeners */
    previousButton.addEventListener('click', function () {
        previous();
    });
    nextButton.addEventListener('click', function () {
        next();
    });
    selectYear.addEventListener('change', function () {
        jump();
    });
    selectMonth.addEventListener('change', function () {
        jump();
    });

    /**
     * Function that draws the calendar
     * @param month - current month
     * @param year - current year
     */
    function showCalendar(month, year) {
        /** gets which day of week is the first day of the current month and year */
        let firstDayOfCurrentMonth = (new Date(year, month)).getDay();
        /** gets which day of the week is the last day of the previous month */
        let lastDayOfLastMonthNum = (new Date(year, month, 0)).getDay();
        /** gets last day of previous month */
        let lastDayOfLastMonth = (new Date(year, month, 0)).getDate();
        let numberOfDaysForCurrentMonth = (new Date(year, month)).getDate();
        console.log(numberOfDaysForCurrentMonth);

        /** gets the body of the calendar and clears previous cells if any */
        let table = $('tbody');
        table.setAttribute('innerHtml', '');

        /** sets selects values to the current/chosen month and year */
        selectYear.value = year;
        selectMonth.value = month;

        /** date of month/begging with 1 */
        let date = 1;
        /** helper variable for counting the days from the next month that are filling the last row */
        let addDaysTillEnd = 0;

        /** creating cells */
        for (let i = 0; i < CalendarComponent.rowsInMonth(month, year); i++) {
            /** creating row*/
            table.addElement('tr');
            let row = $('tr').elems.pop();
            row.setAttribute('id', `row-${i}`);

            /** filling each row with cells */
            for (let j = 1; j <= 7; j++) {
                /** current row */
                let curRow = $(`#row-${i}`);
                /** checking for days that are from the prvious month */
                if (i === 0 && j < firstDayOfCurrentMonth) {
                    curRow.addElement('td', lastDayOfLastMonth - lastDayOfLastMonthNum + j);
                    let currentCell = $('td').elems.pop();
                    currentCell.setAttribute('class', 'previous-month-days');
                    currentCell.setAttribute('id', `cell-${lastDayOfLastMonth - lastDayOfLastMonthNum + j}`);
                }
                /** cheching for days that are from next month */
                else if (date > CalendarComponent.daysInMonth(month, year)) {
                    curRow.addElement('td', 1 + addDaysTillEnd);
                    let currentCell = $('td').elems.pop();
                    currentCell.setAttribute('class', 'next-month-days');
                    currentCell.setAttribute('id', `cell-${1 + addDaysTillEnd}`);
                    addDaysTillEnd++;
                }
                /** days from current month */
                else {
                    curRow.addElement('td', date);
                    let currentCell = $('td').elems.pop();
                    currentCell.setAttribute('id', `cell-${date}`);
                    /** check for current date */
                    if (date === today.getDate() &&
                        year === today.getFullYear() &&
                        month === today.getMonth()) {
                        currentCell.setAttribute('class', 'current-date');
                    }
                    /** increasing date */
                    date++;
                }
            }
        }

    }

    /**
     * Function that adds date into input field
     */
    function addDate() {
        $('td').elems.forEach(e => e.addEventListener('click', function () {
            /** clearing current data from input */
            datepickerInput.elems[0].setAttribute('innerText', '');
            /** getting date from datepicker and formating it */
            let date = e.id.split('-').pop();
            let eventDate;
            /** checks if clicked date is from previous month */
            if (e.classList.contains('previous-month-days')) {
                if (currentMonth - 1 < 0) {
                    eventDate = `${currentYear - 1}-${months[11]}-${date}`;
                } else {
                    eventDate = `${currentYear}-${months[currentMonth - 1]}-${date}`;
                }
            }
            /** checks if clicked date is from next month */
            else if (e.classList.contains('next-month-days')) {
                if (currentMonth === 11) {
                    eventDate = `${currentYear + 1}-${months[0]}-${date}`;
                } else {
                    eventDate = `${currentYear}-${months[currentMonth + 1]}-${date}`;
                }
            }
            /** date from current month */
            else {
                eventDate = `${currentYear}-${months[currentMonth]}-${date}`;
            }

            /** inserting date in input */
            datepickerInput.elems[0].setAttribute('value', eventDate);
        }));
    }
});

/** Hiding datepicker on click outside of datepicker container or on clicking again in the input */
document.addEventListener('click', function (e) {
    /** getting the element that was clicked */
    let targetElement = e.target;

    let calendar = $('calendar-component');
    /** checking if clicked element is input */
    if (targetElement === $('input').elems[0]) {
        calendar.toggleClass('hide');
        return;
    }
    let calendarBody = $('.container').elems[0];

    do {
        /** if clicked element is calendar body it does nothing */
        if (targetElement === calendarBody) {
            console.log('calendar');
            return;
        }
        /** getting up in the dom to check if clicked element is up in the hierarchy */
        targetElement = targetElement.parentNode;
    } while (targetElement);

    /** if clicked element is neither input, nor calendar body hides datepicker */
    calendar.addClass('hide');
});