let viewToggle = $('#viewToggle').elems[0];

/** initial calendar creation on load */
window.addEventListener('load', function () {
    /** clearing localStorage */
    localStorage.clear();
    /** attaching calendar component tag to body */
    $('body').addElement('calendar-component');
    let calendar = $('calendar-component');
    /** creating new calendarComponent */
    let calendarComponent = new CalendarComponent('calendar', 'week');
    calendarComponent.calendar(calendar);
    createCalendar('month');
});

/** toggling month and week views */
viewToggle.addEventListener('click', function () {
    /** getting calendar component */
    let calendar = $('calendar-component');
    /** clearing calendar */
    calendar.innerHTML = '';
    if (viewToggle.innerText.toLowerCase() === 'month view') {
        /** creating new calendarComponent */
        let calendarComponent = new CalendarComponent('calendar', 'month');
        calendarComponent.calendar(calendar);
        /** changing toggle button's text */
        $('#viewToggle').setAttribute('innerHtml', 'Week view');
        createCalendar('month');
    } else if (viewToggle.innerText.toLowerCase() === 'week view') {
        /** creating new calendarComponent */
        let calendarComponent = new CalendarComponent('calendar', 'week');
        calendarComponent.calendar(calendar);
        /** changing toggle button's text */
        $('#viewToggle').setAttribute('innerHtml', 'Month view');
        createCalendar('week');
    }
});

/**
 * Function for creating calendar
 * @param calendarComponentType
 */
function createCalendar(calendarComponentType) {
    let today = new Date();
    let currentMonth = today.getMonth();
    let currentYear = today.getFullYear();
    let selectYear = $('#year').elems[0];
    let selectMonth = $('#month').elems[0];
    let previousButton = $('#previous').elems[0];
    let nextButton = $('#next').elems[0];
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let startWeek = 0;

    /** initial showing calendar depending on it's view (month/week) */
    switch (calendarComponentType) {
        case 'month':
            showCalendar(currentMonth, currentYear, null);
            break;
        case 'week':
            showCalendar(currentMonth, currentYear, startWeek);
            break;
    }

    /** adding and showing events */
    addEvent();
    showEvent();

    /**
     * Function for getting previous month/week data
     */
    function previous() {
        switch (calendarComponentType) {
            case 'month':
                currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
                currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
                showCalendar(currentMonth, currentYear);
                break;
            case 'week':
                if (startWeek === 0) {
                    currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
                    currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
                    if (CalendarComponent.getNumberOfDaysInLastMonthWeek(currentMonth - 1, currentYear) === 0) {
                        startWeek = CalendarComponent.rowsInMonth(currentMonth, currentYear);
                    } else {
                        startWeek = CalendarComponent.rowsInMonth(currentMonth, currentYear) - 1;
                        console.log(startWeek);
                    }
                }
                startWeek--;
                showCalendar(currentMonth, currentYear, startWeek);
                break;
        }
        addEvent();
        showEvent();
    }

    /**
     * Function for getting next month/week data
     */
    function next() {
        switch (calendarComponentType) {
            case 'month':
                currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
                currentMonth = (currentMonth + 1) % 12;
                showCalendar(currentMonth, currentYear);
                break;
            case 'week':
                if ((startWeek === CalendarComponent.rowsInMonth(currentMonth, currentYear) - 2 &&
                        CalendarComponent.getNumberOfDaysInLastMonthWeek(currentMonth, currentYear) !== 0) ||
                    (startWeek === CalendarComponent.rowsInMonth(currentMonth, currentYear) - 1 &&
                        CalendarComponent.getNumberOfDaysInLastMonthWeek(currentMonth, currentYear) === 0)
                ) {
                    startWeek = -1;
                    currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
                    currentMonth = (currentMonth + 1) % 12;
                }
                startWeek++;
                showCalendar(currentMonth, currentYear, startWeek);
                break;
        }
        addEvent();
        showEvent();
    }

    /**
     * Function for getting month and year from select and showing calendar for these values
     */
    function jump() {
        switch (calendarComponentType) {
            case 'month':
                currentYear = parseInt(selectYear.value);
                currentMonth = parseInt(selectMonth.value);
                showCalendar(currentMonth, currentYear, null);
                break;
            case 'week':
                currentYear = parseInt(selectYear.value);
                currentMonth = parseInt(selectMonth.value);
                showCalendar(currentMonth, currentYear, 0);
                break;
        }
        addEvent();
        showEvent();
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
     * @param rowNumber - number of row to show if week view
     */
    function showCalendar(month, year, rowNumber) {
        /** gets which day of week is the first day of the current month and year */
        let firstDayOfCurrentMonth = (new Date(year, month)).getDay();
        /** gets which day of the week is the last day of the previous month */
        let lastDayOfLastMonthNum = (new Date(year, month, 0)).getDay();
        /** gets last day of previous month */
        let lastDayOfLastMonth = (new Date(year, month, 0)).getDate();

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

        for (let i = 0; i < CalendarComponent.rowsInMonth(month, year); i++) {
            /** creating new rows */
            table.addElement('tr');
            let row = $('tr').elems.pop();
            row.setAttribute('id', `row-${i}`);

            /** creating cells for each row */
            for (let j = 1; j <= 7; j++) {
                /** current row */
                let curRow = $(`#row-${i}`);
                /** days from previous month */
                if (i === 0 && j < firstDayOfCurrentMonth) {
                    curRow.addElement('td', lastDayOfLastMonth - lastDayOfLastMonthNum + j);
                    let currentCell = $('td').elems.pop();
                    currentCell.setAttribute('class', 'previous-month-days');
                    currentCell.setAttribute('id', `cell-${lastDayOfLastMonth - lastDayOfLastMonthNum + j}`);
                }
                /** days from next month */
                else if (date > CalendarComponent.daysInMonth(month, year)) {
                    curRow.addElement('td', 1 + addDaysTillEnd);
                    addDaysTillEnd++;
                    let currentCell = $('td').elems.pop();
                    currentCell.setAttribute('class', 'next-month-days');
                    currentCell.setAttribute('id', `cell-${1 + addDaysTillEnd}`);
                }
                /** current month cells */
                else {
                    curRow.addElement('td', date);
                    let currentCell = $('td').elems.pop();
                    currentCell.setAttribute('id', `cell-${date}`);
                    /** current date */
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

        switch (calendarComponentType) {
            /** if week view */
            case 'week':
                table.elems[0].id = '';
                /** getting the row we want */
                let rowToTake = $(`#row-${rowNumber}`);
                /** getting all cells for the row */
                let dataCells = rowToTake.getChildren();
                /** clearing calendar body */
                table.setAttribute('innerHtml', '');
                /** creating new row in calendar */
                table.addElement('tr');
                let row = $('tr').elems.pop();
                row.setAttribute('id', `row-${rowNumber}`);
                /** getting current row */
                let curRow = $(`#row-${rowNumber}`);
                /** recreating cells in new row */
                dataCells.each(function (cell, key) {
                    let date = cell.innerText;
                    /** days from previous month */
                    if (rowNumber === 0 && key < firstDayOfCurrentMonth - 1) {
                        curRow.addElement('td', date);
                        let currentCell = $('td').elems.pop();
                        currentCell.setAttribute('class', 'previous-month-days');
                        currentCell.setAttribute('id', `cell-${date}`);
                    }
                    /** days from next month */
                    else if (date > CalendarComponent.daysInMonth(month, year)) {
                        curRow.addElement('td', date);
                        addDaysTillEnd++;
                        let currentCell = $('td').elems.pop();
                        currentCell.setAttribute('class', 'next-month-days');
                        currentCell.setAttribute('id', `cell-${date}`);
                    }
                    /** days from current month */
                    else {
                        curRow.addElement('td', date);
                        let currentCell = $('td').elems.pop();
                        currentCell.setAttribute('id', `cell-${date}`);
                        currentCell.setAttribute('id', `cell-${date}`);
                        if (date === today.getDate() &&
                            year === today.getFullYear() &&
                            month === today.getMonth()) {
                            currentCell.setAttribute('class', 'current-date');
                        }
                    }
                });
        }
    }

    /**
     * Function for adding events to dates
     */
    function addEvent() {
        $('td').elems.forEach(e => e.addEventListener('click', function () {
            /** prompt for entering event description */
            let eventDescription = prompt('Enter event: ');
            /** getting date and formatting it */
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

            /** checks if event description is empty */
            if (eventDescription === null || eventDescription.length <= 0) {
                return;
            }

            /** adding event in data cell */
            e.innerHTML += `</br>${eventDescription}`;
            /** storing events in localStorage */
            let events = [];
            if (localStorage.getItem('events') == null || localStorage.getItem('events') === '[]') {
                let id = 1;
                let event = {id, eventDescription, eventDate};
                console.log(event);
                events.push(event);
                localStorage.setItem('events', JSON.stringify(events));
            } else {
                let id = JSON.parse(localStorage.getItem('events')).pop().id + 1;
                let event = {id, eventDescription, eventDate};
                console.log(event);
                JSON.parse(localStorage.getItem('events')).forEach(function (item) {
                    events.push(item);
                });
                events.push(event);
                localStorage.setItem('events', JSON.stringify(events));
            }
        }));
    }

    /**
     * Function for showing events
     */
    function showEvent() {
        $('td').elems.forEach(function (e) {
            /** checking if there are any events created */
            if (localStorage.getItem('events')) {
                /** getting date and formatting it */
                let date = e.id.split('-').pop();
                let currentEventDate;
                /** checks if clicked date is from previous month */
                if (e.classList.contains('previous-month-days')) {
                    if (currentMonth - 1 < 0) {
                        currentEventDate = `${currentYear - 1}-${months[11]}-${date}`;
                    } else {
                        currentEventDate = `${currentYear}-${months[currentMonth - 1]}-${date}`;
                    }
                }
                /** checks if clicked date is from next month */
                else if (e.classList.contains('next-month-days')) {
                    if (currentMonth === 11) {
                        currentEventDate = `${currentYear + 1}-${months[0]}-${date}`;
                    } else {
                        currentEventDate = `${currentYear}-${months[currentMonth + 1]}-${date}`;
                    }
                }
                /** date from current month */
                else {
                    currentEventDate = `${currentYear}-${months[currentMonth]}-${date}`;
                }

                // let currentEventDate = `${currentYear}-${months[currentMonth]}-${date}`;
                // console.log(currentEventDate);

                let events = [];
                JSON.parse(localStorage.getItem('events')).forEach(function (event) {
                    events.push(event);
                });

                /** showing event in data cell */
                events.forEach(function (event) {
                    if (event.eventDate === currentEventDate) {
                        e.innerHTML += `</br>${event.eventDescription}`;
                    }
                })
            }
        })
    }
}