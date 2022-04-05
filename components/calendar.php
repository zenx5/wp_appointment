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
<code>
    <?= json_encode(WP_Appointment::ajax_data('subject')) ?>
</code>
<div id="app" data-app>
    <v-row>
        <v-col>
            <v-select label="Especialidad" v-model="selectedSpeciality" :items="getEspecialidades">
            </v-select>
        </v-col>
        <v-col>
            <v-select label="Doctor" v-model="selectedDoctor" :items="getDoctores | filterDoctors">
            </v-select>
        </v-col>
    </v-row>
    <v-row>
        <v-col>
            <v-calendar ref="calendar" v-model="value" :weekdays="weekday" :type="type" :events="events" :event-overlap-mode="mode" :event-overlap-threshold="30">
            </v-calendar>
        </v-col>
    </v-row>
</div>
<script src="https://cdn.jsdelivr.net/npm/vue@2.x/dist/vue.js"></script>
<script src="https://cdn.jsdelivr.net/npm/vuetify@2.x/dist/vuetify.js"></script>
<script src="wp-content/plugins/wp_appointment/components/app.js"></script>