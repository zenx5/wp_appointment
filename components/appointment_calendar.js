class CountDown extends HTMLElement {
    constructor() {
        // Always call super first in constructor
        super();

        this.elements = {
            
        };
        // Create a shadow root
        const shadow = this.attachShadow({mode: 'open'});
        // Create spans
        const box = document.createElement('span');
        box.setAttribute('class', 'cd-wrapper');
        this.box = box;

        const cday = document.createElement('span')
        cday.setAttribute('class', 'cd-c-box');
            const day = document.createElement('span');
            day.setAttribute('class', 'cd-box');
            cday.append(day);
            const lday = document.createElement('label');
            lday.setAttribute('class', 'cd-label');
            lday.textContent = "Dias";
            cday.append(lday);
        
        this.day = 0;
        day.textContent = this.day;
        this.elements.day = day;

        const chour = document.createElement('span');
        chour.setAttribute('class', 'cd-c-box');
            const hour = document.createElement('span');
            hour.setAttribute('class', 'cd-box');
            chour.append(hour);
            const lhour = document.createElement('label');
            lhour.setAttribute('class', 'cd-label');
            lhour.textContent = "Horas"
            chour.append(lhour);
        this.hour = 0;
        hour.textContent = this.hour;
        this.elements.hour = hour;

        const cminute = document.createElement('span');
        cminute.setAttribute('class', 'cd-c-box');
            const minute = document.createElement('span');
            minute.setAttribute('class', 'cd-box');
            cminute.append(minute);
            const lminute = document.createElement('label');
            lminute.setAttribute('class', 'cd-label');
            lminute.textContent = "Minutos"
            cminute.append(lminute);
        this.minute = 0;
        minute.textContent = this.minute;
        this.elements.minute = minute;

        const csecond = document.createElement('span');
        csecond.setAttribute('class', 'cd-c-box');
            const second = document.createElement('span');
            second.setAttribute('class', 'cd-box');
            csecond.append(second);
            const lsecond = document.createElement('label');
            lsecond.setAttribute('class', 'cd-label');
            lsecond.textContent = "Segundos"
            csecond.append(lsecond);
        this.second = 0;
        second.textContent = this.second;
        this.elements.second = second;
        
        //Estilos del componente
        const style = document.createElement('style');
        style.textContent = ``;

        this.target = false;
        this.loaded = false;

        // Attach the created elements to the shadow dom
        shadow.appendChild(style);
        
        shadow.appendChild(box);
        // box.appendChild(cday);
        // box.appendChild(chour);
        // box.appendChild(cminute);
        // box.appendChild(csecond);
        
        
    }

    load() {
        
    }

    render() {
        
    }

    tick() {
        
    }
}

// Define the new element
customElements.define('count-down', CountDown);