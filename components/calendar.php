<link href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900" rel="stylesheet">
<link href="https://cdn.jsdelivr.net/npm/@mdi/font@6.x/css/materialdesignicons.min.css" rel="stylesheet">
<link href="https://cdn.jsdelivr.net/npm/vuetify@2.x/dist/vuetify.min.css" rel="stylesheet">
<script>
    var datas = <?php
                $subjects = WP_Appointment::ajax_data('subject');
                $specialities = WP_Appointment::ajax_data('speciality');
                $appointments = WP_Appointment::ajax_data('appointments');
                $datas = array(
                    'subjects' => $subjects,
                    'specialities' => $specialities,
                    'appointments' => $appointments
                );
                echo json_encode($datas);
                ?>
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

<div id="app" data-app>
    <v-row>
        <v-col>
            <v-select label="Especialidad" v-model="selectedSpeciality" item-text="name" item-value="ID" :items="especialidades | filterSpecialities">
            </v-select>
        </v-col>
        <v-col v-show="hasChildren()">
            <v-select label="Sub Especialidad" item-text="name" item-value="ID" :items="especialidades | filterSpecialities(true)"></v-select>
        </v-col>
        <v-col>
            <v-select label="Doctor" v-model="selectedDoctor" item-text="name" item-value="ID" :items="doctores | filterDoctors(selectedSpeciality)">

            </v-select>
        </v-col>
    </v-row>
    <v-row>
        <v-col>
            <v-calendar 
                ref="calendar" 
                v-model="value" 
                :weekdays="weekday" 
                :type="type" 
                @click:day="clickDay"
               
            >
                <template v-slot:day-label="{ day, month, year }">
                    <div
                        :class="
                            'day ' +
                            classDay(day, month, year)
                        "
                    >
                        <label class="label">{{ day }}</label>
                    </div>
                </template>
            </v-calendar>
        </v-col>
    </v-row>
    <v-row>
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
    <!-- <v-row>
        <v-col></v-col>
    </v-row> -->
</div>
<script src="https://cdn.jsdelivr.net/npm/vue@2.x/dist/vue.js"></script>
<script src="https://cdn.jsdelivr.net/npm/vuetify@2.x/dist/vuetify.js"></script>
<script src="wp-content/plugins/wp_appointment/components/app.js"></script>