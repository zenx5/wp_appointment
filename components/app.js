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
            this.data = {
                doctors: this.getDoctors( ),
                specialities: this.getSpecialities( ),
            };
            this.especialidades = this.getSpecialities( );
            this.getEspecialidades = this.data.specialities.map( element => element.name );
            this.doctores = this.getDoctors( );
            this.getDoctores = this.data.doctors.map( element => element.name )
            console.log(this.getDoctores)
            console.log(this.getEspecialidades)
        },
        getSpecialities( ) {
            return [
                {
                    id: 1,
                    name: 'neonatologo',
                    description: ''
                },
                {
                    id: 2,
                    name: 'internista',
                    description: ''
                }
            ]
        },
        getDoctors( ) {
            return [
                {
                    name: 'moises',
                    especialities: [1],
                    days: ['sunday'],
                },
                {
                    name: 'javier',
                    especialities: [1],
                    days: ['saturday'],
                },
                {
                    name: 'octavio',
                    especialities: [2],
                    days: ['monday', 'freeday'],
                }
            ]
        },
        onChangeDoctor( value ) {
            
        },
        onChangeSpeciality( value ) {

        }
    },
    filters: {
        filterDoctors( _array,a,b ) {
            console.log("filter",_array,this.selectedSpeciality) 
            return true
        },
        filterSpecialities( _array, value,b,c,d,e ) {
            console.log(_array)
            console.log(value,b,c,d)
            if ( !this.selectedDoctor || this.selectedDoctor.specialities.indexOf( value ) != -1 )
                return true;
        },
    },
    created( ) {
        this.getData( );
    }
})