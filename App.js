var app = new Vue({
    el: '#app',
    vuetify: new Vuetify(),
    data(){
        return {
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
    }
})