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
        add_shortcode('wpa_calendar', array('WP_Appointment', 'render_calendar'));
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

    public static function ajax_data($type)
    {
        $data = [];
        $appointments = new WP_Query(array(
            "post_type" => $type
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
        <div>
            <?php include 'components/calendar.php'; ?>

        </div>
<?php


        $html = ob_get_contents();
        ob_end_clean();
        return $html;
    }
}
