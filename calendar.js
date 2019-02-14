window.addEventListener('load', function () {
    localStorage.clear();
    // adding calendar component
    let bodyElement = $('body').addElement('calendar-component');
    let calendar = $('calendar-component');
    let calendarComponent = new CalendarComponent('calendar', 'week');
    calendarComponent.calendar(calendar);
    let calendarComponentType = calendarComponent.getOptions();
    console.log(calendarComponentType);

    let today = new Date();
    let currentMonth = today.getMonth();
    let currentYear = today.getFullYear();
    let selectYear = $('#year').elems[0];
    let selectMonth = $('#month').elems[0];
    let previousButton = $('#previous').elems[0];
    let nextButton = $('#next').elems[0];
    let firstDayOfCurrentMonth = (new Date(currentYear, currentMonth)).getDay();

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

    CalendarComponent.getNumberOfDaysInLastMonthWeek(currentMonth, currentYear);

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
                CalendarComponent.getNumberOfDaysInLastMonthWeek(currentMonth, currentYear);
                if(startWeek === 0){
                    currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
                    currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
                    if(CalendarComponent.getNumberOfDaysInLastMonthWeek(currentMonth - 1, currentYear === 0)){
                        startWeek = CalendarComponent.rowsInMonth(currentMonth - 1, currentYear);
                    } else {
                        startWeek = CalendarComponent.rowsInMonth(currentMonth - 1, currentYear) - 1;
                    }
                }
                startWeek--;
                showCalendar(currentMonth, currentYear, startWeek);
                break;
        }
        CalendarComponent.getNumberOfDaysInLastMonthWeek(currentMonth, currentYear);

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
                // startWeek++;
                if((startWeek === CalendarComponent.rowsInMonth(currentMonth, currentYear) - 2 &&
                        CalendarComponent.getNumberOfDaysInLastMonthWeek(currentMonth, currentYear) !== 0) ||
                    (startWeek === CalendarComponent.rowsInMonth(currentMonth, currentYear) - 1 &&
                    CalendarComponent.getNumberOfDaysInLastMonthWeek(currentMonth, currentYear) === 0)
                ){
                    startWeek = -1;
                    currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
                    currentMonth = (currentMonth + 1) % 12;
                }
                console.log(++startWeek);
                showCalendar(currentMonth, currentYear, startWeek);
                // startWeek++;
                break;
        }
        CalendarComponent.getNumberOfDaysInLastMonthWeek(currentMonth, currentYear);
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
        CalendarComponent.getNumberOfDaysInLastMonthWeek(currentMonth, currentYear);

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
            table.addElement('tr');
            let row = $('tr').elems.pop();
            row.setAttribute('id', `row-${i}`);

            //creating individual cells, filing them up with data.
            for (let j = 1; j <= 7; j++) {
                let curRow = $(`#row-${i}`);
                // console.log(curRow);
                if (i === 0 && j < firstDayOfCurrentMonth) {
                    curRow.addElement('td', lastDayOfLastMonth - lastDayOfLastMonthNum + j);
                    let currentCell = $('td').elems.pop();
                    currentCell.setAttribute('class', 'previous-month-days');
                }
                else if (date > CalendarComponent.daysInMonth(month, year)) {
                    curRow.addElement('td', 1 + addDaysTillEnd);
                    addDaysTillEnd++;
                    let currentCell = $('td').elems.pop();
                    currentCell.setAttribute('class', 'next-month-days');
                    // console.log(addDaysTillEnd);
                    //lastDayOfCurrentMonthNum
                    // break;
                }

                else {
                    let cell = curRow.addElement('td', date);
                    let currentCell = $('td').elems.pop();
                    currentCell.setAttribute('id', `cell-${date}`);
                    // console.log(currentCell);
                    // cell.addElement('div', 'No events on this date')
                    //     .setAttribute('class', 'popup')
                    //     .setAttribute('style', 'display: none');
                    if (date === today.getDate() &&
                        year === today.getFullYear() &&
                        month === today.getMonth()) {
                        currentCell.setAttribute('class', 'current-date');
                    } // color today's date
                    date++;
                }
            }
        }

        switch (calendarComponentType) {
            // case 'month':
            //
            //     break;
            case 'week':
                // console.log(rowNumber);
                // // let i = 0;
                // // while (i <= rowNumber) {
                // for (let i = 0; i <= rowNumber; i++) {
                //     // console.log(i);
                //     //     console.log(rowNumber);
                //         table.addElement('tr');
                //         let row = $('tr').elems.pop();
                //         row.setAttribute('id', `row-${i}`);
                //
                //         //creating individual cells, filing them up with data.
                //         for (let j = 1; j <= 7; j++) {
                //             let curRow = $(`#row-${i}`);
                //             // console.log(curRow);
                //             if (i === 0 && j < firstDayOfCurrentMonth) {
                //                 curRow.addElement('td', '');
                //                 // let currentCell = $('td').elems.pop();
                //                 // currentCell.setAttribute('class', 'next-month-days');
                //             }
                //             else if (date > CalendarComponent.daysInMonth(month, year)) {
                //             //     curRow.addElement('td', 1 + addDaysTillEnd);
                //             //     addDaysTillEnd++;
                //             //     let currentCell = $('td').elems.pop();
                //             //     currentCell.setAttribute('class', 'next-month-days');
                //             //     // console.log(addDaysTillEnd);
                //             //     //lastDayOfCurrentMonthNum
                //                 break;
                //             }
                //
                //             else {
                //                 let cell = curRow.addElement('td', date);
                //                 let currentCell = $('td').elems.pop();
                //                 currentCell.setAttribute('id', `cell-${date}`);
                //                 if (date === today.getDate() &&
                //                     year === today.getFullYear() &&
                //                     month === today.getMonth()) {
                //                     currentCell.setAttribute('class', 'current-date');
                //                 } // color today's date
                //                 date++;
                //             }
                //         }
                // }

                table.elems[0].id = '';
                /** getting the row we want */
                let rowToTake = $(`#row-${rowNumber}`);
                /** getting all cells for the row */
                let dataCells = rowToTake.getChildren();
                /** clearing calendar body */
                table.setAttribute('innerHtml', '');
                /** creating new row in calendar */
                // table.addElement('tr');
                table.addElement('tr');
                let row = $('tr').elems.pop();
                row.setAttribute('id', `row-${rowNumber}`);
                // row = row.elems[0];
                /** getting current row */
                let curRow = $(`#row-${rowNumber}`);
                // console.log(firstDayOfCurrentMonth);
                /** recreating cells in new row */
                dataCells.each(function (cell, key) {
                    let date = cell.innerText;
                    // console.log(key);
                    // console.log(date);
                    if (rowNumber === 0 && key < firstDayOfCurrentMonth - 1) {
                        // console.log('test');
                        curRow.addElement('td', date);
                        let currentCell = $('td').elems.pop();
                        currentCell.setAttribute('class', 'previous-month-days');
                    }
                    // else if (date > CalendarComponent.daysInMonth(month, year)) {
                    //     curRow.addElement('td', date);
                    //     addDaysTillEnd++;
                    //     let currentCell = $('td').elems.pop();
                    //     currentCell.setAttribute('class', 'next-month-days');
                    //     // console.log(addDaysTillEnd);
                    //     //lastDayOfCurrentMonthNum
                    //     // break;
                    // }

                    else {
                        let cell = curRow.addElement('td', date);
                        // console.log(cell);
                        let currentCell = $('td').elems.pop();
                        currentCell.setAttribute('id', `cell-${date}`);
                        if (date === today.getDate() &&
                            year === today.getFullYear() &&
                            month === today.getMonth()) {
                            currentCell.setAttribute('class', 'current-date');
                        } // color today's date
                        // date++;
                    }
                    // console.log(cell.innerText);
                    // row.addElement()
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
            let eventDate = `${currentYear}-${months[currentMonth]}-${date}`;
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

    function showEvent() {
        $('td').elems.forEach(function (element) {
            /** checking if there are any events created */
            if (localStorage.getItem('events')) {
                /** getting date and formatting it */
                let date = element.id.split('-').pop();
                let currentEventDate = `${currentYear}-${months[currentMonth]}-${date}`;

                let events = [];
                JSON.parse(localStorage.getItem('events')).forEach(function (event) {
                    events.push(event);
                });

                /** showing event in data cell */
                events.forEach(function (event) {
                    if (event.eventDate === currentEventDate) {
                        element.innerHTML += `</br>${event.eventDescription}`;
                    }
                })
            }
        })
    }

});