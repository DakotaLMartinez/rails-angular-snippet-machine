(function() {
'use strict';

  // Usage:
  // 
  // Creates:
  // 

  angular
    .module('dlmSnippetMachine')
    .component('createAccount', {
      templateUrl: 'app/components/createAccount/createAccount.html',
      controller: CreateAccountController,
    });

  CreateAccountController.$inject = ['$auth', '$rootScope', '$scope', '$state', '$log'];
  function CreateAccountController($auth, $rootScope, $scope, $state, $log) {
    var $ctrl = this;
    $ctrl.errors;

    // functions //
    $scope.handleRegBtnClick;

    ////////////////

    function handleRegBtnClick() {
      $auth
        .submitRegistration($scope.registrationForm)
        .then(function(res){
          $auth.submitLogin({
            email: $scope.registrationForm.email, 
            password: $scope.registrationForm.password
          });
        })
        .catch(function(res){
          $log.warn(res);
        });
    }

    $ctrl.$onInit = function() { 
      $scope.handleRegBtnClick = handleRegBtnClick;

      $rootScope.$on('auth:registration-email-success', function(){
        $state.go('snippetsIndex');
      });

      $rootScope.$on('auth:registration-email-error', function(ev, reason){
        $ctrl.errors = reason.errors.full_messages.filter(function(x){
          return x !== "Email has already been taken";
        });
      });
    };
    $ctrl.$onChanges = function(changesObj) { };
    $ctrl.$onDestroy = function() { };
  }
})();