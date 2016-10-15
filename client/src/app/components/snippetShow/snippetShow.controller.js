(function() {
'use strict';

  angular
    .module('dlmSnippetMachine')
    .controller('SnippetShowController', SnippetShowController);

  SnippetShowController.$inject = ['Snippet', '$stateParams', 'Session', '$state', 'Flash'];
  function SnippetShowController(Snippet, $stateParams, Session, $state, Flash) {
    var vm = this;
    vm.snippet;
    vm.id = $stateParams.id;
    vm.showDeleteButton;
    vm.currentUser = Session.getCurrentUser();

    activate();

    ////////////////

    function activate() { 
      getSnippet(vm.id);

      function getSnippet(id) {
        Snippet
          .getSnippet(id)
          .then(handleSuccess, handleError)
          
        function handleSuccess(res) {
          vm.snippet = res;
          vm.errors = {};
          if (vm.currentUser && vm.snippet.user_id === vm.currentUser.id) {
            vm.showDeleteButton = true;
          } else {
            vm.showDeleteButton = false;
          }
        }
      
        function handleError(res){
          vm.errors = res;
          Flash.create('danger', 'Snippet not found');
          $state.go('snippetsIndex');
        }
      }
    }
  }
})();