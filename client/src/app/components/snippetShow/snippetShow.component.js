(function() {
'use strict';

  // Usage:
  // 
  // Creates:
  // 

  angular
    .module('dlmSnippetMachine')
    .component('snippetShow', {
      // template:'htmlTemplate',
      templateUrl: 'app/components/snippetShow/snippetShow.html',
      controller: SnippetShowController,
      bindings: {
        id: '=',
      }
    });

  SnippetShowController.$inject = ['Snippet', '$rootScope', '$state', 'Flash', '$log'];
  function SnippetShowController(Snippet, $rootScope, $state, Flash, $log) {
    var $ctrl = this;
    $ctrl.snippet;
    $ctrl.id
    $ctrl.showDeleteButton = false;
    $ctrl.currentUser = $rootScope.user;

    ////////////////

    function getSnippet(id) {
      Snippet
        .getSnippet(id)
        .then(handleSuccess, handleError)
      
      function handleSuccess(res) {
        $ctrl.snippet = res;
        $ctrl.errors = {};
        if ($ctrl.currentUser && $ctrl.snippet.user_id === $ctrl.currentUser.id) {
          $ctrl.showDeleteButton = true;
        } else {
          $ctrl.showDeleteButton = false;
        }
      }

      function handleError(res){
        $ctrl.errors = res;
        Flash.create('danger', 'Snippet not found');
        $state.go('snippetsIndex');
      }
    }

    $ctrl.$onInit = function() { 
      getSnippet($ctrl.id);
    };
    $ctrl.$onChanges = function(changesObj) { };
    $ctrl.$onDestory = function() { };
  }
})();