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

  InstructionsController.$inject = ['$auth'];
  function InstructionsController($auth) {
    var $ctrl = this;
    $ctrl.authenticateWithDropbox;

    ////////////////

    $ctrl.$onInit = function() { 
      $ctrl.authenticateWithDropbox = function() {
        $auth.authenticate('dropbox')
      };
    };
    $ctrl.$onChanges = function(changesObj) { };
    $ctrl.$onDestroy = function() { };
  }
})();