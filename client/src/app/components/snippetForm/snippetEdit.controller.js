(function() {
'use strict';

  angular
    .module('dlmSnippetMachine')
    .controller('SnippetEditController', SnippetEditController);

  SnippetEditController.$inject = ['Snippet', '$stateParams', '$filter', '$state', 'Language'];
  function SnippetEditController(Snippet, $stateParams, $filter, $state, Language) {
    var vm = this;
    vm.title = "Edit Snippet";
    var snippet = {};
    vm.id = $stateParams.id;
    vm.name = "";
    vm.description = "";
    vm.language = "";
    vm.languages = Language.listSupportedLanguages();
    vm.trigger = "";
    vm.body = "";

    activate();

    ////////////////

    function activate() { 
      Snippet
        .getSnippet(vm.id)
        .then(function(res){
          vm.snippet = res;
          vm.name = res.name;
          vm.description = res.description;
          vm.language = res.language; 
          vm.trigger = res.trigger; 
          vm.body = res.body;
        })

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
          .updateSnippet(vm.id, data)
          .then(updateSuccess, updateError);
          
        function updateSuccess(){
          $state.go('snippetShow', {id: vm.id});
        }
        function updateError(res){
          vm.errors = res;
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