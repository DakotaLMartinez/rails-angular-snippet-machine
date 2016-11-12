(function() {
'use strict';

  // Usage:
  // 
  // Creates:
  // 

  angular
    .module('dlmSnippetMachine')
    .component('addSnippetButton', {
      templateUrl: 'app/components/addSnippetButton/addSnippetButton.html',
      controller: addSnippetButtonController,
      bindings: {
        id: '=',
      },
    });

  addSnippetButtonController.$inject = ['User', 'Snippet', '$log', '$state'];
  function addSnippetButtonController(User, Snippet, $log, $state) {
    var $ctrl = this;
    $ctrl.starActive = "";
    $ctrl.buttonText = "Add";
    $ctrl.added = false;
    $ctrl.showButton = false;
    $ctrl.editableSnippets;
    $ctrl.downloadableSnippets;
    $ctrl.userCount;

    $ctrl.addToSnippets;
    $ctrl.removeFromSnippets;

    ////////////////

    $ctrl.$onInit = function() { 
      updateUserPermissions();

      getSnippetUserCount();

      $ctrl.addOrRemoveFromSnippets = function(){
        var id = $ctrl.id;
        if (!$ctrl.editableSnippets[id]) {
          if (!$ctrl.added) {
            $ctrl.added = true;
            User 
              .addSnippet(id)
              .then(function(res){
                $log.log(res);
                var hasSnippet = res.data;
                updateButtonText(hasSnippet);
                updateSnippetUserCount(hasSnippet);
                updateStarClass(hasSnippet);
                // updateUserPermissions();
              })
              .catch(function(res){
                alert(res.data[0]);
                $log.log(res);
                $ctrl.added = false;
              });
          } else {
            $ctrl.added = false;
            User
              .removeSnippet(id)
              .then(function(res){
                $log.log(res);
                var hasSnippet = res.data;
                updateButtonText(hasSnippet);
                updateSnippetUserCount(hasSnippet);
                updateStarClass(hasSnippet);
                // updateUserPermissions();
              })
              .catch(function(res){
                $log.log(res);
                $ctrl.added = true;
              });
          }
        }
      }
      
      
    };
    $ctrl.$onChanges = function(changesObj) { 
      updateUserPermissions();
    };
    $ctrl.$onDestroy = function() { };

    ////////////////////////////////////

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
                $ctrl.buttonText = "Remove";
                $ctrl.added = true;
                $ctrl.starActive = "star-active";
              } 
            }
          });
      }
    }

    function updateButtonText(hasSnippet) {
      if (hasSnippet) {
        $ctrl.buttonText = "Remove";
      } else {
        $ctrl.buttonText = "Add";
      }
    }

    function getSnippetUserCount() {
      if ($ctrl.id) {
        Snippet 
          .getSnippet($ctrl.id)
          .then(function(res) {
            $ctrl.userCount = res.user_snippets_count;
          });
      } else {
        $log.warn("getSnippetUserCount must be given an id");
      }
    }

    function updateSnippetUserCount(hasSnippet) {
      if (hasSnippet) {
        $ctrl.userCount++;
      } else {
        $ctrl.userCount--;
      }
    }

    function updateStarClass(hasSnippet) {
      if (hasSnippet) {
        $ctrl.starActive = "star-active";
      } else {
        $ctrl.starActive = "";
      }
    }

    
  }
})();