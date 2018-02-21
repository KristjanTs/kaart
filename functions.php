<?php

add_filter('json_api_encode', 'json_api_encode_acf');


function json_api_encode_acf($response)
{
    if (isset($response['posts'])) {
        foreach ($response['posts'] as $post) {
            json_api_add_acf($post); // Add specs to each post
        }
    }
    else if (isset($response['post'])) {
        json_api_add_acf($response['post']); // Add a specs property
    }

    return $response;
}

function json_api_add_acf(&$post)
{
    $post->acf = get_fields($post->id);
}

function my_acf_google_map_api( $api ){

	$api['key'] = 'AIzaSyAAs8Bmb6fzACSu3RDyMWV7JVxrXKp6D9o';

	return $api;

}

add_filter('acf/fields/google_map/api', 'my_acf_google_map_api');

add_action( 'cmb2_admin_init', 'cmb2_sample_metaboxes' );
/**
 * Define the metabox and field configurations.
 */
function cmb2_sample_metaboxes() {

	// Start with an underscore to hide fields from custom fields list
	$prefix = '_punktiga_seotud_pildid';

	/**
	 * Initiate the metabox
	 */
	$cmb = new_cmb2_box( array(
		'id'            => 'punkti_pildid',
		'title'         => __( 'Punktiga seotud pildid', 'cmb2' ),
		'object_types'  => array( 'punkt', ), // Post type
		'context'       => 'normal',
		'priority'      => 'high',
		'show_names'    => true, // Show field names on the left
		// 'cmb_styles' => false, // false to disable the CMB stylesheet
		// 'closed'     => true, // Keep the metabox closed by default
	) );

	// Regular text field
	$cmb->add_field( array(
		'name'       => __( 'Pildid', 'cmb2' ),
		'desc'       => __( 'field description (optional)', 'cmb2' ),
		'id'         => $prefix . 'file_list',
		'type'       => 'file_list',
    'preview_size' => array( 100, 100 ),
		'show_on_cb' => 'cmb2_hide_if_no_cats', // function should return a bool value
		// 'sanitization_cb' => 'my_custom_sanitization', // custom sanitization callback parameter
		// 'escape_cb'       => 'my_custom_escaping',  // custom escaping callback parameter
		// 'on_front'        => false, // Optionally designate a field to wp-admin only
		// 'repeatable'      => true,
	) );

	// Add other metaboxes as needed

}
