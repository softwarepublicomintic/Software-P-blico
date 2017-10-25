/**
 * @file
 * A JavaScript file for the theme.
 *
 * In order for this JavaScript to be loaded on pages, see the instructions in
 * the README.txt next to this file.
 */
(function ($, Drupal, window, document) {
  'use strict';

  Drupal.behaviors.C4C__CommonBehaviors = {
    attach: function (context, settings) {

      /*
       * Clickers: Hide referenced elements.
       */
      $('.js--clicker').each(function (index) {
        var element = $(this).attr('data-click');
        if ((element) && ($(element).length)) {
          $(element).hide();
        }
        else {
          $(this).hide();
        }
      });

      /**
       * Clickers: Click on a clicker.
       */
      $('.js--clicker').click(function () {
        var element = $(this).attr('data-click');
        if (element) {
          $(element).trigger('click');
        }
      });

      /*
       * Feature to fill textareas or textfields:
       */
      $('.form-item--filler').click(function () {
        var dataValue = $(this).attr('data-value');
        var dataDestination = $(this).attr('data-destination');
        if ($(dataDestination).length) {
          var processed = appendValue(dataValue, dataDestination, ',');
          switch (processed) {
            case 'ADDED':
              $(this).addClass('added');
              break;
            case 'REMOVED':
              $(this).removeClass('added');
              break;
          }
        }
      });


      /*
       * Function to add or remove an item to a field. This feature works with textareas
       * and textfields.
       */
      var appendValue = function (value, field, separator) {
        var currentFieldValue = $(field).val();
        if (!currentFieldValue) {
          $(field).val(value);
          return 'ADDED';
        }
        var currentValues = currentFieldValue.split(separator);
        var values = '';
        if (($.inArray(value, currentValues) < 0)) {
          currentValues.push(value);
          values = currentValues.join(separator);
          $(field).val(values);
          return 'ADDED';
        }
        else {
          currentValues = $.grep(currentValues, function (item) {
            return item !== value;
          });
          values = currentValues.join(separator);
          $(field).val(values);
          return 'REMOVED';
        }
        // return 'UNPROCESSED';
      };

      /*
      * Click al botón de eliminar todos los filtros
      */
     function clickDeleteFilters(button) {
		$(document).on('click', button, function()
        {
			let numEach = 0,
            breadFilters = [],
            count = 0,
            ajaxLoad = $('<div class="bread-load ajax-progress ajax-progress-throbber"><div class="throbber"></div></div>')

            $('.form-filters .views-exposed-widget').once().each(function(index) 
            {            
				let items = {
                  'id': $(this).attr('id'),
                  'label': $.trim($(this).find('label').text()),
                  'value': $.trim($(this).find('.chosen-single > span').text()) + $.trim($(this).find('.form-text').val())
                }

                if (items.id != '' && items.id != undefined && items.label != '' && items.label != undefined && items.value != '' && items.value != undefined && items.value != '- Cualquiera -')
                {
                  breadFilters.push(items)
                  count = 1
				  numEach ++
                }
			})
			
			$(breadFilters).each(function(dindex, dobject) 
			{
				let item = '#' + dobject.id
				if (item)
				{
					$(item).find('.form-text').val('')
					
					if ($(item).find('.chosen-container').length > 0)
					{
						$(item).find('select option').attr('value','All').click()
					}
				}
			})
			
			if (numEach == breadFilters.length || numEach == 0)
			{	
				if ($('.bread-load').length < 1) 
                {
                  $(ajaxLoad).appendTo(button)
                }  								
				$('.form-filters').find('.form-submit').click()
			}
		})
	 }
	 clickDeleteFilters('.delete-filters')
	 clickDeleteFilters('.btn-reload')

      /**
       * Settings to group Views filters.
       */
      if ($('.view.group--exposed-filters').length > 0) {
        $('.view.group--exposed-filters').each(function (index) {
          if (!$(this).hasClass('group-filters-processed')) {
            var filterOptions = [];
            $(this).find('.view-filters form .views-exposed-widget').each(function (sindex) {
              var item = {
                'id': $(this).attr('id'),
                'label': $.trim($(this).find('label').text())
              };
              if (item.id != '' && item.id != 'undefined' && item.label != '' && item.label != 'undefined') {
                filterOptions.push(item);
              }
              $(this).hide();
            });
            // Now, "theme" filter options and append a wrapper:
            var themedLabel = '<div class="exets"><span class="label">' + Drupal.t('Filter by') + '</span></div>';
            var themedFilterOptions = '<ul class="options">';
            $.each(filterOptions, function( kindex, values ) {
              var option = '<a href="#" class="group-filters-option" data-field="#' + values.id + '">' + values.label + '</a>';
              themedFilterOptions = themedFilterOptions + '<li>' + option + '</li>';
            });
            themedFilterOptions = themedFilterOptions + '</ul>';
            $(this).find('.view-filters').prepend('<div class="group-filters">' + themedLabel + themedFilterOptions + '</div>');
            $(this).addClass('group-filters-processed');
          }
        });
        // Click behaviors:
        $('.group-filters .group-filters-option').once().click(function (event) {
          event.preventDefault();
          var element = $(this).attr('data-field');
          if (element) {
            if ($(this).hasClass('selected')) {
              $(this).removeClass('selected');
              $(this).parent().removeClass('active');
              $(element).hide();
              // Remove field values:
              $(element).find('input[type="text"]').val('');
              $(element).find('textarea').val('');
              $(element).find('select').val($(element).find('select option:first').val()).change();
              // Choosen support:
              if ($(element).find('.chosen-container').length > 0) {
                $(element).find('select').trigger('chosen:updated');
              }
            }
            else {
              $(this).addClass('selected');
              $(this).parent().addClass('active');
              $(element).css('display','inline-block');
            }

            // If there is at least 1 active filter, show submit button:
            if ($('.group-filters .group-filters-option.selected').length > 0) {
              $('.views-submit-button').css('display','inline-block');
            }
            else {
              $('.views-submit-button').hide();
            }
          }
        });

        // Add class to show/hide options:
        $('html').click(function(event) {
          if ($(event.target).parents('.exets').length == 0) {
            $('.group-filters').removeClass('jqs');
          }
          else {
            $('.group-filters').addClass('jqs');
          }
        });
      }
      
      // Prevent double submission on this form. See http://drupal.stackexchange.com/a/50109.
      $('form#c4c-socrata-form-select-results', context).once('hideSubmitButton', function () {
        var $form = $(this);
	$form.find('input.form-submit').click(function (e) {
	  var el = $(this);
	  el.after('<input type="hidden" name="' + el.attr('name') + '" value="' + el.attr('value') + '" />');
	  return true;
	});
	$form.submit(function (e) {
	  if (!e.isPropagationStopped()) {
	    $('input.form-submit', $(this)).attr('disabled', 'disabled');
	    return true;
	  }  
	});
      });
      
      
      
      
    }
  };

})(jQuery, Drupal, this, this.document);
