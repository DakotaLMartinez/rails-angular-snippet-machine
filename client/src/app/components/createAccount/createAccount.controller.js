(function() {
'use strict';

  angular
    .module('dlmSnippetMachine')
    .controller('createAccountController', createAccountController);

  createAccountController.$inject = ['$rootScope', '$scope', '$auth'];
  function createAccountController($rootScope, $scope, $auth) {
    var vm = this;
    vm.errors;

    activate();

    ////////////////

    function activate() { 
      $scope.handleRegBtnClick = function() {
        $auth.submitRegistration($scope.registrationForm)
          .then(function(){
            $auth.submitLogin({
              email: $scope.registrationForm.email,
              password: $scope.registrationForm.password
            });
          });
      };

      $rootScope.$on('auth:registration-email-error', function(ev,reason){
        vm.errors = reason.errors.full_messages;
      });
    }
  }
})();