(function() {
  'use strict';
  // Usage:
  //
  // Creates:
  //

  var vsCodeSnippet = {
    bindings: {
      id: '='
    },
    templateUrl: 'app/components/vsCodeSnippet/vsCodeSnippet.html',
    controller: vsCodeSnippetController,
    controllerAs: 'vm'
  };

  vsCodeSnippetController.$inject = ['visualStudioCodeFilter', 'Snippet']
  function vsCodeSnippetController (visualStudioCodeFilter, Snippet) {
    var vm = this;
    vm.snippet;
    vm.name; 
    vm.description;
    vm.trigger;
    vm.language;
    vm.body;

    /////////////////////////

    Snippet 
      .getSnippet(vm.id)
      .then(function(res){
        vm.snippet = res;
        vm.name = res.name;
        vm.description = res.description || "";
        vm.trigger = res.trigger;
        vm.language = res.language
        vm.body = visualStudioCodeFilter(res.body);
      })
  }

  angular
    .module('dlmSnippetMachine')
    .component('vsCodeSnippet', vsCodeSnippet);

})();