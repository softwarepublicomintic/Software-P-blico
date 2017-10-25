<?php



function to_Subscribe_to_rss() {

      global $user;

      if(!$user->uid) {

        // El usuario no esta logueado

      $mensaje = '<p class="msg_suscribe">'.$user->name.' '.t('You must be authenticated to subscribe').'</p>';
      $mensaje = $mensaje.'</br><a href="'.$base_path.'" class="btn_continue" onclick="window.close(); return false;">Continuar</a>';

      return $mensaje;

      }
      else {

        // El usuario esta logueado procede a realizar la suscripción
        $url_dp = $GLOBALS['base_url'];

        $mensaje = '<span class="msg_tosubscribe"><p>Para suscribirse a Software Público, vía un lector RSS puede usar uno de los siguientes enlaces:</p>';
        $mensaje = $mensaje.'<a href="'.$url_dp.'/rss/applications" rel="external" target="_blank">Descargar como RSS</a></span></h2>';
        $mensaje = $mensaje.'Para recibir notificaciones vía correo electrónico cuando se publiquen nuevos datos, haga click en el botón suscribirse a Feed.</span>';
        $mensaje = $mensaje.'<p><a class="btn_subscribe_rss" href="'.$url_dp.'/rss/subscribe" onclick="window.open(this.href, this.target, "width=300,height=400"); return false;" target="popup">Suscribirse a feed</a></p>';

        return $mensaje;

      }


}
 ?>
