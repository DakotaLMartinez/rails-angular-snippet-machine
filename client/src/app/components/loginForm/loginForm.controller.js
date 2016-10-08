(function() {
'use strict';

  angular
    .module('dlmSnippetMachine')
    .controller('loginFormController', loginFormController);

  loginFormController.$inject = ['$auth', '$rootScope', '$state', '$scope'];
  function loginFormController($auth, $rootScope, $state, $scope) {
    var vm = this;
    vm.logOut;
    vm.error;


    activate();

    ////////////////

    function activate() {
      vm.signOut = function() {
        $rootScope.signOut();
      }

      $rootScope.$on('auth:login-success', function(){
        $state.go('snippetsIndex');
      });

      $rootScope.$on('auth:logout-success', function(){
        $state.go('signIn');
      });

      $scope.$on('auth:login-error', function(ev, reason){
        vm.error = reason.errors[0];
      });

    }
  }
})();