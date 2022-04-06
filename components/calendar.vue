<template>
  <span>
    <v-row>
      <v-col cols="6">
        <v-sheet title height="54" class="d-flex mb-7">
          <span class="ma-auto"> {{ monthAndYear() }} </span>
          <v-btn icon class="ma-2" @click="$refs.calendar.prev()">
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn icon class="ma-2" @click="$refs.calendar.next()">
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-col class="ma-auto" cols="4">
            <span
              v-show="
                this.getEvents(selected.day, selected.month, selected.year)
                  .length != 0
              "
              >{{ currentDateStr() }}</span
            >
          </v-col>
        </v-sheet>

        <v-sheet height="350">
          <v-row>
            <v-col cols="8">
              <v-calendar
                ref="calendar"
                v-model="value"
                :weekdays="weekday"
                type="month"
                @click:day="clickDay"
              >
                <template v-slot:day-label="{ day, month, year }">
                  <div
                    :class="
                      'day ' +
                      classDay(day, month, year) +
                      ' ' +
                      active(day, month, year)
                    "
                  >
                    <label class="label">{{ day }}</label>
                  </div>
                </template>
              </v-calendar>
            </v-col>
            <v-col cols="4">
              <div
                v-for="(item, ind) in currentEvent"
                :key="'es' + ind"
                :class="item.style"
                @click="clickEvent(item.id)"
              >
                {{ item.start | hour }}
              </div>
            </v-col>
          </v-row>
        </v-sheet>
      </v-col>

      <v-col cols="3" class="bl-2" v-show="eventSelected">
        <v-sheet title height="54" class="d-flex mb-7"></v-sheet>
        <v-sheet>
          <v-row class="d-flex">
            <v-col class="status">
              <div>Seleted Appointment</div>
              <div>{{ schedule.start | date }}</div>

              <v-btn
                class="btn-z mt-7"
                outlined
                color="#3891f8"
                @click="getActivityID"
                >Get of Activity ID</v-btn
              >
              <div class="activityID mt-5" v-show="result">
                activity ID: 208930-k
              </div>
            </v-col>
          </v-row>
        </v-sheet>
      </v-col>
    </v-row>
  </span>
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
  },
  filters: {
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
    date(dateStr) {
      if (dateStr) {
        let date = new Date(dateStr);

        let mes = [
          "January",
          "February",
          "March",
          "April",
          "may",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ][date.getMonth()];
        return (
          mes +
          " " +
          date.getDate() +
          " at " +
          (date.getHours() < 10
            ? "0" + date.getHours()
            : date.getHours() > 12
            ? date.getHours() - 12
            : date.getHours()) +
          ":" +
          (date.getMinutes() < 10
            ? "0" + date.getMinutes()
            : date.getMinutes().toString()) +
          (date.getHours() > 12 ? " PM" : " AM")
        );
      }
    },
  },
  data() {
    return {
      result: false,
      schedule: {},
      currentEvent: null,
      eventSelected: false,
      selected: {
        day: null,
        month: null,
        year: null,
      },
      type: "month",
      types: ["month", "week", "day", "4day"],
      mode: "stack",
      weekday: [0, 1, 2, 3, 4, 5, 6],
      tags_weekday: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      tags_month: [
        "January",
        "February",
        "March",
        "April",
        "may",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      value: "",
      events: [],
      colors: [
        "blue",
        "indigo",
        "deep-purple",
        "cyan",
        "green",
        "orange",
        "grey darken-1",
      ],
      names: [
        "Meeting",
        "Holiday",
        "PTO",
        "Travel",
        "Event",
        "Birthday",
        "Conference",
        "Party",
      ],
      date: new Date(),
    };
  },
  created() {
    this.loadEvents(this.month, this.year);
  },
  methods: {
    getActivityID() {
      setTimeout(() => {
        this.result = true;
      }, 1000);
    },
    monthAndYear() {
      let month, year;
      try {
        year = this.$refs.calendar.lastStart.year;
        month = this.$refs.calendar.lastStart.month - 1;
      } catch (er) {
        year = parseInt(this.year);
        month = parseInt(this.month) - 1;
      } finally {
        console.log("finally");
      }
      return year + ", " + this.tags_month[month];
    },
    clickDay({ day, month, year }) {
      this.selected = {
        day,
        month,
        year,
      };
      this.currentEvent = this.getEvents(day, month, year);
      if (this.currentEvent.length == 0) {
        this.events.forEach((event) => (event.style = "event-slot"));
        this.schedule = {};
        this.eventSelected = false;
      }
    },
    currentDateStr() {
      if (this.selected.month) {
        let aux = new Date(
          this.selected.month +
            "/" +
            this.selected.day +
            "/" +
            this.selected.year
        );

        return (
          this.tags_weekday[aux.getDay()] +
          ", " +
          this.tags_month[aux.getMonth()] +
          " " +
          aux.getFullYear()
        );
      } else {
        return "";
      }
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
    loadEvents(month, year) {
      let k = 0;
      let events = [];
      for (let i = 1; i <= 31; i++) {
        const day = i < 10 ? "0" + i : i;
        for (let j = 0; j < 7; j++) {
          const timestart = [
            "T07:00:00",
            "T09:00:00",
            "T11:00:00",
            "T14:00:00",
            "T16:00:00",
          ];
          const timesend = [
            "T09:00:00",
            "T11:00:00",
            "T13:00:00",
            "T16:00:00",
            "T18:00:00",
          ];
          const now = new Date();
          const start = new Date(year + "-" + month + "-" + day + timestart[j]);
          const end = new Date(year + "-" + month + "-" + day + timesend[j]);
          const event = {
            id: k,
            name: "Appointment",
            start: start,
            end: end,
            style: "event-slot",
            timed: false,
          };
          if (start > now) {
            events.push(event);
          }
          k++;
        }
      }

      this.events = events;
    },
    classDay(day, month, year) {
      if (this.getEvents(day, month, year).length != 0) {
        return "event";
      }
      return "";
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
  },
};
</script>

<style lang="css">
.bl-2 {
  border-left: 2px solid rgba(0, 0, 0, 0.25);
}

.status {
  color: #313949;
}

.status .activityID {
  color: #5b8a5a;
}

.thetitle {
  font-size: 1rem;
  font-weight: bold;
  color: #3891f8;
}
.event-slot {
  cursor: pointer;
  padding: 5px;
  color: #3891f8;
  border: 1px solid #3891f8;
  margin: 5px;
  text-align: center;
  border-radius: 5px;
}

.event-slot.active {
  background-color: #3891f8;
  color: white;
  font-weight: bold;
}

.event-slot.deactive {
  color: lightgray;
  border: 1px solid lightgray;
}

.v-calendar-weekly__day.v-outside {
  opacity: 0;
}
.day {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  font-size: 15px;
  border-radius: 50%;
  padding: 5px;
  margin-left: auto;
  margin-right: auto;
}
.day.event {
  cursor: pointer;
  background-color: #e9f6ff;
  color: #3891f8;
}
.day.event.active {
  cursor: pointer;
  background-color: #3891f8;
  color: white;
  font-weight: bold;
}

.v-calendar-weekly__day {
  border: none !important;
}

.theme--light.v-calendar-weekly {
  border: none;
}

.v-calendar-weekly__head .v-calendar-weekly__head-weekday {
  padding: 5px;
  font-weight: bold;
  border: none !important;
  color: black !important;
  background-color: white !important;
  font-size: 10px;
}
</style>
