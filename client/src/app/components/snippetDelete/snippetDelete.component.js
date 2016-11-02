(function() {
'use strict';

  // Usage:
  // 
  // Creates:
  // 

  angular
    .module('dlmSnippetMachine')
    .component('snippetDeleteButton', {
      templateUrl: 'app/components/snippetDelete/snippetDelete.html',
      controller: snippetDeleteController,
      bindings: {
        id: '=',
      },
    });

  snippetDeleteController.$inject = ['Snippet', '$state', 'Flash', 'User', '$log'];
  function snippetDeleteController(Snippet, $state, Flash, User, $log) {
    var $ctrl = this;
    $ctrl.id;
    $ctrl.showButton = false;
    $ctrl.errors = {};
    $ctrl.message = "";
    $ctrl.deleteSnippet = deleteSnippet;

    ////////////////

    function deleteSnippet(id) {
      Snippet
        .deleteSnippet(id)
        .then(handleSuccess, handleError);

        function handleSuccess() {
          $ctrl.message = "Snippet Successfully Deleted";
          $ctrl.errors = {};
          Flash.create('success', $ctrl.message);
          $state.go('snippetsIndex');
        }

        function handleError() {
          $ctrl.errors = res.data;
        }
    }

    function updatePermissions() {
      User 
        .getCurrentUserPermissions()
        .then(function(res){
          var can_edit = res.data.can_edit;
          if (can_edit[$ctrl.id]) {
            $ctrl.showButton = true;
          }
        }).catch(function(res){
          $log.warn(res);
        })
    }

    $ctrl.$onInit = function() { 
      if (User.loggedIn()) {
        updatePermissions();
      }
    };
    $ctrl.$onChanges = function(changesObj) { 
      if (User.loggedIn()) {
        updatePermissions();
      }
    };
    $ctrl.$onDestroy = function() { };
  }
})();