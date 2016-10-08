(function() {
  'use strict';
  // Usage:
  //
  // Creates:
  //

  var loginForm = {
    templateUrl: 'app/components/login/loginForm.html',
    controller: loginFormController,
    controllerAs: 'vm'
  };

  loginFormController.$inject = []
  function loginFormController () {
    
  }

  angular
    .module('dlmSnippetMachine')
    .component('loginForm', loginForm);

})();