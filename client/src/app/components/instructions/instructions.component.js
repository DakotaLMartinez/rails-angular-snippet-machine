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
        user: '=',
        authorized: '='
      }
    });

  InstructionsController.$inject = ['$auth', 'getApiUrl', '$rootScope', 'Flash', 'pluralizeSnippetFilter', '$log'];
  function InstructionsController($auth, getApiUrl, $rootScope, Flash, pluralizeSnippetFilter, $log) {
    var $ctrl = this;
    $ctrl.uploadCount;
    $ctrl.authorizeDropboxLink;
    // $ctrl.user = $rootScope.user;
    $ctrl.loggedIn = $rootScope.user.signedIn || $ctrl.authorized;

    ////////////////

    $ctrl.$onInit = function() { 
      if ($ctrl.uploadCount) {
        var message = $ctrl.uploadCount + " new " + pluralizeSnippetFilter($ctrl.uploadCount) + " successfully uploaded to SnippetMachine from your Dropbox";
        Flash.create('success', message);
      }
      $ctrl.authorizeDropboxLink = getApiUrl.getUrl() + '/dropbox';
      $ctrl.loggedIn = $rootScope.user.signedIn || $ctrl.authorized;
      $log.log("logged in: " + $ctrl.loggedIn + " user: " + $ctrl.user);
      $log.log($ctrl.user);
    };
    $ctrl.$onChanges = function(changesObj) { };
    $ctrl.$onDestroy = function() { };
  }
})();