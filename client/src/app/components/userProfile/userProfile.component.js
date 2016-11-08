(function() {
'use strict';

  // Usage:
  // 
  // Creates:
  // 

  angular
    .module('dlmSnippetMachine')
    .component('userProfile', {
      // template:'htmlTemplate',
      templateUrl: 'app/components/userProfile/userProfile.html',
      controller: UserProfileController
    });

  UserProfileController.$inject = ['$rootScope', 'User'];
  function UserProfileController($rootScope, User) {
    var $ctrl = this;
    $ctrl.user = $rootScope.user;
    $ctrl.saveUserSnippets;

    ////////////////

    $ctrl.$onInit = function() { 
      $ctrl.saveUserSnippets = function saveUserSnippets() {
        User.saveUserSnippets();
      }
    };
    $ctrl.$onChanges = function(changesObj) { 
    };
    $ctrl.$onDestroy = function() { };
  }
})();