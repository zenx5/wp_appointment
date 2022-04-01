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
        add_shortcode( 'calendar', array('WP_Appointment', 'render_calendar') );
    }


    public static function insert_in_head(){
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
        <div id="app">           
             <v-calendar
                ref="calendar"
                v-model="value"
                :weekdays="weekday"
                :type="type"
                :events="events"
                :event-overlap-mode="mode"
                :event-overlap-threshold="30"
            >
            </v-calendar> 
        </div>
        <script src="https://cdn.jsdelivr.net/npm/vue@2.x/dist/vue.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/vuetify@2.x/dist/vuetify.js"></script>
  
        <script src="wp-content/plugins/wp_appointment/App.js"></script> 
<?php
        $html = ob_get_contents();
        ob_end_clean();
        return $html;
    }
}
