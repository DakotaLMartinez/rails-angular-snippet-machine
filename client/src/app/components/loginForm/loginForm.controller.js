(function() {
'use strict';

  angular
    .module('dlmSnippetMachine')
    .controller('loginFormController', loginFormController);

  loginFormController.$inject = ['$auth', '$rootScope', '$state', '$scope', 'Session'];
  function loginFormController($auth, $rootScope, $state, $scope, Session) {
    var vm = this;
    vm.signOut;
    vm.error;

    // See index.run.js for details of login/logout redirects

    activate();

    ////////////////

    function activate() {
      vm.signOut = function() {
        $state.go('snippetsIndex');
        Session.endSession();
        $rootScope.signOut();
      }

      $rootScope.$on('auth:login-success', function(ev){
        Session.setCurrentUser(ev.targetScope.user);
        $state.go('snippetsIndex');
      }); 

      $scope.$on('auth:login-error', function(ev, reason){
        vm.error = reason.errors[0];
      });

    }
  }
})();