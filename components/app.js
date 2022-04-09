var app = new Vue({
    el: '#app',
    vuetify: new Vuetify(),
    data(){
        return {
            selects:[],
            schedule:{},
            eventSelected: false,
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
        getDoctorById( doctorId ) {
            return datas.subjects.find( doctor => doctor.ID == doctorId )
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
            datas.appointments.forEach( (data, index) => {
                data.meta.dia_de_la_semana.forEach( day => {
                    this.getDays( day ).forEach( date => {
                        let start = new Date(`${now.getMonth()+1}-${date}-${now.getFullYear()} ${data.meta.hora_inicio[0]}`)
                        let end = new Date(`${now.getMonth()+1}-${date}-${now.getFullYear()} ${data.meta.hora_final[0]}`)
                        const event = {
                            id: data.ID,
                            ID: data.ID,
                            name: 'Appointment',
                            start: start,
                            end: end,
                            style: 'event-slot',
                            timed: false,
                        }
                        events.push( event )
                    })
                    
                })
            })
            datas.singleAppointments.forEach( data => {
                console.log( 'data: ', data )
                if( !data.meta.hora_inicio || !data.meta.hora_final || !data.meta.fecha ) return;
                let start = new Date(`${data.meta.fecha[0]} ${data.meta.hora_inicio[0]}`)
                let end = new Date(`${data.meta.fecha[0]} ${data.meta.hora_final[0]}`)
                const event = {
                    id: data.ID,
                    ID: data.ID,
                    name: 'Appointment',
                    start: start,
                    end: end,
                    style: 'event-slot',
                    timed: false,
                }
                console.log(event)
                if ( start > now )
                    events.push( event );
            })
            console.log(datas.appointments)
            console.log(events)
      
            this.events = events
        },
        active(day, month, year) {
            console.log('active',day, month, year)
            console.log('active',this.schedule)
            if (
                this.schedule.day == day &&
                this.schedule.month == month &&
                this.schedule.year == year
            ) {
                return "active";
            }
            return "";
        },
        getDays( weekDay ) {
            let days = ['domingo', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'];
            // let weekDay = wee;
            let now = new Date( );
            let date = now.getDate( );
            let month = now.getMonth( )+1;
            let year = now.getFullYear( );
            let day = now.getDay( );
            let dif = weekDay - day >=0 ? weekDay-day : weekDay-day+7;
            let arr = [];
            if ( weekDay == -1 )
                return [];
            for( let i = 0; i < 5; i++ ) {
                let d = new Date(`${month}-${date+dif+7*i}-${year}`);
                if ( d.getDate( ) ) {
                    arr.push( d.getDate() );
                }
            }
            return arr;
        },
        classDay(day, month, year) {
            if (this.getEvents(day, month, year).length != 0 ) {
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
            this.selects.push(event)
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
                this.eventSelected = true;
            }
            this.schedule = {day, month, year};
        },
        getEvents(day, month, year) {
            return this.events.filter((event) => {
                if (
                    this.selectedDoctor &&
                    event.start.getDate() == day &&
                    event.start.getMonth() + 1 == month &&
                    event.start.getFullYear() == year &&
                    this.getDoctorById( this.selectedDoctor ).meta.appointment &&
                    this.getDoctorById( this.selectedDoctor ).meta.appointment.indexOf( ""+event.ID ) != -1
                ) {
                    console.log('etro')
                    return event;
                }
            });
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
    }
})