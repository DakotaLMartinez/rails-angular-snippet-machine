(function() {
'use strict';

  angular
    .module('dlmSnippetMachine')
    .controller('SnippetIndexController', SnippetIndexController);

  SnippetIndexController.$inject = ['Snippet'];
  function SnippetIndexController(Snippet) {
    var vm = this;
    vm.snippets = [];

    activate();

    ////////////////

    function activate() { 
      function getSnippets() {
        Snippet
          .getSnippets()
          .then(function(res){
            vm.snippets = res;
          });
      }
      
      getSnippets();
    }
  }
})();