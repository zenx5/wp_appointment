<?php

class WP_Appointment
{
    public static function active()
    {
    }

    public static function deactive()
    {
    }

    public static function init()
    {
        add_shortcode('calendar', array('WP_Appointment', 'render_calendar'));
    }

    public static function get_dominio()
    {
        if (!isset($_SERVER['HTTPS']) || $_SERVER['HTTPS'] != 'on') {
            return "http://" . $_SERVER['SERVER_NAME'];
        } else {
            return "https://" . $_SERVER['SERVER_NAME'];
        }
    }

    public static function ajax_data()
    {
        return new WP_Query(array(
            "post_type" => "appointment"
        ));
    }

    public static function insert_in_head()
    {
        ob_start();
?>
        <link href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900" rel="stylesheet">
        <link href="https://cdn.jsdelivr.net/npm/@mdi/font@6.x/css/materialdesignicons.min.css" rel="stylesheet">
        <link href="https://cdn.jsdelivr.net/npm/vuetify@2.x/dist/vuetify.min.css" rel="stylesheet">

    <?php
        $html = ob_get_contents();
        ob_end_clean();
        return $html;
    }

    public static function render_calendar()
    {
        ob_start();
    ?>
        <link href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900" rel="stylesheet">
        <link href="https://cdn.jsdelivr.net/npm/@mdi/font@6.x/css/materialdesignicons.min.css" rel="stylesheet">
        <link href="https://cdn.jsdelivr.net/npm/vuetify@2.x/dist/vuetify.min.css" rel="stylesheet">
        <code>
            <?= json_encode(self::ajax_data()) ?>
        </code>
        <div id="app" data-app>
            <v-row>
                <v-col>
                    <v-select label="Especialidad" :items="especialidades"></v-select>
                </v-col>
                <v-col>
                    <v-select label="Doctor" :items="doctores"></v-select>
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
        <script>
            <?php include 'app.js'; ?>
        </script>
<?php
        $html = ob_get_contents();
        ob_end_clean();
        return $html;
    }
}
