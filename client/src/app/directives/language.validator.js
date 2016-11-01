(function() {
  'use strict';

  angular
    .module('dlmSnippetMachine')
    .directive('validateLanguage', validateLanguage);

  validateLanguage.$inject = ['Language', '$log'];
  function validateLanguage(Language, $log) {
    // Usage: add validate-language to an input field and 
    // the language will be checked for support
    // to display an error, add <div ng-message="language"></div>
    // Creates: a language support validator on an input element
    //
    var directive = {
        restrict: 'A',
        require: '?ngModel',
        link: link
    };
    return directive;
    
    function link(scope, element, attrs, ngModel) {
      ngModel.$validators.language = function(value) {
        return Language.isSupported(value) || false;
      }
    }
  }
})();