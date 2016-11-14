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
        uploadCount: '='
      }
    });

  UserProfileController.$inject = ['$rootScope', 'User', 'pluralizeSnippetFilter', 'Flash'];
  function UserProfileController($rootScope, User, pluralizeSnippetFilter, Flash) {
    var $ctrl = this;
    $ctrl.user = $rootScope.user;
    $ctrl.saveUserSnippets;
    $ctrl.uploadCount;

    ////////////////

    $ctrl.$onInit = function() { 
      $ctrl.saveUserSnippets = function saveUserSnippets() {
        User.saveUserSnippets();
      }
      if ($ctrl.uploadCount) {
        var message = $ctrl.uploadCount + " new " + pluralizeSnippetFilter($ctrl.uploadCount) + " successfully uploaded to SnippetMachine from your Dropbox";
        Flash.create('success', message);
      }
    };
    $ctrl.$onChanges = function(changesObj) { 
    };
    $ctrl.$onDestroy = function() { };
  }
})();