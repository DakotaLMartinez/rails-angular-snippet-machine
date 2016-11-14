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
        uploadCount: '='
      }
    });

  InstructionsController.$inject = ['$auth', 'getApiUrl', '$rootScope', 'Flash'];
  function InstructionsController($auth, getApiUrl, $rootScope, Flash) {
    var $ctrl = this;
    $ctrl.uploadCount;
    $ctrl.authorizeDropboxLink;
    $ctrl.user = $rootScope.user;

    ////////////////

    function pluralizeSnippet(uploadCount) {
      if (uploadCount === 1) {
        return "snippet";
      } else {
        return "snippets";
      }
    }

    $ctrl.$onInit = function() { 
      if ($ctrl.uploadCount) {
        var message = $ctrl.uploadCount + " new " + pluralizeSnippet($ctrl.uploadCount) + " successfully uploaded to SnippetMachine from your Dropbox";
        Flash.create('success', message);
      }
      $ctrl.authorizeDropboxLink = getApiUrl.getUrl() + '/dropbox';
    };
    $ctrl.$onChanges = function(changesObj) { };
    $ctrl.$onDestroy = function() { };
  }
})();