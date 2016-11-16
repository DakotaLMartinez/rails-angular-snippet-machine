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
      controller: UserProfileController,
      bindings: {
        uploadCount: '=', 
        user: '='
      }
    });

  UserProfileController.$inject = ['$rootScope', 'User', 'pluralizeSnippetFilter', 'Flash', '$timeout'];
  function UserProfileController($rootScope, User, pluralizeSnippetFilter, Flash, $timeout) {
    var $ctrl = this;
    $ctrl.user = $ctrl.user || $rootScope.user;
    $ctrl.saveUserSnippets;
    $ctrl.uploadCount;

    ////////////////

    function loadUser() {
      $ctrl.user = $ctrl.user || $rootScope.user;
    }
    $ctrl.$onInit = function() { 
      $ctrl.saveUserSnippets = function saveUserSnippets() {
        User.saveUserSnippets();
      }
      if ($ctrl.uploadCount) {
        var message = $ctrl.uploadCount + " new " + pluralizeSnippetFilter($ctrl.uploadCount) + " successfully uploaded to SnippetMachine from your Dropbox";
        Flash.create('success', message);
      }
      $timeout(loadUser, 700);
    };
    $ctrl.$onChanges = function(changesObj) { 
    };
    $ctrl.$onDestroy = function() { };
  }
})();