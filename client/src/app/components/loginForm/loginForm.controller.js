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

    // See index.run.js for details of login/logout redirects

    activate();

    ////////////////

    function activate() {
      vm.signOut = function() {
        $state.go('snippetsIndex');
        $rootScope.signOut();
      }

      $rootScope.$on('auth:login-success', function(){
        $state.go('snippetsIndex');
      }); 

      $scope.$on('auth:login-error', function(ev, reason){
        vm.error = reason.errors[0];
      });

    }
  }
})();