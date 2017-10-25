<?php
/**
 * @file
 * Template for a 3 column panel layout.
 *
 * This template provides a very simple "one column" panel display layout.
 *
 * Variables:
 * - $id: An optional CSS id to use for the layout.
 * - $content: An array of content, each item in the array is keyed to one
 *   panel of the layout. This layout supports the following sections:
 *   $content['middle']: The only panel in the layout.
 */
?>
<?php
   $node = menu_get_object();
   if (isset( $node->field_html_keys['und'][0]['safe_value'])) {
          $html_keys = $node->field_html_keys['und'][0]['safe_value'];
   }
   else
   {
        $html_keys = "";
   };

   ?>

<div class="pd-1col <?php echo $html_keys;?>" <?php if (!empty($css_id)) { print "id=\"$css_id\""; } ?>>
    <?php print $content['middle']; ?>
</div>
