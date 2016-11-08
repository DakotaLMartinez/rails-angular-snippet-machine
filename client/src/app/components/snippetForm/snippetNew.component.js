(function() {
'use strict';

  // Usage:
  // 
  // Creates:
  // 

  angular
    .module('dlmSnippetMachine')
    .component('snippetNew', {
      templateUrl: 'app/components/snippetForm/snippetForm.html',
      controller: SnippetNewController
    });

  SnippetNewController.$inject = ['Snippet', 'Language', 'User', '$filter', 'sublimeTextFilter', 'visualStudioCodeFilter', '$state'];
  function SnippetNewController(Snippet, Language, User, $filter, sublimeTextFilter, visualStudioCodeFilter, $state) {
    var $ctrl = this;
    $ctrl.title = "New Snippet";
    $ctrl.languages = Language.listSupportedLanguages();
    $ctrl.snippet = {
      name: "", 
      description: "", 
      language: "", 
      trigger: "", 
      body: ""
    }
    $ctrl.submitForm = submitForm;
    $ctrl.errors = {};

    ////////////////

    function submitForm() {
      var snippet = {};
      snippet.name = $ctrl.snippet.name;
      snippet.description = $ctrl.snippet.description;
      snippet.language = $ctrl.snippet.language;
      snippet.trigger = $ctrl.snippet.trigger; 
      snippet.body = $ctrl.snippet.body;
      var data = $filter('json')(snippet);
      createSnippet(data);
    }

    function createSnippet(data) {
      Snippet
        .createSnippet(data)
        .then(handleSuccess, handleError)
      
      function handleSuccess(res) {
        User.clearCachedPermissions();
        $state.go('snippetShow', {id: res.id});
        $ctrl.errors = {};
      }

      function handleError(res){
        $ctrl.errors = res.data; 
      }
    }

    /////////////////

    $ctrl.$onInit = function() { 
    };
    $ctrl.$onChanges = function(changesObj) { };
    $ctrl.$onDestroy = function() { };
  }
})();