(function() {
  'use strict';

  angular
    .module('dlmSnippetMachine')
    .directive('validateTrigger', validateTrigger);

  validateTrigger.$inject = [];
  function validateTrigger() {
    // Usage:
    //
    // Creates:
    //
    var directive = {
      restrict: 'A',
      require: '?ngModel',
      link: link
    };
    return directive;
    
    function link(scope, element, attrs, ngModel) {
      ngModel.$validators.trigger = function(modelValue, viewValue) {
          var value = modelValue || viewValue;
          return value.match(/^\S*$/g) || false;
      }
    }
  }

})();