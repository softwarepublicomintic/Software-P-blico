(function ($) {
    Drupal.behaviors.c4c_node = {
        attach: function (context) {
            $("input#edit-field-ref-to-und-0-target-id", context).bind('autocompleteSelect', function (event, node) {
                var entity_id = $(this).val().replace($(node).text().trim(), '').replace(/\(|\)| /g, '');
                $('#edit-field-news-url-project-und-0-url').val(document.domain + Drupal.settings.basePath + 'node/' + entity_id);
            });
        }
    };
})(jQuery);