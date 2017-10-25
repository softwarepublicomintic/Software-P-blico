<?php

global $language;
global $base_path;

$agc_path = drupal_get_path("module","asopendata_core");

/* Estilos */
drupal_add_css($agc_path."/css/custom.css");
/*
drupal_add_css($agc_path."/css/current_site.css");
drupal_add_css($agc_path."/css/inline.css");
*/

drupal_add_css($agc_path."/css/opendata.css");


drupal_add_js($agc_path."/socrata_site_chrome/javascript/application.js");
drupal_add_js($agc_path."/socratacomp.js");


 ?>

<footer id="site-chrome-footer" class="" role="contentinfo">
      <div class="footer-content title-absent">
        <div class="logo">
        <!--  <a href="http://www.mintic.gov.co/"> -->
            <img src="<?php print $base_path.$agc_path; ?>/img/footerimgdfpft.png" alt="www.datos.gov.co" onerror="this.style.display=&quot;none&quot;"  usemap="#iconmap">
            <map name="iconmap">
                <area shape="rect" coords="0,0,482,98" href="http://www.mintic.gov.co/" alt="MinTic">
                <area shape="rect" coords="483,0,864,98" href="http://www.funcionpublica.gov.co/" alt="DFP">
                <area shape="rect" coords="865,0,1090,98" href="http://www.mintic.gov.co/" alt="Mintic">
            </map>
                <span class="site-name"></span>
          </a>
        </div>
        <div class="links">
          <ul class="links-col">
                <li>
                  <a class="footer-link" href="<?php print $base_path; ?>es/terms-and-conditions-es">Políticas de Privacidad y Condiciones de uso</a>
                </li>
                <li>
                  <a class="footer-link" href="/#">MINTIC</a>
                </li>
                <li>
                  <a class="footer-link" href="http://www.mintic.gov.co/portal/vivedigital/612/w3-channel.html">Vive Digital</a>
                </li>
                <li>
                  <a class="footer-link" href="http://www.mintic.gov.co">Todos Por Un Nuevo País</a>
                </li>
                <li>
                  <a class="footer-link" href="mailto:soporteccc@mintic.gov.co">Soporte</a>
                </li>
          </ul>
        </div>
        <div class="addendum">
          <div class="site-chrome-copyright">© 2017 Ministerio de Tecnologías de la Información y las Comunicaciones Edificio Murillo Toro Cra. 8a entre calles 12 y 13, Bogotá, Colombia - Código Postal 111711 Línea gratuita: 01-8000-910742, Bogotá (571) 390 79 51 - Lunes a Viernes de 7 a.m. a 6 p.m. y Sábados de 8 a.m. a 1 p.m.</div>

            <div class="language-switcher-container">
  <div class="language-switcher noselect">
    <div data-dropdown="" data-orientation="top" class="dropdown dropdown-orientation-top" role="button" aria-expanded="false" data-value="" data-index="-1">
      <span>  <?php
           if ($language->name=="Spanish")
           {
             print "Español";
           }
           else {
             print $language->name;
           }
        ?>
        <span class="socrata-icon-arrow-up"></span>
      </span>
      <ul class="dropdown-options">
        <li>
          <a class="language-switcher-option" href="<?php print $base_path; ?>en/">English</a>
        </li>
        <li>
          <a class="language-switcher-option" href="<?php print $base_path; ?>es/">Español</a>
        </li>
      </ul>
    </div>
  </div>
</div>

        </div>
      </div>
    </footer>
