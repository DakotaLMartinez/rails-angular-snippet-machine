(function() {
'use strict';

  angular
    .module('dlmSnippetMachine')
    .controller('loginFormController', loginFormController);

  loginFormController.$inject = ['$auth', '$rootScope', '$state'];
  function loginFormController($auth, $rootScope, $state) {
    var vm = this;
    vm.logOut;


    activate();

    ////////////////

    function activate() {
      vm.signOut = function() {
        $rootScope.signOut();
      }

      $rootScope.$on('auth:login-success', function(ev, user){
        $state.go('snippetsIndex');
      });

      $rootScope.$on('auth:logout-success', function(){
        $state.go('signIn');
      });

    }
  }
})();