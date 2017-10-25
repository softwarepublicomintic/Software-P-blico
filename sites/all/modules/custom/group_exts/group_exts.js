
(function ($) {
  Drupal.behaviors.GroupExts = {
    attach: function (context, settings) {
 
      var Options = Drupal.settings.groupExts.options;
      
      // ===== 1. CATCH AUTOCOMPLETE FIELD VALUE.
      /**
       * Puts the currently highlighted suggestion into the autocomplete field.
       * Overridden from misc/autocomplete.js to add an event trigger on autocomplete.
       * @see http://d7.freedrupalthemes.net/t/professional_theme/node/2360
       */
      Drupal.jsAC.prototype.select = function (node) {
        this.input.value = $(node).data('autocompleteValue');
        // Custom: add an event trigger
        $(this.input).trigger('autocompleteSelect', [node]);
      };

      // ===== 2. SHOW A PREVIEW LINK FOR SELECTED USER.      
      if (Options.previewEnabled) {
        $('input[name="user"]', context).bind('autocompleteSelect', function() {
          var user = $(this).val();
          var URL = Options.previewLink.replace('NAME', user);
          var text = Options.previewText;
          var ElementID = user + '--' + $.now();
          var link = '<a href="/' + URL + '" class="user-preview-link" id="' + ElementID + '">' + text + '</a>';
          $('.user-preview').html(link);
        });
        $('.user-preview a').live('click', function (event) {
          event.preventDefault();
          var modalPath = $(this).attr('href');
          $.colorbox({
            iframe: true,
            href: modalPath,
            width: '50%',
            height: '50%',
          });
        });
      }
      
      $('#colorbox #cboxClose, #cboxOverlay').click(function() {
        location.reload();
      });
      
      
    }
  };
})(jQuery);