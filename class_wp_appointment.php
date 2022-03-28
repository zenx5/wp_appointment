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
    }

    public static function render_calendar()
    {
        ob_start();
?>
        <div>

        </div>

<?php
        $html = ob_get_contents();
        ob_end_clean();
        return $html;
    }
}
