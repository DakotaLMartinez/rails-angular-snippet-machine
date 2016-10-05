(function() {
'use strict';

  angular
    .module('dlmSnippetMachine')
    .controller('SnippetNewController', SnippetNewController);

  SnippetNewController.$inject = ['Snippet', '$filter'];
  function SnippetNewController(Snippet, $filter) {
    var vm = this;
    var snippet = {}
    vm.name = "";
    vm.description = "";
    vm.language = "";
    vm.trigger = "";
    vm.body = "";
    

    activate();

    ////////////////

    function activate() { 
      vm.submitForm = submitForm;
      function submitForm(){
        snippet.name = vm.name;
        snippet.description = vm.description;
        snippet.language = vm.language;
        snippet.trigger = vm.trigger;
        snippet.body = vm.body;
        var data = $filter('json')(snippet);

        Snippet
          .createSnippet(data)
          .then(function(res){
            vm.response = res;
          })
      }
    }
  }
})();