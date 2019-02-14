class CalendarComponent extends HTMLElement {

    type;
    options;

    /**
     * Constructor
     * @param type
     * @param options
     */
    constructor(type, options = '') {
        super();
        this.type = type;
        this.options = options;
    }

    /**
     * Html template
     * @param calendar
     */
    calendar(calendar) {
        calendar.setAttribute('innerHtml', `
            <div class="container col-sm-11">
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
                </div>
            </div>
        `);
    }

    /**
     * Getting type
     */
    getType(){
        return this.type;
    }

    /**
     * Getting options
     */
    getOptions(){
        return this.options;
    }

    /**
     * Setting options
     * @param options
     */
    setOptions(options){
        this.options = options;
    }

    /**
     * Setting type
     * @param type
     */
    setType(type){
        this.type = type;
    }

    /**
     * Function that checks how many days are in a year
     * @param month
     * @param year
     * @returns {number}
     */
    static daysInMonth(month, year) {
        return 32 - new Date(year, month, 32).getDate();
    }

    /**
     * Function for calculating how many rows are there in a month
     * @param month
     * @param year
     * @returns {number}
     */
    static rowsInMonth(month, year){
        let firstDayOfCurrentMonth = (new Date(year, month)).getDay();
        let numberOfDaysInMonth = this.daysInMonth(month, year);
        let daysLeftInFirstWeek = (7 - firstDayOfCurrentMonth) + 1;
        let numberOfWeeksWithoutFirstOne = Math.ceil((numberOfDaysInMonth - daysLeftInFirstWeek)/7);
        let numberOfAllWeeks = numberOfWeeksWithoutFirstOne + 1;
        console.log(numberOfAllWeeks);
        return numberOfAllWeeks;
    }

    static getNumberOfDaysInLastMonthWeek(month, year){
        let firstDayOfCurrentMonth = (new Date(year, month)).getDay();
        let numberOfDaysInMonth = this.daysInMonth(month, year);
        let daysLeftInFirstWeek = (7 - firstDayOfCurrentMonth) + 1;
        let daysLeftInOtherWeeks = numberOfDaysInMonth - daysLeftInFirstWeek;
        let numberOfDaysInLastWeek = daysLeftInOtherWeeks % 7;
        console.log(numberOfDaysInLastWeek);
        return numberOfDaysInLastWeek;

    }

}

customElements.define('calendar-component', CalendarComponent);
