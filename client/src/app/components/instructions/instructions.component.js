(function() {
'use strict';

  // Usage:
  // 
  // Creates:
  // 

  angular
    .module('dlmSnippetMachine')
    .component('instructions', {
      templateUrl: 'app/components/instructions/instructions.html',
      controller: InstructionsController,
      bindings: {
        uploadCount: '=',
        authorized: '='
      }
    });

  InstructionsController.$inject = ['$auth', 'getApiUrl', '$rootScope', 'Flash', 'pluralizeSnippetFilter'];
  function InstructionsController($auth, getApiUrl, $rootScope, Flash, pluralizeSnippetFilter) {
    var $ctrl = this;
    $ctrl.uploadCount;
    $ctrl.authorizeDropboxLink;
    $ctrl.loggedIn = $rootScope.user.signedIn || $ctrl.authorized;

    ////////////////

    $ctrl.$onInit = function() { 
      if ($ctrl.uploadCount) {
        var message = $ctrl.uploadCount + " new " + pluralizeSnippetFilter($ctrl.uploadCount) + " successfully uploaded to SnippetMachine from your Dropbox";
        Flash.create('success', message);
      }
      $ctrl.authorizeDropboxLink = getApiUrl.getUrl() + '/dropbox';
      $ctrl.loggedIn = $rootScope.user.signedIn || $ctrl.authorized;
    };
    $ctrl.$onChanges = function(changesObj) { };
    $ctrl.$onDestroy = function() { };
  }
})();