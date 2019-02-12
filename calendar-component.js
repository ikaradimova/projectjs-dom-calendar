class CalendarComponent extends HTMLElement {

    type;
    options;
    // today = new Date();
    // currentMonth = this.today.getMonth();
    // currentYear = this.today.getFullYear();
    // selectYear = $('#year').elems[0];
    // selectMonth = $('#month').elems[0];
    // previousButton = $('#previous').elems[0];
    // nextButton = $('#next').elems[0];
    // today;
    // currentMonth;
    // currentYear;
    // selectYear;
    // selectMonth;

    months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    constructor(type, options = '') {
        super();
        this.type = type;
        this.options = options;
        this.today = new Date();
        this.currentMonth = this.today.getMonth();
        this.currentYear = this.today.getFullYear();
        // this.selectYear = $('#year').elems[0];
        // this.selectMonth = $('#month').elems[0];
        // previousButton = $('#previous').elems[0];
        // nextButton = $('#next').elems[0];
    }

    calendar(calendar) {
        calendar.setAttribute('innerHtml', `
            <div class="container col-sm-5">
                <div class="card">
                    <div class="form-inline" id="nav">
                        <button id="previous">&lsaquo;</button>
                        <form class="form-inline">
                            <label for="month"></label>
                            <select class="form-control" name="month" id="month">
                                <option value=0>Jan</option>
                                <option value=1>Feb</option>
                                <option value=2>Mar</option>
                                <option value=3>Apr</option>
                                <option value=4>May</option>
                                <option value=5>Jun</option>
                                <option value=6>Jul</option>
                                <option value=7>Aug</option>
                                <option value=8>Sep</option>
                                <option value=9>Oct</option>
                                <option value=10>Nov</option>
                                <option value=11>Dec</option>
                            </select>
            
                            <label for="year"></label>
                            <select class="form-control" name="year" id="year">
                                <option value=1990>1990</option>
                                <option value=1991>1991</option>
                                <option value=1992>1992</option>
                                <option value=1993>1993</option>
                                <option value=1994>1994</option>
                                <option value=1995>1995</option>
                                <option value=1996>1996</option>
                                <option value=1997>1997</option>
                                <option value=1998>1998</option>
                                <option value=1999>1999</option>
                                <option value=2000>2000</option>
                                <option value=2001>2001</option>
                                <option value=2002>2002</option>
                                <option value=2003>2003</option>
                                <option value=2004>2004</option>
                                <option value=2005>2005</option>
                                <option value=2006>2006</option>
                                <option value=2007>2007</option>
                                <option value=2008>2008</option>
                                <option value=2009>2009</option>
                                <option value=2010>2010</option>
                                <option value=2011>2011</option>
                                <option value=2012>2012</option>
                                <option value=2013>2013</option>
                                <option value=2014>2014</option>
                                <option value=2015>2015</option>
                                <option value=2016>2016</option>
                                <option value=2017>2017</option>
                                <option value=2018>2018</option>
                                <option value=2019>2019</option>
                                <option value=2020>2020</option>
                                <option value=2021>2021</option>
                                <option value=2022>2022</option>
                                <option value=2023>2023</option>
                                <option value=2024>2024</option>
                                <option value=2025>2025</option>
                                <option value=2026>2026</option>
                                <option value=2027>2027</option>
                                <option value=2028>2028</option>
                                <option value=2029>2029</option>
                                <option value=2030>2030</option>
                            </select>
                        </form>
                        <button id="next">&rsaquo;</button>
                    </div>
            
                    <table class="table" id="calendar">
                        <thead>
                        <tr>
                            <th>Mon</th>
                            <th>Tue</th>
                            <th>Wed</th>
                            <th>Thu</th>
                            <th>Fri</th>
                            <th>Sat</th>
                            <th>Sun</th>
                        </tr>
                        </thead>
                        <tbody id="calendar-body">
            
                        </tbody>
                    </table>
                    <br/>
                </div>
            </div>
        `);
    }

    getType(){
        return this.type;
    }

    getOptions(){
        return this.options;
    }

    // previous(currentMonth, currentYear) {
    //     currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
    //     currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
    //     this.showCalendar(currentMonth, currentYear);
    //     if(this.type === 'calendar'){
    //         this.addEvent();
    //         this.showEvent();
    //     }
    // }
    //
    // next(currentMonth, currentYear) {
    //     currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
    //     currentMonth = (currentMonth + 1) % 12;
    //     this.showCalendar(currentMonth, currentYear);
    //     if(this.type === 'calendar'){
    //         this.addEvent();
    //         this.showEvent();
    //     }
    // }
    //
    // jump(currentMonth, currentYear, selectMonth, selectYear) {
    //     currentYear = parseInt(selectYear);
    //     currentMonth = parseInt(selectMonth);
    //     this.showCalendar(currentMonth, currentYear);
    //     if(this.type === 'calendar'){
    //         this.addEvent();
    //         this.showEvent();
    //     }
    // }
    //
    // showCalendar(month, year, selectMonth, selectYear) {
    //
    //     console.log(month);
    //     console.log(year);
    //     // gets the first day of the current month and year
    //     let firstDayOfCurrentMonth = (new Date(year, month)).getDay();
    //
    //     let table = $('#calendar-body'); // body of the calendar
    //
    //     // clearing all previous cells
    //     table.setAttribute('innerHtml', '');
    //
    //     // console.log(this.selectYear);
    //     // console.log(this.selectMonth);
    //     selectMonth = month;
    //     selectYear = year;
    //
    //     // creating all cells
    //     let date = 1;
    //     for (let i = 0; i < 6; i++) {
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
    //             }
    //             else if (date > this.daysInMonth(month, year)) {
    //                 break;
    //             }
    //
    //             else {
    //                 let cell = curRow.addElement('td', date);
    //                 let currentCell = $('td').elems.pop();
    //                 currentCell.setAttribute('id', `#cell-${date}`);
    //                 // console.log(currentCell);
    //                 // cell.addElement('div', 'No events on this date')
    //                 //     .setAttribute('class', 'popup')
    //                 //     .setAttribute('style', 'display: none');
    //                 if (date === this.today.getDate() &&
    //                     year === this.today.getFullYear() &&
    //                     month === this.today.getMonth()) {
    //                     currentCell.setAttribute('class', 'current-date');
    //                 } // color today's date
    //                 date++;
    //             }
    //         }
    //     }
    //     return([selectYear, selectMonth]);
    // }
    //
    // daysInMonth(month, year) {
    //     return 32 - new Date(year, month, 32).getDate();
    // }
    //
    // addEvent() {
    //     $('td').elems.forEach(e => e.addEventListener('click', function () {
    //         let eventDescription = prompt('Enter event: ');
    //         let date = e.id.split('-').pop();
    //         let eventDate = `${this.currentYear}-${this.months[this.currentMonth]}-${date}`;
    //         e.innerHTML += `</br>${eventDescription}`;
    //
    //         let events = [];
    //         if (localStorage.getItem('events') == null || localStorage.getItem('events') === '[]') {
    //             let id = 1;
    //             let event = {id, eventDescription, eventDate};
    //             console.log(event);
    //             events.push(event);
    //             localStorage.setItem('events', JSON.stringify(events));
    //         } else {
    //             let id = JSON.parse(localStorage.getItem('events')).pop().id + 1;
    //             let event = {id, eventDescription, eventDate};
    //             console.log(event);
    //             JSON.parse(localStorage.getItem('events')).forEach(function (item) {
    //                 events.push(item);
    //             });
    //             events.push(event);
    //             localStorage.setItem('events', JSON.stringify(events));
    //         }
    //     }));
    // }
    //
    // showEvent() {
    //     $('td').elems.forEach(function (element) {
    //         if (localStorage.getItem('events')) {
    //             let date = element.id.split('-').pop();
    //             let currentEventDate = `${this.currentYear}-${this.months[this.currentMonth]}-${date}`;
    //             let events = [];
    //             JSON.parse(localStorage.getItem('events')).forEach(function (event) {
    //                 events.push(event);
    //             });
    //
    //             console.log(events);
    //             events.forEach(function (event) {
    //                 if (event.eventDate === currentEventDate) {
    //                     element.innerHTML += `</br>${event.eventDescription}`;
    //                 }
    //             })
    //         }
    //     })
    // }

}

customElements.define('calendar-component', CalendarComponent);
