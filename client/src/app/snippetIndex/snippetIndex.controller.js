(function() {
'use strict';

  angular
    .module('dlmSnippetMachine')
    .controller('SnippetIndexController', SnippetIndexController);

  SnippetIndexController.$inject = ['Snippet'];
  function SnippetIndexController(Snippet) {
    var vm = this;
    vm.snippets;

    activate();

    ////////////////

    function activate() { 
      Snippet
        .getSnippets()
        .then(function(res){
          vm.snippets = res;
          console.log(vm.snippets);
        });
      
    }
  }
})();