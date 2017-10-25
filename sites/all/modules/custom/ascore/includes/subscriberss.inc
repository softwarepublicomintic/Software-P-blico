<?php



function Subscribe_to_rss() {

      global $user;

      if(!$user->uid) {

        // El usuario no esta logueado

      $mensaje = '<p class="msg_suscribe">'.$user->name.' '.t('You must be authenticated to subscribe').'</p>';
      $mensaje = $mensaje.'</br>';

      return $mensaje;

      }
      else {

        // El usuario esta logueado procede a realizar la suscripción

            $url_dp = $GLOBALS['base_url'];

        $user->field_subscribe['und'][0]['value'] = 1;
        user_save($user);

        $mensaje = '<p class="msg_suscribe">'.t('You have subscribed to the Public Software Feeds').'</p>';
        $mensaje = $mensaje.'</br>';

        return $mensaje;

      }


}
 ?>
