/**
 * @file
 * A JavaScript file for the theme.
 *
 * In order for this JavaScript to be loaded on pages, see the instructions in
 * the README.txt next to this file.
 */

// JavaScript should be made compatible with libraries other than jQuery by
// wrapping it with an "anonymous closure". See:
// - https://drupal.org/node/1446420
// - http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth
(function ($, Drupal, window, document) {

  'use strict';

  var x = 0
  // To understand behaviors, see https://drupal.org/node/756722#behaviors
  Drupal.behaviors.ZenC4C = {
    attach: function (context, settings) {
      $('.page-c4c-group-user-add form#views-form-c4c-user-groups-block-1 .form-actions input[type="submit"]').click(function (event) {
        var selectedRoles = $('.page-c4c-group-user-add form#views-form-c4c-user-groups-block-1 .form-item-parameter-roles-settings-roles textarea').val();
        if (selectedRoles == '' || selectedRoles == 'undefined' || selectedRoles == null) {
          event.preventDefault();
          alert(Drupal.t('You must select at least one choice. If you want to add a single member, choose "Group member".'));
        }
      });

      // Separate all words in "Tools" page for each title:
      $('.split-words').each(function (index) {
        var text = $(this).find('.field-item').text();
        var split = text.split(' ');
        var content = '';
        $.each(split, function (key, value) {
          content += '<span class="part part' + key + '">' + value + '</span> ';
        });
        $(this).find('.field-item').html(content);
      });

      $('.node-type-tools .view-display-id-block_4 .view-content').wrapInner('<div class="view-content-inner"><div class="scrolled-content scroll-pane horizontal-only"></div></div>');
  	  //$('.scrolled-content').jScrollPane();
  	  $('.scrolled-content').each(function() {
    		$(this).jScrollPane({
    			showArrows: true, //$(this).is('.arrow'),
    			verticalDragMinWidth: 130,
    			verticalDragMaxWidth: 130,
    			horizontalDragMinWidth: 130,
    			horizontalDragMaxWidth: 130
    		});

  	  	var api = $(this).data('jsp');
  	  	var throttleTimeout;
  	  	$(window).bind('resize', function() {
    			if (!throttleTimeout) {
    		  		throttleTimeout = setTimeout(function() {
    					api.reinitialise();
    					throttleTimeout = null;
    		  	}, 50);
    			}
  	    });
      });

      //$('<div class="categorias"></div>').('#c4c-faq-form #edit-category');

      /**
       * Search box placeholder.
       */
      $('.pane-header-standard .form-item-search-block-form input[type="text"]').attr('placeholder', Drupal.t('Search'));

      /**
       * Block to add users to a group: Hide role selector pane if field is
       * not present.
       */
      if (!$('.blockgroup--group-ad-user .form-item-parameter-roles-settings-roles').length) {
        $('.blockgroup--group-ad-user .select-roles').hide();
      }
      else {
        $('.blockgroup--group-ad-user .form-item-parameter-roles-settings-roles').hide();
        $('.blockgroup--group-ad-user .select-users .pane-title').hide();
      }

      /**
       * Translate content type: c4c/content/project/add/news
       * May be deprecated.
       */
      $('.zen-c4c--i18np').each(function () {
        var text = $(this).find('.pane-content').html();
        if ($(this).hasClass('rpl-dslsh')) {
          text = text.replace('_', ' ');
        }
        $(this).find('.pane-content').html(Drupal.t(text));
      });

      $(document).ready(function () {
        $('#mini-panel-header__standard .center-wrapper .col--middle').prepend('<div class="c4c-responsive-menu-wrapper"><ul class="menu"></ul></div>');
        $('.panel-pane.main-menu ul.menu li').each(function () {
          $('#mini-panel-header__standard .center-wrapper .col--middle .c4c-responsive-menu-wrapper ul.menu').append($(this).clone());
        });
        $('.login-register-menu ul.menu li').each(function () {
          $('#mini-panel-header__standard .center-wrapper .col--middle .c4c-responsive-menu-wrapper ul.menu').append($(this).clone());
        });
        $('.language-switcher ul li').each(function () {
          $('#mini-panel-header__standard .center-wrapper .col--middle .c4c-responsive-menu-wrapper ul.menu').append($(this).clone());
        });

        resizeowl();


      });

      // script que coloca los estilos de error a los input file y seletc en los formularios

      if ( $('.form-field-name-field-image .form-file').hasClass('error') ) {
        $('.form-field-name-field-image .form-file').siblings('.zen-c4c--file-upload').addClass('error');
      }

      // Chosen touch support.
      if ($('.chosen-container').length > 0) {
        $('.chosen-container').bind('touchstart', function (e) {
          e.stopPropagation(); e.preventDefault();
          // Trigger the mousedown event.
          $(this).trigger('mousedown');
        });
      }

      /**
       * VBO settings:
       */
      $('.vbo-views-form form input[type="submit"]').each(function () {
        if (!$(this).hasClass('i18n')) {
          var value = $(this).attr('value');
          $(this).attr('value', Drupal.t(value));
          $(this).addClass('i18n');
        }
      });

      function resizeowl() {
        if ($('.view-c4c-projects-std.view-display-id-block_2').length) {
          var owlwidth = $('.view-c4c-projects-std.view-display-id-block_2 .owl-item').width();
          $('.view-c4c-projects-std.view-display-id-block_3 .views-row').each(function () {
            $(this).width(owlwidth - 5);
            $(this).css('margin', 0);
          });
          $('.view-c4c-projects-std.view-display-id-block_1 .views-row').each(function () {
            $(this).width(owlwidth - 5);
            $(this).css('margin', 0);
          });
        }

        if ($('.view-c4c-applications-std.view-display-id-block_2').length) {
          var owlwidth2 = $('.view-c4c-applications-std.view-display-id-block_2 .owl-item').width();
          $('.view-c4c-applications-std.view-display-id-block_3 .views-row').each(function () {
            $(this).width(owlwidth2 - 5);
            $(this).css('margin', 0);
          });
          $('.view-c4c-applications-std.view-display-id-block_1 .views-row').each(function () {
            $(this).width(owlwidth2 - 5);
            $(this).css('margin', 0);
          });
        }
      }

      var rtime;
      var timeout = false;
      var delta = 200;
      $(window).resize(function () {
        rtime = new Date();
        if (timeout === false) {
          timeout = true;
          setTimeout(resizeend, delta);
        }
      });

      function resizeend() {
        if (new Date() - rtime < delta) {
          setTimeout(resizeend, delta);
        }
        else {
          timeout = false;
          resizeowl();
        }
      }

      // script para manipular el alto del modal de solicitar aplicacion
      var btnFinalizar = $(".page-group-add .layout-3col__full > .block-views");
      var btnAdd = $(".page-group-add .layout-3col__full > form .form-submit");


      if ( $(".page-group-add").find(".layout-3col__full > .block-views")) {
        btnAdd.after(btnFinalizar);
      }

      jQuery("#edit-status-wrapper").addClass("views-widget-filter-type");

      /**-- Script para reubicar el botón buscar en search--**/
      var textSearch = $('.pane-header-standard .col--middle .pane-search-form .form-item-search-block-form .form-text');
      var btnSearch2 = $('.pane-header-standard .col--middle .pane-search-form .form-actions');

      if ($(window).width() <= 480) {
        $(textSearch).focus(function() {
          $(btnSearch2).css('display','block');
        });
      }

      $(window).resize(function() {
        if ($(window).width() <= 480) {
          $(btnSearch2).css('display','none');

          $(textSearch).focus(function() {
            $(btnSearch2).css('display','block');
          });
        }
        else if ($(window).width() > 480) {
          $(btnSearch2).css('display','inline-block');

          $(textSearch).focus(function() {
            $(btnSearch2).css('display','inline-block');
          });
        }
      });
      /**-- End script --**/

      $(document).ready(function() {
        /**-- dotdotdot - 3 puntos auxiliares al final de cada parrafo (leer más)--**/
        var descripTools = $('.node-type-tools .views-field-field-tool-description .field-item');
        var ProyeBlockDes = $('.pane-c4c-applications-std .view .c4c-element-row .field-name-body .field-item');
        var contTitDescr = $('.pane-c4c-news-events.default .content-title-description');
        var ProyeBlockDes2 = $('.page-projects .pane-c4c-projects-std .project-type--project_it .field-name-body .field-item');

        $(descripTools).dotdotdot({
          ellipsis: ' ...',
          wrap : 'letter',
          watch : window,
        });

        $(ProyeBlockDes).dotdotdot({
          ellipsis: ' ...',
          wrap : 'letter',
          watch : window,
        });

        $(contTitDescr).dotdotdot({
          ellipsis: ' ...',
          wrap : 'letter',
          watch : window,
        });

        $(ProyeBlockDes2).dotdotdot({
          ellipsis: ' ...',
          wrap : 'letter',
          watch : window,
        });
        /**-- End script --**/
      });

 $('.pane-c4c-news-events .first-title-description .views-field-title').dotdotdot({
        ellipsis: '...',
        wrap : 'letter',
        watch : window,
      });
 $('.pane-c4c-news-events .first-title-description .field-name-body').dotdotdot({
        ellipsis: '...',
        wrap : 'letter',
        watch : window,
      });

  /*    $(linkVideo).dotdotdot({
        ellipsis: '...',
        wrap : 'letter',
        watch : window,
      }); */

      /**-- End script --**/

      /**-- Script para cuando no se encuentren resultados en la lista de preguntas frecuentes --**/
      var txtNoResultado = $('.node-type-tools .pane-c4c-faq-c4c-faq #ajax-reloaded-faq-list .questions-list li .position').length;

      if (txtNoResultado === 0) {
        $('.node-type-tools .pane-c4c-faq-c4c-faq #ajax-reloaded-faq-list .questions-list li').addClass('li-not');
      }

      /**-- End script --**/

      jQuery('.pane-header-standard .pane-content .col--top').append('<div class="header-toggle"></div>');

      jQuery('.header-toggle').click(function() {
        jQuery('.pane-header-standard .pane-content .col--top .login-register-links').slideToggle('slow');
      });

      $(document).ready(function() {
        /**-- Script para reubicar la descripción de cada rol en adminsitrar proyectos y aplicaciones --**/

        $('.form-item-roles-moderator').after($('#descripcion-rol-moderador'));
        $('.form-item-roles-project-creator').after($('#descripcion-rol-creador'));
        $('.form-item-roles-group-member').after($('#descripcion-rol-miembro'));
        $('.form-item-roles-group-admin').after($('#descripcion-rol-admin'));

        /**-- End script --**/
      });

      /**-- Script para mostrar y ocultar las opciones de filtro en aplicaciones --**/
    x = x ++

		function moveFormFilters(block, form, o) {
			$(form).addClass('form-filters')
			$(block).addClass('view-custom-class')
      $('body').css('overflow','inherit')
      $('.view-filters .close-filters').prependTo('.form-filters')
      $('.view-filters > h3').prependTo('.form-filters')

      if ($('.content-bg').length < 1) {
        $('<div class="content-bg"></div>').appendTo('.view-custom-class .view-filters')
      }
		}

    function click(eleClick, showHide, overflow) {
      $(document).on('click', eleClick, function() {
        $('.form-filters').css('display', showHide)
        $('.content-bg').css('display', showHide)
        $('body').css('overflow',overflow)
      })
    }

	$(document).ready(function() {
		if (x == 0) {
			var arrayView = ['c4c-applications-std', 'c4c-projects-std']
			$(arrayView).each(function(i, o) {
				moveFormFilters('.view-'+ o +'.view-display-id-block_1', '#views-exposed-form-'+ o +'-block-1', o)
				moveFormFilters('.view-'+ o +'.view-display-id-block_3', '#views-exposed-form-'+ o +'-block-3', o)
			})

        /* POR WILLIAM BAUTISTA migas de pan de los filtros realizados */
        if ($('form.form-filters').length > 0)
        {
          let breadFilters = [],
            count = 0,
            ajaxLoad = $('<div class="bread-load ajax-progress ajax-progress-throbber"><div class="throbber"></div></div>')
          $('form.form-filters').once().each(function(index)
          {
            $('.form-filters .views-exposed-widget').each(function(cindex)
            {
              let items = {
                'id': $(this).attr('id'),
                'label': $.trim($(this).find('label').text()),
                'value': $.trim($(this).find('.chosen-single > span').text()) + $.trim($(this).find('.form-text').val())
              }

              if (items.id != '' && items.id != undefined && items.label != '' && items.label != undefined && items.value != '' && items.value != undefined && items.value != '- Cualquiera -' && items.value != '- Any -') {
                breadFilters.push(items)
                count = 1
              }
            })

            let breadLabel = '<span class="label">' + Drupal.t('Filters:') + '</span>',
              breadContent = '<ul class="breadContent">' + breadLabel

            $(breadFilters).each(function(bindex, bobject)
            {
              let spanDelete = '<span class="bread-delete" data-input="#' + bobject.id + '"></span>',
                spanlabel = '<span class="bread-title">' + bobject.label + ': </span>',
                spanValue = '<span class="bread-value">' + bobject.value + '</span>'

              breadContent = breadContent + '<li class="bread-item">' + spanDelete + spanlabel + spanValue + '</li>'
            })

            breadContent = breadContent + '<li><span class="delete-filters">' + Drupal.t('Delete') + '</span></li></ul>'
            $(breadContent).prependTo($('.view-custom-class'))
            if ($(breadFilters).length < 2)
            {
            	$('.delete-filters').parent().hide()
            }

            let showHideBreadCount = $('.breadContent')
            if (count == 1) {
              showHideBreadCount.show()
            } else {
              showHideBreadCount.hide()
            }
          })

          $(document).on('click', '.bread-delete', function()
          {
            let item = $(this).attr('data-input')
            if ($(this).attr('data-input', item))
            {
              if ($('.bread-load').length < 1)
              {
                $(ajaxLoad).appendTo($(this).parent())
              }
            }
            if (item) {
              $(item).find('.form-text').val('')

              if ($(item).find('.chosen-container').length > 0)
              {
                $(item).find('select option').attr('value','All').click()
              }

              $(item).parent().find('.form-submit').click()
            }
          })
        }

        $('.bread-value').dotdotdot({
          ellipsis: ' ...',
          wrap : 'letter',
          watch : window,
        });
        /* Fin Script */
		}

	    click('.btn_modal-filters', 'block', 'hidden')
    	click('.close-filters', 'none', 'inherit')
	})

      /**-- End script --**/

      /**-- Script para reubicar bloques --**/

      // Reubicar descripción del campo URL Video en agregar proyecto/aplicación

      var UbicacionDesc = $('.page-node-add .overlay-processed .field-widget-video-embed-field-video .fieldset-description');
      var DestinoDesc = $('.page-node-add .overlay-processed .field-widget-video-embed-field-video .form-type-textfield');
      $(UbicacionDesc).before(DestinoDesc);

      /**-- End script --**/

      // Reubicar bloques en modal de crear proyecto
      var fileImgProyect = $('.page-node-add-project .form-field-name-field-image-slides'),
          fileImgApp = $('.page-node-add-project-application .form-field-name-field-image-slides'),
          fileArchivoAdjuntProyec = $('.page-node-add-project .form-field-name-field-project-files'),
          fileArchivoAdjuntApp = $('.page-node-add-project-application .form-field-name-field-project-files'),
          inputEmailContactProyec = $('.page-node-add-project .form-field-name-field-project-contact-mail'),
          inputEmailContactApp = $('.page-node-add-project-application .form-field-name-field-project-contact-mail'),
          labelDocuments = $('.page-node-add-project, .page-node-add-project-application .group-docs');

      $('.page-node-add-project .form-field-name-field-project-organization').after(inputEmailContactProyec);
      $('.page-node-add-project .form-field-name-field-project-organization').after(inputEmailContactApp);
      $('.page-node-add-project .form-field-name-field-project-url-documentation').after(fileImgProyect);
      $('.page-node-add-project-application .form-field-name-field-project-url-documentation').after(fileImgApp);
      $(fileImgProyect).after(fileArchivoAdjuntProyec);
      $(fileImgApp).after(fileArchivoAdjuntApp);
      $(labelDocuments).before('');

      /**-- End script --**/

      /**-- Reubicar checkbox que se mustra al elegir software publico al crear aplicación --**/

      var mq768px = window.matchMedia("(min-width :768px)"),
          checkSoftPublico = $('.page-node-add-project-application .form-field-name-field-app-software-free'),
          checkEditSoftPublico = $('.node-type-project-application .form-field-name-field-app-software-free'),
          checkdestino1 = checkSoftPublico.parent('div'),
          checkdestino2 = checkEditSoftPublico.parent('div');

      $(window).resize(function() {
        if ($(window).width() > 768) {
          $(checkdestino1).find('.form-field-name-field-image').after($(checkSoftPublico));
          $(checkdestino2).find('.form-field-name-field-image').after($(checkEditSoftPublico));
        }
        else {
          $(checkdestino1).find('.form-field-name-field-application-type').after($(checkSoftPublico));
          $(checkdestino2).find('.form-field-name-field-application-type').after($(checkEditSoftPublico));
        }
      });

      $(window).ready(function() {
        if (mq768px.matches) {
          $(checkdestino1).find('.form-field-name-field-image').after($(checkSoftPublico));
          $(checkdestino2).find('.form-field-name-field-image').after($(checkEditSoftPublico));
        }
      });

 /**-- Reubicar la cantidad de resultados en la sección aprender sobre datos --**/
      var cantResult = $('.page-data .view-header');
      $('.page-data .view-filters .views-widget-filter-combine').after(cantResult);
      /**-- End script --**/

      /** Script para agregar clase y diferenciar páginas de videos**/
      var dataUse = $('.page-videoc');


      /**-- End script --**/

      /**-- Scrip para agregar clase al modal perfil de usuario y diferenciar del modal contactar --**/
      var modalPerfilUsuario = $('.node-type-project-application, .node-type-project');

      // modales de perfil de los instegrantes del proyecto en interna de proyecto y aplicacion
      $(modalPerfilUsuario).find('.colorbox-load, .colorbox-node').click(function() {
        setInterval(function() {
          if ($(modalPerfilUsuario).find('.pane-user-profile').length == 2) {
            $('#colorbox').removeClass('request-application');
            $('#colorbox').addClass('colorbox-user-profile');
          }
          else if ($(modalPerfilUsuario).find('.pane-entityform-block-app-use').length == 1) {
            $('#colorbox').removeClass('colorbox-user-profile');
            $('#colorbox').addClass('request-application');
          }
        }, 1000);
      });

      // modal de perfil de la persona a agregar al proyecto especifico
      $('.page-group-add .user-preview').click(function() {
        setInterval(function() {
          if ($('.page-user').find('.pane-c4c-user').length === 0) {
            $('#colorbox').removeClass('request-application');
            $('#colorbox').addClass('colorbox-user-profile');
          }
        }, 1000);
      });

      $(dataUse).find('.data-use').closest('.pd-1col').addClass('page-data-use');
      $(dataUse).find('.data-publish').closest('.pd-1col').addClass('page-data-publish');
      $(dataUse).find('.data-develop').closest('.pd-1col').addClass('page-data-develop');
      /**-- End script --**/

      /**-- Script para reubicar redes sociales en interna de novedades --**/
      var redesSociales = $('.node-type-news .views-field-service-links');
      /**-- End script --**/

    /**-- End script --**/
    $('a[href="/es/node/add/lessons-learned"]').attr('href', '/es/c4c/content/project/add/lessons-learned/forum');
    $('a[href="/en/node/add/lessons-learned"]').attr('href', '/en/c4c/content/project/add/lessons-learned/forum');

    $('.view-c4c-admin-content--stda .form-item-field-project-type-tid .chosen-results').click(function(){
      $('.view-c4c-admin-content--stda #edit-field-application-type-tid').val('All');
    });

    $('.view-c4c-admin-content--stda .form-item-field-application-type-tid .chosen-results').click(function(){
      $('.view-c4c-admin-content--stda #edit-field-project-type-tid').val('All');
    });

    /**-- Agregar propiedad disabled a inputs de datasets al editar un proyecto  --**/
    $(window).ready(function() {
      var editDatasets = $('.node-type-project-application, .node-type-project');

      $(editDatasets).find('.group-dc .link-field-column input').attr('readonly', true);
      $(editDatasets).find('.group-dc .field-name-field-link-pa-type .chosen-container-single').click(function() {
        $(this).removeClass('chosen-with-drop');
        $(this).removeClass('chosen-container-active');
      });
    });

  $(redesSociales).parent('div').find('.views-field-field-image').before(redesSociales);

      /**-- End script --**/

    /**-- End script --**/

    $(document).ready(function() {
      // Script para agregar clase al owl-less-items cuando se muestren 4 noticias
        var owlCarouselItems = $('.pane-c4c-news-events.default .owl-item').length;

        if (owlCarouselItems <= 2) {
          $('.pane-c4c-news-events.default .owl-wrapper').addClass('owl-less-items');
        }
        else {
          $('.pane-c4c-news-events.default .owl-wrapper').removeClass('owl-less-items');
        }

      // End script
    });

    /**-- Script para manipular los bloques de datasets y comunidad en interna de proyecto --**/

    if ($('.pane-cdcj .pane-c4c-applications-fc').length < 1) {
      $('.pane-cdcj').hide()
      $('.field-socrata-link').hide()
    } else {
      if ($(window).width() <= 480) {
        /**-- Reubicar botón de 'agregar tema foro' en consultar software --**/
        $('.pane-gb-nopvws .panel-pane:first-child').addClass('btn-first')
        $('.pane-gb-nclnks .pane-cdcj').before($('.pane-gb-nopvws .btn-first'))
      /**-- End Script --**/
      }
    }

    /**
     * Automatically add time to jQuery.datepicker, if blank.
     */
    $('.form-field-name-field-event-dates input').on('change', function(e){
      $('input.date-time').each(function (index) {
        var value = $(this).val();
        var isVisible = $(this).parent().parent().parent().is(':visible');
        if ((value == '' || value == 'undefined' || value == null) && isVisible) {
          $(this).val('01:00');
        }
      });
    })

    if ($('.view-c4c-counter-fc-links .view-empty').length > 0) {
      $('.view-empty').each(function(index) {
        $(this).parent('div').addClass('data0');
      });
    }

    /**
    * Ocultar campos municipio y ciudad al seleccionar ninguno en país
    */

     // Registro
    $('.page-user-register .selects .chosen-container').each(function(e) {
      if (e == 1) {
       $(this).addClass('container-center');
      }
    });

    // Editar perfil
    $('.page-user-edit .selects .chosen-container').each(function(e) {
     if (e == 1) {
       $(this).addClass('container-center');
     }
    });

    // Registro
    $('.page-user-register .selects > select').change(function() {
      var valueSelect = "";

      $('.page-user-register .selects > select option:selected').each(function() {
        valueSelect += $(this).text();
      });

      if (valueSelect === "<ninguno>") {
        $('.page-user-register .selects .chosen-container').each(function(e) {
          if (e > 0) {
            $(this).parent('.selects').addClass('container-hide');
          }
        });
      }
      else {
        $('.page-user-register .selects').removeClass('container-hide');
      }
    });

    // Editar perfil
    $('.page-user-edit .selects > select').change(function() {
      var valueSelect = "";

      $('.page-user-edit .selects > select option:selected').each(function() {
        valueSelect += $(this).text();
      });

      if (valueSelect === "<ninguno>") {
        $('.page-user-edit .selects .chosen-container').each(function(e) {
          if (e > 0) {
            $(this).parent('.selects').addClass('container-hide');
          }
        });
      }
      else {
        $('.page-user-edit .selects').removeClass('container-hide');
      }
    });

    /**
     * Change some textfields as a jQuery.datepicker.
     */
    $('.form-field-name-field-project-year input, .form-field-name-field-application-year input').attr('readonly', true);
    $('.form-field-name-field-project-year input, .form-field-name-field-application-year input').datepicker({
        changeYear: true,
        showButtonPanel: false,
        dateFormat: 'yy',
        yearRange: '1950:2030',
        onClose: function(dateText, inst) {
          var year = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
          $(this).datepicker('setDate', new Date(year, 1));
          $('#ui-datepicker-div').removeClass('datepicker-c4c');
          $('#ui-datepicker-div').removeClass('se-hidden');
        },
        onChangeMonthYear: function (year, month, inst) {
          $(this).datepicker('setDate', new Date(year, 1));
        },
        beforeShow: function(input, inst) {
          //$('#ui-datepicker-div').addClass(this.id);
          $('#ui-datepicker-div').removeClass('datepicker-c4c');
          $('#ui-datepicker-div').removeClass('se-hidden');
          $('#ui-datepicker-div').addClass('datepicker-c4c');
          $('#ui-datepicker-div').addClass('se-hidden');
        }
    });

    /**-- End script --**/

		// Fecha versión
		// Agregar clase al pulsar sobre el campo fecha de versión en crear aplicación
		if ($('.page-node-add-project-application').length > 0) {
			$('#edit-field-app-date-version-und-0-value-datepicker-popup-0').click(function() {
				$('#ui-datepicker-div').addClass('date-version');
			})

			$('#edit-field-application-year-und-0-value').click(function() {
				$('#ui-datepicker-div').removeClass('date-version');
			})
		}

		// Mensajes de estado
		$('.messages').each(function(ind, obj) {
			// X para el mensaje de error
			$("<div class='close-message'></div>").appendTo(obj)

			$('.close-message').click(function() {
				$(this).parent().hide('fast')
			})

			// Duplicidad de mensajes
			var arrayli = []
			$(obj).find('li').each(function(i, o) {
				if (jQuery.inArray($(this).text(), arrayli) == 0) {
					$(this).addClass('is_true')
				} else {
					arrayli.push($(this).text())
				}
			})
		})

    	// Mover mensajes de estado dentro del bloque principal
	    setInterval(function() {
	      $('.pane-easy-breadcrumb-easy-breadcrumb').after($('.layout-3col__full > .messages'))
	      if ($('.view-empty').length > 0) {
	        $('.delete-filters').parent().hide()
	      }
	    }, 10)

		// $(window).bind('pageshow', function() {
		// 	alert('hola')
		// })
	}
  };

})(jQuery, Drupal, this, this.document);
