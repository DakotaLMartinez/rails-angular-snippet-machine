(function() {
  'use strict';
  // Usage:
  //
  // Creates:
  //

  var displayErrors = {
    bindings: {
      errors: '='
    },
    templateUrl: 'app/components/displayErrors/displayErrors.html',
    controller: displayErrorsController,
    controllerAs: 'vm'
  };

  displayErrorsController.$inject = []
  function displayErrorsController () {
    var vm = this;
    vm.errors = vm.errors || {};
    vm.showErrors = showErrors;
    vm.getErrorMessage = getErrorMessage;
    
    /////////////////////////////////////

    function showErrors() {
      if (Object.keys(vm.errors).length !== 0) {
        return true;
      } else {
        return false;
      }
    }

    function getErrorMessage(){
      var errorCount = 0;
      var errorList = '';

      errorList += '<ul class="pl3 list">';
      if (Object.keys(vm.errors).length !== 0) {
        for (var field in vm.errors) {
          var fieldErrors = vm.errors[field];
          if(fieldErrors) {
            for (var i = 0 ; i < fieldErrors.length ; i++) {
              errorList += '<li>';
              errorList += String(field) + ' ' + fieldErrors[i];
              errorList += '</li>';
              errorCount++;
            }
          }
        }
        errorList += '</ul>';
      } else {
        return;
      }

      if (errorCount === 1) {
        var header = '<h4>' + errorCount + ' error occurred:</h4>';
      } else {
        var header = '<h4>' + errorCount + ' errors occurred:</h4>';
      }
      
      return header + errorList;
    }
  }

  angular
    .module('dlmSnippetMachine')
    .component('displayErrors', displayErrors);

})();