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

    public static function ajax_url()
    {
        wp_enqueue_script('ajax-calendar', '/wp-content/plugins/wp_appointment/app.js');
        wp_localize_script('ajax-calendar', 'ajax_object_calendar', array('ajax_url' => self::get_dominio() . '/wp-content/plugins/wp_appointment/ajax.php'));
    }

    public static function ajax_data()
    {
        $data = [];
        $appointments = new WP_Query(array(
            "post_type" => "appointment"
        ));
        foreach ($appointments->posts as $post) {
            $data[] = [
                "ID" => $post->ID,
                "name" => $post->post_title,
                "meta" => get_post_meta($post->ID)
            ];
        }
        return $data;
    }

    public static function create_menu()
    {
        add_menu_page(
            'Admin Appointements',
            'Admin Appointements',
            'manage_options',
            'wp_appointment/admin/main.php',
            null,
            'dashicons-admin-generic',
            5
        );
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
                    <v-select label="Especialidad" v-model="selectedSpeciality" :items="getEspecialidades">
                    </v-select>
                </v-col>
                <v-col>
                    <v-select label="Doctor" v-model="selectedDoctor" :items="getDoctores | filterDoctors(selectedSpeciality)">
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
        <script>
            <?php include 'app.js'; ?>
        </script>
<?php
        $html = ob_get_contents();
        ob_end_clean();
        return $html;
    }
}
