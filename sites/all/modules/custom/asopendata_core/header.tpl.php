<?php
global $base_url;

$agc_path = drupal_get_path("module","asopendata_core");
drupal_add_css($agc_path."/css/header.css");

 ?>

<div class="hder">
  <span class="hder"></span>
  <div class="logo_head">
      <a class="logo_link" href="<?php print $base_url ?>"><img src="<?php print $base_url."/".$agc_path; ?>/img/logons.png" width="349" height="135" /></a>
    </div>
</div>
