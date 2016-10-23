(function() {
'use strict';

  angular
    .module('dlmSnippetMachine')
    .controller('InstructionsController', InstructionsController);

  InstructionsController.$inject = ['$auth'];
  function InstructionsController($auth) {
    var vm = this;
    

    activate();

    ////////////////

    function activate() { 
      vm.authenticateWithDropbox = function() {
        $auth.authenticate('dropbox')
      };

    }
  }
})();