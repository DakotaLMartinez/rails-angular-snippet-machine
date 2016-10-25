(function() {
'use strict';

  // Usage:
  // 
  // Creates:
  // 

  angular
    .module('dlmSnippetMachine')
    .component('snippetEditButton', {
      // template:'htmlTemplate',
      templateUrl: 'app/components/snippetEditButton/snippetEditButton.html',
      controller: snippetEditButtonController,
      bindings: {
        id: '='
      }
    });

  snippetEditButtonController.$inject = ['User'];
  function snippetEditButtonController(User) {
    var $ctrl = this;
    $ctrl.showButton = false;
    $ctrl.id;

    ////////////////

    function updatePermissions() {
      if (User.loggedIn()) {
        var id = $ctrl.id
        User 
          .currentUserCanEditSnippet(id)
          .then(function(res){
            if (res === true) {
              $ctrl.showButton = true;
            } else {
              $ctrl.showButton = false;
            }
          })
          .catch(function(res){
            $log.log(res);
          })
      }
    }

    $ctrl.$onInit = function() { 
      updatePermissions();
    };
    $ctrl.$onChanges = function() { 
      updatePermissions();
    };
    $ctrl.$onDestory = function() { };
  }
})();