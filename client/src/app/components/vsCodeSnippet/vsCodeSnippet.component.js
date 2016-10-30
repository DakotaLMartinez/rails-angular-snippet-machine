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

  vsCodeSnippetController.$inject = ['Snippet']
  function vsCodeSnippetController (Snippet) {
    var vm = this;
    vm.snippet;

    /////////////////////////

    Snippet 
      .getSnippet(vm.id)
      .then(function(res){
        vm.snippet = res;
      });
  }

  angular
    .module('dlmSnippetMachine')
    .component('vsCodeSnippet', vsCodeSnippet);

})();