<?php
/**
 *
Plugin Name: Running Pace Calculator
Plugin URI: http://francismaile.com/wp-plugins/runcalc
Description: Calculate pace, distance or finishing time of your next race.
Version: 1.0
Author: Francis Maile
Author URI: http://francismaile.com/wp-plugins/runcalc
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.txt

 */

defined( 'ABSPATH' ) or die( 'No script kiddies please!' );

if( is_admin() ) {
	// admin code
	
}


class WP_RunCalc_Widget extends WP_Widget {

	public function __construct() {
 
        parent::__construct(
            'run-calc',  // Base ID
            'Run Pace Calculator'   // Name
        );
 
        add_action( 'widgets_init', function() {
            register_widget( 'WP_RunCalc_Widget' );
        });
 
    }
 
    public $args = array(
        'before_title'  => '<h4 class="widgettitle">',
        'after_title'   => '</h4>',
        'before_widget' => '<div class="widget-wrap">',
        'after_widget'  => '</div></div>'
    );
 
    public function widget( $args, $instance ) {
 
		wp_enqueue_style( 'running-calculator', plugin_dir_url(  __FILE__  ) . 'public/css/runcalc-style.css', array(), null, 'screen' );
		
		wp_enqueue_script( 'WP_RunCalc_Widget', plugin_dir_url(  __FILE__  ) . 'public/js/runcalc-script.js', array(), null, true );
 
print <<<END
<form id="calcForm">
		<fieldset id="calculate">
			<legend>Calculate Pace</legend>
			<div id="distance-input">
				<label for="distance">Distance:</label>
				<button id="calc-distance">=</button>
				<input id="distance" type="text" size="7" >
				<select id="race-type">
					<option value="">Race Type</option>
					<option value="26.219M">Marathon</option>
					<option value="13.109M">Half-Marathon</option>
					<option value="5K">5K</option>
					<option value="10K">10K</option>
					<option value="10M">10M</option>
					<option value="50K">50K</option>
					<option value="50M">50M</option>
					<option value="100K">100K</option>
					<option value="100M">100M</option>
				</select>
			</div>
			<div id="pace-input">
				<label for="pace-minutes">Pace:</label>
				<button id="calc-pace">=</button>
				<input id="pace-minutes" type="text" size="2" placeholder="MM" >
				<input id="pace-seconds" type="text" size="2" placeholder="SS" >
				<input type="radio" id="mile" name="unit" value="mile" checked>
				<label class="units" for="mile">Mile</label>
				<input type="radio" id="km" name="unit" value="km">
				<label class="units" for="km">Km</label>
			</div>
			<div id="time-input">
				<label for="hours">Time:</label>
				<button id="calc-time">=</button>
				<input id="hours" type="text" size="2" placeholder="HH" >
				<input id="minutes" type="text" size="2" placeholder="MM" >
				<input id="seconds" type="text" size="2" placeholder="SS" >
			</div>
	<!-- div id="choose-method">
		<button type="button" id="pace-button" title="Click to calculate pace based on time and distance.">Pace</button>&nbsp;
		<button type="button" id="distance-button" title="Click to calculate distance based on time and pace.">Distance</button>&nbsp;
		<button type="button" id="time-button" title="Click to calculate time based on pace and distance.">Time</button>
	</div -->
		</fieldset>
	</form>

END;
 
    }
	public function form( $instance ) {

	}

	public function update( $new_instance, $old_instance ) {

	}

}

$runwidget = new WP_RunCalc_Widget();
