class DayCalendar extends HTMLElement {
    constructor(){
        super();

        // Create a shadow root
        const shadow = this.attachShadow({mode: 'open'});

        // Create spans
        const box = document.createElement('span');
        box.setAttribute('class', 'day-wrapper');
        const circle = document.createElement('span');
        circle.setAttribute('class', 'day-wrapper');
        

        
        

    }
}