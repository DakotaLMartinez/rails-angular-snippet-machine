(function() {
'use strict';

  angular
    .module('dlmSnippetMachine')
    .controller('SnippetEditController', SnippetEditController);

  SnippetEditController.$inject = ['Snippet', '$stateParams', '$filter'];
  function SnippetEditController(Snippet, $stateParams, $filter) {
    var vm = this;
    vm.title = "Edit Snippet";
    var snippet = {};
    vm.id = $stateParams.id;
    vm.name = "";
    vm.description = "";
    vm.language = "";
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
      
      function submitForm(){
        snippet.name = vm.name;
        snippet.description = vm.description;
        snippet.language = vm.language;
        snippet.trigger = vm.trigger;
        snippet.body = vm.body;
        var data = $filter('json')(snippet);

        Snippet
          .updateSnippet(vm.id, data)
          .then(function(res){
            vm.response = res;
          })
      }
    }
  }
})();