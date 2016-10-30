(function() {
'use strict';

  angular
    .module('dlmSnippetMachine')
    .controller('SnippetNewController', SnippetNewController);

  SnippetNewController.$inject = ['Snippet', '$filter', '$state', 'Language', 'sublimeTextFilter', 'visualStudioCodeFilter'];
  function SnippetNewController(Snippet, $filter, $state, Language, sublimeTextFilter, visualStudioCodeFilter) {
    var vm = this;
    vm.title = "New Snippet";
    var snippet = {}
    vm.snippet = {};
    vm.snippet.name = "";
    vm.snippet.description = "";
    vm.snippet.language = "";
    vm.snippet.languages = Language.listSupportedLanguages();
    vm.snippet.trigger = "";
    vm.snippet.body = "";
    vm.visualStudioCodeBody = visualStudioCodeFilter(vm.snippet.body);
    vm.sublimeSnippet = sublimeTextFilter(vm.snippet);
    
    

    activate();

    ////////////////

    function activate() { 
      vm.submitForm = submitForm;
      vm.errors = {};

      function submitForm(){
        snippet.name = vm.snippet.name;
        snippet.description = vm.snippet.description;
        snippet.language = vm.snippet.language;
        snippet.trigger = vm.snippet.trigger;
        snippet.body = vm.snippet.body;
        var data = $filter('json')(snippet);

        Snippet
          .createSnippet(data)
          .then(createSuccess, createError);

        function createSuccess(res){
          $state.go('snippetShow', {id: res.id});
        }

        function createError(res){
          vm.errors = res.data;
          console.log(res.data);
        }

      }
    }
  }
})();