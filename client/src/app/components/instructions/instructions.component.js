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
    });

  InstructionsController.$inject = ['$auth', 'getApiUrl', '$rootScope'];
  function InstructionsController($auth, getApiUrl, $rootScope) {
    var $ctrl = this;
    // $ctrl.authenticateWithDropbox;
    $ctrl.authorizeDropboxLink;
    $ctrl.user = $rootScope.user;

    ////////////////

    $ctrl.$onInit = function() { 
      // $ctrl.authenticateWithDropbox = function() {
      //   $auth.authenticate('dropbox')
      // };
      $ctrl.authorizeDropboxLink = getApiUrl.getUrl() + '/dropbox';
    };
    $ctrl.$onChanges = function(changesObj) { };
    $ctrl.$onDestroy = function() { };
  }
})();