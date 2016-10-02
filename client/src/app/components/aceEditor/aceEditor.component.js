(function() {
  'use strict';
  // Usage:
  //
  // Creates:
  //

  var Editor = {
    bindings: {
      language: '='
    },
    templateUrl: 'app/components/aceEditor/aceEditor.html',
    controller: EditorController,
    controllerAs: 'vm'
  };

  EditorController.$inject = ['visualStudioCodeFilter', '$scope']
  function EditorController (visualStudioCodeFilter, $scope) {
    
  }

  angular
    .module('dlmSnippetMachine')
    .component('aceEditor', Editor);

})();