<?php
/**
 * @file Override Path Title: Admin settings.
 */

/**
 * Admin settings.
 */
function override_path_title_settings($form, &$form_state) {
  $form['add'] = array(
    '#type' => 'fieldset',
    '#title' => t('Add new overriden title'),
    '#tree' => FALSE,
  );
  $form['add']['path'] = array(
    '#type' => 'textfield',
    '#title' => t('Path'),
    '#required' => TRUE,
  );
  $form['add']['title'] = array(
    '#type' => 'textfield',
    '#title' => t('Title'),
    '#required' => TRUE,
  );
  $language_options = array('any' => t('- Any -'));
  $languages = reset(language_list('enabled'));
  foreach($languages as $key => $values) {
    $language_options[$key] = t($values->name);
  }
  $form['add']['language'] = array(
    '#type' => 'select',
    '#title' => t('Title language'),
    '#options' => $language_options,
    '#required' => TRUE,
  );
  $form['add']['save'] = array(
    '#type' => 'submit',
    '#value' => t('Save'),
    '#submit' => array('override_path_title_settings_save_new'),
  );
 
  // Already stored overrides:
  $query = db_select('override_path_title_title', 'op');
  $query->fields('op', array('opl', 'path', 'title', 'language'));
  $query = $query->extend('PagerDefault')->limit(50);
  $result = $query->execute();
  
  $header = array('ID', t('Path'), t('Title'), t('Language'), t('Options'));
  $rows = array();
  
  while($data = $result->fetchObject()){
    $link_edit = l(t('Edit'), 'admin/config/user-interface/override-path-title/' . $data->opl . '/edit');
    $link_delete = l(t('Delete'), 'admin/config/user-interface/override-path-title/' . $data->opl . '/delete');
    
    $rows[] = array(
      array('data' => $data->opl, 'data-label' => 'ID'),
      array('data' => $data->path, 'data-label' => t('Path')),
      array('data' => $data->title, 'data-label' => t('Title')),
      array('data' => $data->language, 'data-label' => t('Language')),
      array('data' => $link_edit. ' | ' . $link_delete, 'data-label' => t('Options')),
    );
  }
  $form['current'] = array(
    '#type' => 'fieldset',
    '#title' => t('Current overrides'),
    '#tree' => FALSE,
    '#collapsible' => TRUE,
    '#collapsed' => FALSE,
  );
  $form['current']['table'] = array(
    '#type' => 'markup',
    '#markup' => theme_table(array(
      'header' => $header,
      'rows' => $rows,
      'attributes' => array(),
      'sticky' => TRUE,
      'caption' => '',
      'colgroups' => array(),
      'empty' => t('No results found')
    )).theme('pager'),
  );
  
  return $form;
}

/**
 * Save function: Insert.
 */
function override_path_title_settings_save_new($form, &$form_state) {
  $data = array(
    'path' => $form_state['values']['path'],
    'title' => $form_state['values']['title'],
    'language' => $form_state['values']['language'],
    'option' => 'save',
  );
  $id = override_path_title_save($data);
  if (is_numeric($id)) {
    drupal_set_message(t('Overriden title saved succefully.'));
  }
}

/**
 * Edit form.
 */
function override_path_title_edit($form, &$form_state, $override_path_title) {
  $form['opl'] = array(
    '#type' => 'value',
    '#value' => $override_path_title['opl'],
  );
  $form['path'] = array(
    '#type' => 'textfield',
    '#title' => t('Path'),
    '#required' => TRUE,
    '#default_value' => $override_path_title['path'],
  );
  $form['title'] = array(
    '#type' => 'textfield',
    '#title' => t('Title'),
    '#required' => TRUE,
    '#default_value' => $override_path_title['title'],
  );
  $language_options = array('any' => t('- Any -'));
  $languages = reset(language_list('enabled'));
  foreach($languages as $key => $values) {
    $language_options[$key] = t($values->name);
  }
  $form['language'] = array(
    '#type' => 'select',
    '#title' => t('Title language'),
    '#options' => $language_options,
    '#required' => TRUE,
    '#default_value' => $override_path_title['language'],
  );
  $form['save'] = array(
    '#type' => 'submit',
    '#value' => t('Save'),
    '#submit' => array('override_path_title_settings_save_update'),
  );
  return $form;
}

/**
 * Save function: Edit.
 */
function override_path_title_settings_save_update($form, &$form_state) {
  $data = array(
    'path' => $form_state['values']['path'],
    'title' => $form_state['values']['title'],
    'language' => $form_state['values']['language'],
    'option' => 'update',
    'id' => $form_state['values']['opl'],
  );
  $id = override_path_title_save($data);
  if (is_numeric($id)) {
    drupal_set_message(t('Overriden title updated succefully.'));
  }
  $form_state['redirect'] = 'admin/config/user-interface/override-path-title';
}

/**
 * Delete form.
 */
function override_path_title_delete($form, &$form_state, $override_path_title) {
  $form['opl'] = array(
    '#type' => 'value',
    '#value' => $override_path_title['opl'],
  );
  return confirm_form(
    $form,
    t('Are you sure you want to delete this item?'),
    'admin/config/user-interface/override-path-title',
    t('This action cannot be undone.'),
    t('Delete'),
    t('Cancel')
  );
}

/**
 * Save function: Delete.
 */
function override_path_title_delete_submit($form, &$form_state) {
  $data = array(
    'option' => 'delete',
    'id' => $form_state['values']['opl'],
  );
  $id = override_path_title_save($data);
  if (is_numeric($id)) {
    drupal_set_message(t('Overriden title deleted succefully.'));
  }
  $form_state['redirect'] = 'admin/config/user-interface/override-path-title';
}