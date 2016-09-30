(function() {
'use strict';

  angular
    .module('dlmSnippetMachine')
    .controller('SnippetShowController', SnippetShowController);

  SnippetShowController.$inject = ['Snippet', '$stateParams'];
  function SnippetShowController(Snippet, $stateParams) {
    var vm = this;
    vm.snippet;
    vm.id = $stateParams.id;

    activate();

    ////////////////

    function activate() { 
      Snippet
        .getSnippet(vm.id)
        .then(function(res){
          vm.snippet = res;
        })
    }
  }
})();