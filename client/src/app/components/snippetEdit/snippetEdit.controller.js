(function() {
'use strict';

  angular
    .module('dlmSnippetMachine')
    .controller('SnippetEditController', SnippetEditController);

  SnippetEditController.$inject = ['Snippet', '$stateParams'];
  function SnippetEditController(Snippet, $stateParams) {
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