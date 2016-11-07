(function() {
'use strict';

  // Usage:
  // 
  // Creates:
  // 

  angular
    .module('dlmSnippetMachine')
    .component('snippetEdit', {
      // template:'htmlTemplate',
      templateUrl: 'app/components/snippetForm/snippetForm.html',
      controller: SnippetEditController,
      bindings: {
        
      },
    });

  SnippetEditController.$inject = ['Snippet', 'Language', '$stateParams', '$filter', '$state'];
  function SnippetEditController(Snippet, Language, $stateParams, $filter, $state) {
    var $ctrl = this;
    $ctrl.title = "Edit Snippet";
    var snippet = {};
    $ctrl.id = $stateParams.id;
    $ctrl.snippet = {
      name: "", 
      description: "", 
      language: "", 
      trigger: "", 
      body: ""
    }
    $ctrl.languages = Language.listSupportedLanguages();

    // functions //
    $ctrl.submitForm;

    ////////////////

    function getUserSnippets(id) {
      Snippet 
        .getSnippet(id)
        .then(handleSuccess, handleError)
      
      function handleSuccess(res) {
        $ctrl.snippet.name = res.name;
        $ctrl.snippet.description = res.description;
        $ctrl.snippet.language = res.language.name; 
        $ctrl.snippet.trigger = res.trigger; 
        $ctrl.snippet.body = res.body;
        $ctrl.errors = {};
      }

      function handleError(res){
        $ctrl.errors = res;
      }
    }

    function submitForm(){
      snippet.name = $ctrl.snippet.name;
      snippet.description = $ctrl.snippet.description;
      snippet.language = $ctrl.snippet.language;
      snippet.trigger = $ctrl.snippet.trigger;
      snippet.body = $ctrl.snippet.body;
      var data = $filter('json')(snippet);

      Snippet
        .updateSnippet($ctrl.id, data)
        .then(updateSuccess, updateError);
        
      function updateSuccess(){
        $state.go('snippetShow', {id: $ctrl.id});
      }
      function updateError(res){
        $ctrl.errors = res.data;
      }
    }
    
    $ctrl.$onInit = function() { 
      getUserSnippets($ctrl.id);
      $ctrl.submitForm = submitForm;
    };
    $ctrl.$onChanges = function(changesObj) { };
    $ctrl.$onDestroy = function() { };
  }
})();