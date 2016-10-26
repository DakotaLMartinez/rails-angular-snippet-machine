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
        id: '=',
      },
    });

  addSnippetButtonController.$inject = ['User', 'Snippet', '$log', '$state'];
  function addSnippetButtonController(User, Snippet, $log, $state) {
    var $ctrl = this;
    $ctrl.buttonText = "Add to My Snippets";
    $ctrl.showButton = false;
    $ctrl.editableSnippets;
    $ctrl.downloadableSnippets;

    $ctrl.addToSnippets;
    $ctrl.removeFromSnippets;

    ////////////////

    function updateUserPermissions() {
      if (User.loggedIn()) {
        User 
          .getCurrentUserPermissions()
          .then(function(res){
            $ctrl.editableSnippets = res.data.can_edit;
            $ctrl.downloadableSnippets = res.data.can_download;
            if(!$ctrl.editableSnippets[$ctrl.id]) {
              $ctrl.showButton = true;
              if($ctrl.downloadableSnippets[$ctrl.id]) {
                $ctrl.buttonText = "Remove From My Snippets";
              } 
            }
          });
      }
    }

    $ctrl.$onInit = function() { 
      updateUserPermissions();

      $ctrl.addOrRemoveFromSnippets = function(){
        var id = $ctrl.id;
        if ($ctrl.buttonText === "Add to My Snippets") {
          User 
            .addSnippet(id)
            .then(function(res){
              $log.log(res);
              $ctrl.buttonText = "Remove From My Snippets";
              updateUserPermissions();
            });
        } else {
          User
            .removeSnippet(id)
            .then(function(res){
              $log.log(res);
              $ctrl.buttonText = "Add to My Snippets";
              updateUserPermissions();
            });
        }
        $state.go('userProfile');
      }
      
      
    };
    $ctrl.$onChanges = function(changesObj) { 
      updateUserPermissions();
    };
    $ctrl.$onDestroy = function() { };
  }
})();