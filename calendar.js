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

    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    let startWeek = 0;

    switch (calendarComponentType) {
        case 'month':
            showCalendar(currentMonth, currentYear, null);
            break;
        case 'week':
            showCalendar(currentMonth, currentYear, startWeek);
            break;
    }
    // showCalendar(currentMonth, currentYear, startWeek);
    // let tr = $(`#row-${0}`).elems[0];
    // console.log(tr);
    // let table = $('#calendar-body'); // body of the calendar
    //
    // // clearing all previous cells
    // table.setAttribute('innerHtml', '');
    // table.addElement(tr);
    // let row = $('tr').elems.pop();
    // row.setAttribute('id', `row-${0}`);

    addEvent();
    showEvent();

    function previous() {
        switch (calendarComponentType) {
            case 'month':
                currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
                currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
                showCalendar(currentMonth, currentYear);

                break;
            case 'week':
                if(startWeek === 0){
                    startWeek = 4;
                    currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
                    currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
                }
                console.log(--startWeek);
                showCalendar(currentMonth, currentYear, startWeek);
                // startWeek--;
                break;
        }
        addEvent();
        showEvent();

    }

    function next() {
        switch (calendarComponentType) {
            case 'month':
                currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
                currentMonth = (currentMonth + 1) % 12;
                showCalendar(currentMonth, currentYear);
                break;
            case 'week':
                // startWeek++;
                if(startWeek === 4){
                    startWeek = -1;
                    currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
                    currentMonth = (currentMonth + 1) % 12;
                }
                console.log(++startWeek);
                showCalendar(currentMonth, currentYear, startWeek);
                // startWeek++;
                break;
        }
        addEvent();
        showEvent();
    }

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

    function showCalendar(month, year, rowNumber) {
        console.log(rowNumber);
        // gets the first day of the current month and year
        let firstDayOfCurrentMonth = (new Date(year, month)).getDay();
        let lastDayOfLastMonthNum = (new Date(year, month, 0)).getDay();
        let lastDayOfLastMonth = (new Date(year, month, 0)).getDate();

        let table = $('tbody'); // body of the calendar

        // clearing all previous cells
        table.setAttribute('innerHtml', '');

        selectYear.value = year;
        selectMonth.value = month;

        // creating all cells
        let date = 1;
        let addDaysTillEnd = 0;

        switch (calendarComponentType) {
            case 'month':
                console.log(rowNumber);
                for (let i = 0; i < 5; i++) {
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
                        else if (date > daysInMonth(month, year)) {
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
                            currentCell.setAttribute('id', `#cell-${date}`);
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
                break;
            case 'week':
                console.log(rowNumber);
                // let i = 0;
                // while (i <= rowNumber) {
                for (let i = 0; i <= rowNumber; i++) {
                    // console.log(i);
                    //     console.log(rowNumber);
                        table.addElement('tr');
                        let row = $('tr').elems.pop();
                        row.setAttribute('id', `row-${i}`);

                        //creating individual cells, filing them up with data.
                        for (let j = 1; j <= 7; j++) {
                            let curRow = $(`#row-${i}`);
                            // console.log(curRow);
                            if (i === 0 && j < firstDayOfCurrentMonth) {
                                curRow.addElement('td', '');
                                // let currentCell = $('td').elems.pop();
                                // currentCell.setAttribute('class', 'next-month-days');
                            }
                            else if (date > daysInMonth(month, year)) {
                            //     curRow.addElement('td', 1 + addDaysTillEnd);
                            //     addDaysTillEnd++;
                            //     let currentCell = $('td').elems.pop();
                            //     currentCell.setAttribute('class', 'next-month-days');
                            //     // console.log(addDaysTillEnd);
                            //     //lastDayOfCurrentMonthNum
                                break;
                            }

                            else {
                                let cell = curRow.addElement('td', date);
                                let currentCell = $('td').elems.pop();
                                currentCell.setAttribute('id', `#cell-${date}`);
                                if (date === today.getDate() &&
                                    year === today.getFullYear() &&
                                    month === today.getMonth()) {
                                    currentCell.setAttribute('class', 'current-date');
                                } // color today's date
                                date++;
                            }
                        }
                }

                table.elems[0].id = '';
                let rowToTake = $(`#row-${rowNumber}`);
                console.log(rowToTake);
                let dataCells = rowToTake.getChildren();
                table.setAttribute('innerHtml', '');
                console.log(table);
                let row = table.addElement('tr');
                // let row = $('tr').elems.pop();
                row.setAttribute('id', `row-${rowNumber}`);
                console.log(table);
                // console.log(firstDayOfCurrentMonth);
                dataCells.each(function (cell, key) {
                    let date = cell.innerText;
                    // console.log(key);
                    // console.log(date);
                    if (rowNumber === 0 && key < firstDayOfCurrentMonth - 1) {
                        // console.log('test');
                        row.addElement('td', '');
                    }
                    // else if (date > daysInMonth(month, year)) {
                    //     break;
                    // }

                    else {
                        let cell = row.addElement('td', date);
                        // console.log(cell);
                        let currentCell = $('td').elems.pop();
                        currentCell.setAttribute('id', `#cell-${date}`);
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


// check how many days in a month code
    function daysInMonth(iMonth, iYear) {
        return 32 - new Date(iYear, iMonth, 32).getDate();
    }

    function addEvent() {
        $('td').elems.forEach(e => e.addEventListener('click', function () {
            let eventDescription = prompt('Enter event: ');
            let date = e.id.split('-').pop();
            let eventDate = `${currentYear}-${months[currentMonth]}-${date}`;
            e.innerHTML += `</br>${eventDescription}`;

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
            if (localStorage.getItem('events')) {
                let date = element.id.split('-').pop();
                let currentEventDate = `${currentYear}-${months[currentMonth]}-${date}`;
                let events = [];
                JSON.parse(localStorage.getItem('events')).forEach(function (event) {
                    events.push(event);
                });

                console.log(events);
                events.forEach(function (event) {
                    if (event.eventDate === currentEventDate) {
                        element.innerHTML += `</br>${event.eventDescription}`;
                    }
                })
            }
        })
    }

});