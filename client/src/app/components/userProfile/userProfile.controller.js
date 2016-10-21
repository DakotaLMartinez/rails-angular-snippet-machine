(function() {
'use strict';

  angular
    .module('dlmSnippetMachine')
    .controller('UserProfileController', UserProfileController);

  UserProfileController.$inject = ['$rootScope', 'User'];
  function UserProfileController($rootScope, User) {
    var vm = this;
    vm.user = $rootScope.user;
  
    activate();

    ////////////////

    function activate() { 
      vm.saveSnippets = saveSnippets;

      function saveSnippets() {
        User.saveUserSnippets();
      }
    }
  }
})();