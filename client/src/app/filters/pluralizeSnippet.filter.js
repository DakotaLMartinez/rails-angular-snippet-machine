(function() {
'use strict';

  angular
    .module('dlmSnippetMachine')
    .filter('pluralizeSnippet', pluralizeSnippet);

  function pluralizeSnippet() {
    return pluralizeSnippetFilter;

    ////////////////

    function pluralizeSnippetFilter(number) {
      if (number === 1) {
        return "snippet";
      } else {
        return "snippets";
      }
    }
  }
})();