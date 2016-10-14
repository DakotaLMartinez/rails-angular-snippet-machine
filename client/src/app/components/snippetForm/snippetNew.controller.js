(function() {
'use strict';

  angular
    .module('dlmSnippetMachine')
    .controller('SnippetNewController', SnippetNewController);

  SnippetNewController.$inject = ['Snippet', '$filter', '$state'];
  function SnippetNewController(Snippet, $filter, $state) {
    var vm = this;
    vm.title = "New Snippet";
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
      vm.errors = {};

      function submitForm(){
        snippet.name = vm.name;
        snippet.description = vm.description;
        snippet.language = vm.language;
        snippet.trigger = vm.trigger;
        snippet.body = vm.body;
        var data = $filter('json')(snippet);

        Snippet
          .createSnippet(data)
          .then(createSuccess, createError);

        function createSuccess(){
          $state.go('snippetShow', {id: res.id});
        }

        function createError(res){
          vm.errors.name = res.data.name;
          vm.errors.description = res.data.description;
          vm.errors.language = res.data.language;
          vm.errors.trigger = res.data.trigger;
          vm.errors.body = res.data.body;
        }

      }
    }
  }
})();