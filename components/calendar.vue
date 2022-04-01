<template>
  <v-row>
    <v-col cols="9">
      <v-sheet title height="54" class="d-flex mb-7">
        <v-btn icon class="ma-2" @click="$refs.calendar.prev()">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
        <v-btn icon class="ma-2" @click="$refs.calendar.next()">
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
        <span class="ma-auto"> March 2020 </span>
        <v-spacer></v-spacer>
        <v-col class="ma-auto" cols="2">
          <v-select
            v-model="type"
            :items="types"
            dense
            outlined
            hide-details
            label="type"
          ></v-select>
        </v-col>
      </v-sheet>

      <v-sheet height="700">
        <v-calendar
          ref="calendar"
          v-model="value"
          :weekdays="weekday"
          :type="type"
          :events="events"
          :event-more="false"
          :event-overlap-mode="mode"
          :event-overlap-threshold="30"
          @click:event="clickEvent"
          @click:more="viewDay"
          @click:date="viewDay"
        >
        </v-calendar>
      </v-sheet>
    </v-col>
    <v-col cols="3">
      <v-sheet title height="54" class="d-flex mb-7"></v-sheet>
      <v-sheet v-show="selected != -1">
        <v-row class="d-flex">
          <v-col class="status" style="color: #c7386d">
            <div>Seleted Appointment</div>
            <div>{{ schedule.start | date }}</div>

            <v-btn class="btn-z mt-7">GET OFS ACTIVITY ID</v-btn>
          </v-col>
        </v-row>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    month: {
      type: String,
      require: true,
    },
    year: {
      type: String,
      require: true,
    },
    schedule: {
      type: Object,
      default: () => {
        return {}
      },
    },
    allEvents: {
      type: Array,
      require: false,
    },
  },
  filters: {
    date(dateStr) {
      if (dateStr) {
        let date = new Date(dateStr)

        let mes = [
          'Enero',
          'Febreo',
          'Marzo',
          'Abril',
          'Mayo',
          'Junio',
          'Julio',
          'Agosto',
          'Septiembre',
          'Octubre',
          'Noviembre',
          'Diciembre',
        ][date.getMonth()]
        return (
          mes +
          ' ' +
          date.getDate() +
          ' at ' +
          (date.getHours() < 10
            ? '0' + date.getHours()
            : date.getHours().toString()) +
          ':' +
          (date.getMinutes() < 10
            ? '0' + date.getMinutes()
            : date.getMinutes().toString())
        )
      }
    },
  },
  data() {
    return {
      selected: -1,
      type: 'month',
      types: ['month', 'week', 'day', '4day'],
      mode: 'stack',
      weekday: [0, 1, 2, 3, 4, 5, 6],
      value: '',
      events: [],
      colors: [
        'blue',
        'indigo',
        'deep-purple',
        'cyan',
        'green',
        'orange',
        'grey darken-1',
      ],
      names: [
        'Meeting',
        'Holiday',
        'PTO',
        'Travel',
        'Event',
        'Birthday',
        'Conference',
        'Party',
      ],
    }
  },
  created() {
    this.loadEvents(this.month, this.year)
  },
  methods: {
    viewDay({ date }) {
      //this.focus = date
      console.log('date', date)
      this.type = 'day'
    },
    viewMonth({ date }) {
      //this.focus = date
      console.log('date', date)
      this.type = 'month'
    },
    delEvent() {
      this.events[this.selected].color = 'green'
      this.selected = false
      this.schedule = {}
    },
    clickEvent({ event }) {
      if (this.selected != -1) {
        this.events[this.selected].color = 'green'
      }
      let index = this.events.indexOf(event)
      this.events[index].color = 'grey darken-1'
      this.schedule = this.events[index]
      this.selected = index
      console.log(this.schedule)
    },
    loadEvents(month, year) {
      let events = []
      for (let i = 1; i <= 31; i++) {
        const day = i < 10 ? '0' + i : i
        for (let j = 0; j < 5; j++) {
          const timestart = ['T07:00:00', 'T10:00:00', 'T14:00:00']
          const timesend = ['T10:00:00', 'T14:00:00', 'T17:00:00']
          const now = new Date()
          const start = new Date(year + '-' + month + '-' + day + timestart[j])
          const end = new Date(year + '-' + month + '-' + day + timesend[j])
          const event = {
            name: 'Appointment',
            start: start,
            end: end,
            color: 'green', //'grey darken-1',
            timed: true,
          }
          if (start > now) {
            events.push(event)
          }
        }
      }

      this.events = events
    },
  },
}
</script>

<style lang="css">
.v-calendar-weekly__head-weekday {
  text-transform: none;
  font-size: 35px !important;
  padding-top: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #70707070;
}
.v-calendar-weekly__day-label > * {
  text-transform: none;
  font-size: 30px !important;
}

.v-outside .v-btn__content {
  color: #70707070 !important;
}
.v-calendar-weekly__head-weekday:nth-child(1) {
  color: red !important;
}
.v-calendar-weekly__day:nth-child(1) .v-btn__content {
  color: red;
}
/* .theme--light.v-calendar-weekly  */

.opaco {
  color: rgba(0, 0, 0, 30%);
}
@keyframes efect-bold {
  from {
    font-weight: 100;
  }
  to {
    font-weight: bold;
  }
}

.bounce {
  animation-name: efect-bold;
  animation-duration: 1s;
  animation-iteration-count: infinite;
}
.status {
  text-align: left;
  font: normal normal normal 18px Lato;
  letter-spacing: 0px;
  color: #c7386d;
  opacity: 1;
}
.btn-z {
  width: 208px;
  height: 52px;
  background: transparent linear-gradient(105deg, #e24347 0%, #c53770 100%) 0%
    0% no-repeat padding-box;
  box-shadow: 0px 6px 12px #cb3a674d;
  border-radius: 6px;
  text-align: center;
  font: normal normal normal 16px/19px Lato;
  letter-spacing: -0.4px;
  color: #ffffff !important;
  text-transform: uppercase;
}
</style>
