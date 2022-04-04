<?php

/**
 * @package WP_Appointment_Kavav
 * @version 1.7.2
 */
/*
Plugin Name: WP Appointment by Kavav
Plugin URI: https://kavavdigital.com.ve
Description: Appointment Calendar
Author: Octavio Martinez
Version: 1.0.0
Author URI: https://wa.me/19104468990
*/

require 'class_wp_appointment.php';

register_activation_hook(__FILE__, array('WP_Appointment', 'active'));
register_deactivation_hook(__FILE__, array('WP_Appointment', 'deactive'));
// register_uninstall_hook(__FILE__, array('WP_Appointment', 'uninstall') );

add_action('init', array('WP_Appointment', 'init'));
add_action('admin_menu', array('WP_Appointment', 'create_menu'));
add_action('wp_enqueue_scripts', array('WP_Appointment', 'ajax_url'));
add_action('wp_head', array('WP_Appointment', 'insert_in_head'));
