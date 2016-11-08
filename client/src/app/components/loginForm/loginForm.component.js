(function() {
'use strict';

  // Usage: Add <login-form> to an html template
  // 
  // Creates: a login form that authenticates a 
  // User and redirects to a specified state.

  angular
    .module('dlmSnippetMachine')
    .component('loginForm', {
      templateUrl: 'app/components/loginForm/loginForm.html',
      controller: LoginFormController,
    });

  LoginFormController.$inject = ['$auth', '$rootScope', '$state', '$log'];
  function LoginFormController($auth, $rootScope, $state, $log) {
    var $ctrl = this;
    $ctrl.errors;
    $ctrl.user = $rootScope.user
  
    // functions //
    $ctrl.handleLoginBtnClick;  

    ////////////////

    function handleLoginBtnClick(loginForm) {
      $auth
        .submitLogin(loginForm)
        .then(function(){
          $state.go('snippetsIndex');
        })
        .catch(function(res){
          $log.log(res);
          $ctrl.errors = res.errors;
        });
    }

    ////////////////

    $ctrl.$onInit = function() { 
      $ctrl.handleLoginBtnClick = handleLoginBtnClick;
    };
    $ctrl.$onChanges = function(changesObj) { };
    $ctrl.$onDestroy = function() { };
  }
})();