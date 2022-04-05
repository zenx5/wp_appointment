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
        getSpecialities( ) {
            return datas.specialities
        },
        getDoctors( ) {
            return datas.subjects
        },
        onChangeDoctor( value ) {
            
        },
        onChangeSpeciality( value ) {

        }
    },
    filters: {
        filterDoctors( _array, selected ) {
            console.log(_array, selected)
            if ( selected == 0 )
                return _array; 
            return _array.filter( element => {
                return element
            })
        },
        filterSpecialities( _array, value,b,c,d,e ) {
            console.log(_array)
            console.log(value,b,c,d)
            if ( !this.selectedDoctor || this.selectedDoctor.specialities.indexOf( value ) != -1 )
                return true;
        },
    },
    mounted( ) {
        // setTimeout( _ => {
            this.getData( );

        // }, 1000)
    }
})