var app = new Vue({
    el: '#app',
    vuetify: new Vuetify(),
    data(){
        return {
            data: { },
            especialidades:[],
            getEspecialidades:[],
            selectedSpeciality: null,
            doctores:[],
            getDoctores: [],
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
            console.log(this.doctores)
            console.log(this.especialidades)
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
                const now = new Date()
                const start = new Date(year + '-' + month + '-' + day)
                const end = new Date(year + '-' + month + '-' + day)
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
            console.log(events)
      
            this.events = events
        },
        classDay(day, month, year) {
            if (this.getEvents(day, month, year).length != 0) {
                return "event";
            }
            return "";
        },
        clickDay({ day, month, year }) {
            this.selected = {
                day,
                month,
                year,
            };
            console.log(this.getEvents(day,month, year))
            this.currentEvent = this.getEvents(day, month, year);
            if (this.currentEvent.length == 0) {
                this.events.forEach((event) => (event.style = "event-slot"));
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
        }
        
    },
    created( ) {
        this.getData( );
        this.loadEvents(04,2022 )
        console.log(this.events)
    }
})