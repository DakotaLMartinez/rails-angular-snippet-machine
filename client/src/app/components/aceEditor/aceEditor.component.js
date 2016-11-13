(function() {
  'use strict';
  // Usage:
  //
  // Creates:
  //

  var Editor = {
    bindings: {
      language: '=', 
      body: '=', 
      size: '<'
    },
    templateUrl: 'app/components/aceEditor/aceEditor.html',
    controller: EditorController,
    controllerAs: 'vm'
  };

  EditorController.$inject = ['visualStudioCodeFilter', '$scope']
  function EditorController (visualStudioCodeFilter, $scope) {
    var vm = this;
    vm.mode = vm.language || 'javascript';
    $scope.editorSize = setEditorSize();
    $scope.aceLoaded = function (_editor) {
      // This is to remove following warning message on console:
      // Automatically scrolling cursor into view after selection change this will be disabled in the next version
      // set editor.$blockScrolling = Infinity to disable this message
      _editor.$blockScrolling = Infinity;
    }
    
    
    /////////////////////

    function setEditorSize() {
      if(!isNaN(parseFloat(vm.size)) && isFinite(vm.size)) {
        var sizeInPixels = String(Math.floor(vm.size)) + 'px';
        
        return {height: sizeInPixels};
      } else {
        return {};
      }
    }

  }

  angular
    .module('dlmSnippetMachine')
    .component('aceEditor', Editor);

})();