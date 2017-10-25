<?php

/**
 * @file C4C iFrame Changes: Admin settings.
 */

/**
 * Admin settings.
 * @param type $form
 * @param type $form_state
 */
function c4c_iframe_admin_settings($form, &$form_state) {
  // Set Variables
  global $user;
  
  $form['url'] = array(
    '#type' => 'textfield', 
    '#title' => t('iFrame URL'), 
    '#default_value' => variable_get('c4c_iframe_url', ''), 
    '#size' => 60, 
    '#required' => TRUE,
  );

  $form['height'] = array(
    '#type' => 'textfield', 
    '#title' => t('iFrame height'), 
    '#default_value' => variable_get('c4c_iframe_height', ''), 
    '#size' => 10, 
    '#required' => TRUE,
  );

  // Add submit
  $form['#submit'] = array('c4c_iframe_admin_settings_submit');

  // Add Validation
  $form['#validate'] = array('c4c_iframe_admin_settings_validate');

  $form['submit'] = array(
    '#type' => 'submit',
    '#value' => t('Submit'),
  );

  return $form;
}

/**
 * Validate handler.
 * @param type $form
 * @param type $form_state
 */
function c4c_iframe_admin_settings_validate($form, &$form_state) {
  if (!is_numeric($form_state['values']['height'])) {
    form_set_error('height', t('Height must be a numeric value'));
  }

  if (intval($form_state['values']['height']) <= 0) {
    form_set_error('height', t('Height must be greater than zero'));
  }
} 

/**
 * Submit handler.
 * @param type $form
 * @param type $form_state
 */
function c4c_iframe_admin_settings_submit($form, &$form_state) {
  
  // Set Values
  variable_set('c4c_iframe_url', $form_state['values']['url']);
  variable_set('c4c_iframe_height', $form_state['values']['height']);
    
  drupal_set_message(t('The values were successfully stored'), 'status');
  
}
