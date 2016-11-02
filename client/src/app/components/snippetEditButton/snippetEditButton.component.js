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
          .getCurrentUserPermissions()
          .then(function(res){
            var can_edit = res.data.can_edit;
            if (can_edit[id]) {
              $ctrl.showButton = true;
            } else {
              $ctrl.showButton = false;
            }
          })
          .catch(function(res){
            $log.warn(res);
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