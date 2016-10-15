(function() {
'use strict';

  angular
    .module('dlmSnippetMachine')
    .controller('UserProfileController', UserProfileController);

  UserProfileController.$inject = ['$rootScope'];
  function UserProfileController($rootScope) {
    var vm = this;
    vm.user = $rootScope.user;
  
    activate();

    ////////////////

    function activate() { 
      
    }
  }
})();