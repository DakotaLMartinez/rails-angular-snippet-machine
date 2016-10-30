(function() {
'use strict';

  // Usage:
  // 
  // Creates:
  // 

  angular
    .module('dlmSnippetMachine')
    .component('sublime', {
      templateUrl: 'app/components/sublimeView/sublimeView.html',
      controller: sublimeViewController,
      bindings: {
        snippetId: '=',
      },
    });

  sublimeViewController.$inject = ['Snippet', 'Language', '$log', 'sublimeTextFilter'];
  function sublimeViewController(Snippet, Language, $log, sublimeTextFilter) {
    var $ctrl = this;
    $ctrl.languageName;
    $ctrl.snippet;
    $ctrl.sublimeSnippet;

    ////////////////

    function getSnippet(id) {
      Snippet
        .getSnippet(id)
        .then(handleSuccess, handleError)
        
      function handleSuccess(res) {
        $ctrl.languageName = Language.getSublimeAbbreviation(res.language.name);
        $ctrl.snippet = res;
        $ctrl.sublimeSnippet = sublimeSnippet(res);
        $ctrl.errors = {};
      }
  
      function handleError(res){
        $ctrl.errors = res;
      }
    } 

    function sublimeSnippet(snippet) {
      return sublimeTextFilter(snippet);
    }

    $ctrl.$onInit = function() {
      if ($ctrl.snippetId) {
        getSnippet($ctrl.snippetId)
      }
    };
    $ctrl.$onChanges = function(changesObj) { };
    $ctrl.$onDestroy = function() { };
  }
})();