(function() {
  'use strict';
  // Usage:
  //
  // Creates:
  //

  var Editor = {
    bindings: {
      language: '=', 
      body: '='
    },
    templateUrl: 'app/components/aceEditor/aceEditor.html',
    controller: EditorController,
    controllerAs: 'vm'
  };

  EditorController.$inject = ['visualStudioCodeFilter', '$scope']
  function EditorController (visualStudioCodeFilter, $scope) {
    var vm = this;
    vm.mode = vm.language || 'html';
  }

  angular
    .module('dlmSnippetMachine')
    .component('aceEditor', Editor);

})();