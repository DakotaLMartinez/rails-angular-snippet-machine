(function() {
'use strict';

  angular
    .module('dlmSnippetMachine')
    .controller('createAccountController', createAccountController);

  createAccountController.$inject = ['$scope', '$auth'];
  function createAccountController($scope, $auth) {
    var vm = this;
    

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
    }
  }
})();