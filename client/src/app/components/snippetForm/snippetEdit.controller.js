(function() {
'use strict';

  angular
    .module('dlmSnippetMachine')
    .controller('SnippetEditController', SnippetEditController);

  SnippetEditController.$inject = ['Snippet', '$stateParams', '$filter', '$state', 'Language', 'visualStudioCodeFilter', 'sublimeTextFilter'];
  function SnippetEditController(Snippet, $stateParams, $filter, $state, Language, visualStudioCodeFilter, sublimeTextFilter) {
    var vm = this;
    vm.title = "Edit Snippet";
    var snippet = {};
    vm.snippet = {};
    vm.id = $stateParams.id;
    vm.snippet.name = "";
    vm.snippet.description = "";
    vm.snippet.language = "";
    vm.snippet.languages = Language.listSupportedLanguages();
    vm.snippet.trigger = "";
    vm.snippet.body = "";
    // vm.visualStudioCodeBody = visualStudioCodeFilter(vm.snippet.body);
    // vm.sublimeSnippet = sublimeTextFilter(vm.snippet);

    activate();

    ////////////////

    function activate() { 
      Snippet
        .getSnippet(vm.id)
        .then(function(res){
          vm.snippet = res;
          vm.snippet.name = res.name;
          vm.snippet.description = res.description;
          vm.snippet.language = res.language.name; 
          vm.snippet.trigger = res.trigger; 
          vm.snippet.body = res.body;
          // vm.visualStudioCodeBody = visualStudioCodeFilter(vm.snippet);
          // vm.sublimeSnippet = sublimeTextFilter(vm.snippet);
        })

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
          .updateSnippet(vm.id, data)
          .then(updateSuccess, updateError);
          
        function updateSuccess(){
          $state.go('snippetShow', {id: vm.id});
        }
        function updateError(res){
          vm.errors = res.data;
        }
      }
    }
  }
})();