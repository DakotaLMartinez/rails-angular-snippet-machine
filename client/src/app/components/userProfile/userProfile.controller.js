(function() {
'use strict';

  angular
    .module('dlmSnippetMachine')
    .controller('UserProfileController', UserProfileController);

  UserProfileController.$inject = ['User', '$rootScope', '$state'];
  function UserProfileController(User, $rootScope, $state) {
    var vm = this;
    vm.user = $rootScope.user;
  
    activate();

    ////////////////

    function activate() { 
      
    }
  }
})();