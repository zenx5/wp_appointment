<link href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900" rel="stylesheet">
<link href="https://cdn.jsdelivr.net/npm/@mdi/font@6.x/css/materialdesignicons.min.css" rel="stylesheet">
<link href="https://cdn.jsdelivr.net/npm/vuetify@2.x/dist/vuetify.min.css" rel="stylesheet">
<script>
    var datas = <?php
                $subjects = WP_Appointment::ajax_data('subject');
                $specialities = WP_Appointment::ajax_data('speciality');
                $datas = array(
                    'subjects' => $subjects,
                    'specialities' => $specialities
                );
                echo json_encode($datas);
                ?>
</script>
<style>
.day.event {
    cursor: pointer;
    background-color: #e9f6ff;
    color: #3891f8;
}
</style>

<div id="app" data-app>
    <v-row>
        <v-col>
            <v-select label="Especialidad" v-model="selectedSpeciality" item-text="name" item-value="ID" :items="especialidades | filterSpecialities">
            </v-select>
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
        <v-col>
            <div id="content-list"></div>
        </v-col>
    </v-row>
    <!-- <v-row>
        <v-col></v-col>
    </v-row> -->
</div>
<script src="https://cdn.jsdelivr.net/npm/vue@2.x/dist/vue.js"></script>
<script src="https://cdn.jsdelivr.net/npm/vuetify@2.x/dist/vuetify.js"></script>
<script src="wp-content/plugins/wp_appointment/components/app.js"></script>