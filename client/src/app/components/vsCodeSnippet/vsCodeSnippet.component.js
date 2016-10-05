(function() {
  'use strict';
  // Usage:
  //
  // Creates:
  //

  var vsCodeSnippet = {
    bindings: {
      snippetId: '=',
      snippet: '='
    },
    templateUrl: 'app/components/vsCodeSnippet/vsCodeSnippet.html',
    controller: vsCodeSnippetController,
    controllerAs: 'vm'
  };

  vsCodeSnippetController.$inject = ['visualStudioCodeFilter']
  function vsCodeSnippetController (visualStudioCodeFilter) {
    var vm = this;
    vm.name; 
    vm.description;
    vm.trigger;
    vm.language;
    vm.body;

    /////////////////////////

    vm.name = vm.snippet.name;
    vm.description = vm.snippet.description || "";
    vm.trigger = vm.snippet.trigger;
    vm.body = visualStudioCodeFilter(vm.snippet.body);
  }

  angular
    .module('dlmSnippetMachine')
    .component('vsCodeSnippet', vsCodeSnippet);

})();