(function() {
'use strict';

  // Usage:
  // 
  // Creates:
  // 

  angular
    .module('dlmSnippetMachine')
    .component('addSnippetButton', {
      // template:'htmlTemplate',
      templateUrl: 'app/components/addSnippetButton/addSnippetButton.html',
      controller: addSnippetButtonController,
      bindings: {
        snippetId: '=',
      },
    });

  addSnippetButtonController.$inject = ['User', 'Snippet', '$log'];
  function addSnippetButtonController(User, Snippet, $log) {
    var $ctrl = this;
    $ctrl.buttonText = "Add to My Snippets";
    $ctrl.showButton = false;
    $ctrl.editableSnippets;
    $ctrl.downloadableSnippets;

    $ctrl.addToSnippets;
    $ctrl.removeFromSnippets;

    ////////////////

    $ctrl.$onInit = function() { 
      User 
        .getCurrentUserPermissions()
        .then(function(res){
          $ctrl.editableSnippets = res.data.can_edit;
          $ctrl.downloadableSnippets = res.data.can_download
          if(!$ctrl.editableSnippets[$ctrl.snippetId]) {
            $ctrl.showButton = true;
            if($ctrl.downloadableSnippets[$ctrl.snippetId]) {
              $ctrl.buttonText = "Remove From My Snippets";
            } 
          }
        });

      $ctrl.addToSnippets = function(){
        var id = $ctrl.snippetId;
        User 
          .addSnippet(id)
          .then(function(res){
            $log.log(res);
            $ctrl.buttonText = "Remove From My Snippets"
          });
      }
      
      
    };
    $ctrl.$onChanges = function(changesObj) { };
    $ctrl.$onDestroy = function() { };
  }
})();