var app = new Vue({
    el: '#app',
    vuetify: new Vuetify(),
    data(){
        return {
            currentEvent: [],
            data: { },
            especialidades:[],
            getEspecialidades:[],
            selectedSpeciality: null,
            doctores:[],
            getDoctores: [],
            citas: [],
            selectedDoctor: null,
            name: "moises",
            type: 'month',
            types: ['month', 'week', 'day', '4day'],
            mode: 'stack',
            modes: ['stack', 'column'],
            weekday: [0, 1, 2, 3, 4, 5, 6],
            weekdays: [
            { text: 'Sun - Sat', value: [0, 1, 2, 3, 4, 5, 6] },
            { text: 'Mon - Sun', value: [1, 2, 3, 4, 5, 6, 0] },
            { text: 'Mon - Fri', value: [1, 2, 3, 4, 5] },
            { text: 'Mon, Wed, Fri', value: [1, 3, 5] },
            ],
            value: '',
            events: [],
            colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
            names: ['Meeting', 'Holiday', 'PTO', 'Travel', 'Event', 'Birthday', 'Conference', 'Party'],
            tabs: [
                'web', 'shopping', 'videos', 'images', 'news',
            ],
            tab:1
        }
    },
    methods:{
        async getData( ) {

            console.log(datas)
            this.especialidades = datas.specialities;
            this.doctores = datas.subjects;
            this.citas = datas.appointments;
            console.log(this.doctores)
            console.log(this.especialidades)
            console.log(this.citas)
        },
        getSpecialityId( specialityName ) {
            if ( specialityName == 'todas' )
                return 0;
            let data = datas.specialities.filter( data => {
                return data.meta.nombre == specialityName
            })[0]
            return data.ID
        },
        hasChildren( ) {
            if(!this.selectedSpeciality) return;
            return this.especialidades.filter( element => {
                if( element.ID == this.selectedSpeciality ){
                    return element.meta.sub
                }
            }).length > 0
        },
        loadEvents(month, year) {
            let k = 0
            let events = []
            let now = new Date( );
            for (let i = 1; i <= 31; i++) {
              const day = i < 10 ? '0' + i : i
              for (let j = 0; j < 7; j++) {
                const timestart = [
                  'T07:00:00',
                  'T09:00:00',
                  'T11:00:00',
                  'T14:00:00',
                  'T16:00:00',
                ]
                const timesend = [
                  'T09:00:00',
                  'T11:00:00',
                  'T13:00:00',
                  'T16:00:00',
                  'T18:00:00',
                ]
                const start = new Date(year + '-' + month + '-' + day + ' 10:20')
                const end = new Date(year + '-' + month + '-' + day + ' 20:40')
                const event = {
                  id: k,
                  name: 'Appointment',
                  start: start,
                  end: end,
                  style: 'event-slot',
                  timed: false,
                }
                if (start > now) {
                  events.push(event)
                }
                k++
              }
            }
            datas.appointments.forEach( (data, index) => {
                
            })
            console.log(events)
      
            this.events = events
        },
        active(day, month, year) {
            if (
                this.selected.day == day &&
                this.selected.month == month &&
                this.selected.year == year
            ) {
                return "active";
            }
            return "";
        },
        getDays( weekName ) {
            let days = ['domingo', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'];
            let weekDay = days.indexOf( weekName );
            let now = new Date( );
            let date = now.getDate( );
            let month = now.getMonth( )+1;
            let year = now.getFullYear( );
            // // date = date >= 10 ? ''+date : '0'+date;
            // // month = month >= 10 ? ''+month : '0'+month;
            // let d = new Date(`${month}-01-${year}`);
            let day = now.getDay( );
            let dif = weekDay - day;
            let d = new Date(`${month}-${date+dif}-${year}`);
            let arr = [d.getDate()];
            let flag = true
            // for( let i =  )
            return arr;
        },
        classDay(day, month, year) {
            if (this.getEvents(day, month, year).length != 0) {
                return "event";
            }
            return "";
        },
        clickEvent(index) {
            this.events.forEach((event) => {
                event.style = "event-slot deactive";
            });
            let event = this.events.find((event) => event.id == index);
            event.style = "event-slot active";
            console.log(event);
            this.schedule = event;
            this.eventSelected = true;
        },
        clickDay({ day, month, year }) {
            this.selected = {
                day,
                month,
                year,
            };
            console.log(this.getEvents(day,month, year))
            window.aa=this.getEvents(day,month, year)
            this.currentEvent = this.getEvents(day, month, year);
            let list = document.querySelector('#content-list');
            // list.innerHTML = null
            console.log(this.currentEvent)
            if (this.currentEvent.length != 0) {
                this.currentEvent.forEach( event => {
                    let div = document.createElement('div');
                    let starMinute = event.start.getMinutes( ) >= 10 ? event.start.getMinutes( ) : '0'+event.start.getMinutes( )
                    let endMinute = event.end.getMinutes( ) >= 10 ? event.end.getMinutes( ) : '0'+event.end.getMinutes( )
                    // div.classList.add('appointment-item');
                    // div.onclick = event => {
                    //     console.log(22)
                    // };
                    // div.innerText = `de ${event.start.getHours( )}:${starMinute} a ${event.end.getHours( )}:${endMinute}`
                    console.log(div)
                    console.log(list)
                    // list.appendChild( div )
                    // (event.style = "event-slot")
                });
                this.schedule = {};
                this.eventSelected = false;
            }
        },
        getEvents(day, month, year) {
            return this.events.filter((event) => {
                if (
                    event.start.getDate() == day &&
                    event.start.getMonth() + 1 == month &&
                    event.start.getFullYear() == year
                ) {
                    return event;
                }
            });
        },
        onChangeDoctor( value ) {
            
        },
        onChangeSpeciality( value ) {

        }
    },
    filters: {
        filterDoctors( _array, selected ) {
            if ( !selected  ) return _array; 
            return _array.filter( element => {
                return element.meta.specialities.indexOf(''+selected)!=-1
            })
        },
        filterSpecialities(_array, A = false){
            let parents = _array.map( element => {
                console.log(element)
                if( element.meta.sub ){
                    return parseInt( element.meta.sub)
                }
                return -1
            })
            return _array.filter( element => {
                let B = parents.indexOf(element.ID) == -1

                if( !A&&B || A&&!B   ){
                    return element
                }                
            })
        },
        hour(currentDate) {
            let meridian = currentDate.getHours() > 12 ? "PM" : "AM";
            let hour =
              currentDate.getHours() > 12
                ? currentDate.getHours() - 12
                : currentDate.getHours();
            hour = hour < 10 ? "0" + hour : hour;
            let minutes =
              currentDate.getMinutes() < 10
                ? "0" + currentDate.getMinutes()
                : currentDate.getMinutes();
      
            return hour + ":" + minutes + " " + meridian;
        },
        
    },
    created( ) {
        this.getData( );
        this.loadEvents(04,2022 )
        console.log(this.events)
    }
})