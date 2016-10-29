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

  sublimeViewController.$inject = ['Snippet', 'Language', '$log'];
  function sublimeViewController(Snippet, Language, $log) {
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
      var snip = "<snippet>\n";
      snip += "\t<content><![CDATA[\n";
      snip += snippet.body + "\n";
      snip += "]]></content>\n";
      snip += "\t<tabTrigger>" + snippet.trigger + "</tabTrigger>\n";
      if (Language.getSublimeAbbreviation(snippet.language.name)) { 
        snip += "\t<scope>" + Language.getSublimeAbbreviation(snippet.language.name) + "</scope>\n"
      } else { 
        snip += "\t<!-- Optional: Set a scope to limit where the snippet will trigger -->\n"
        snip += "\t<!-- <scope>source.python</scope> -->\n"
      }   
      snip += "</snippet>"
      return snip;
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