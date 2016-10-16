(function() {
  'use strict';
  // Usage:
  //
  // Creates:
  //

  var snippetDelete = {
    bindings: {
      id: '='
    },
    templateUrl: 'app/components/snippetDelete/snippetDelete.html',
    controller: snippetDeleteController,
    controllerAs: 'vm'
  };

  snippetDeleteController.$inject = ['Snippet', '$state', 'Flash']
  function snippetDeleteController (Snippet, $state, Flash) {
    var vm = this; 
    vm.id;
    vm.deleteSnippet;

    activate() 

    /////////////////////

    function activate() {
      vm.deleteSnippet = deleteSnippet;

      function deleteSnippet(id) {
          Snippet
            .deleteSnippet(id)
            .then(handleSuccess, handleError)
          
          function handleSuccess() {
            vm.message = "Snippet Successfully Deleted";
            vm.errors = {};
            Flash.create('success', vm.message);
            $state.go('snippetsIndex');
          }
      
          function handleError(res){
            vm.errors = res.data;
          }
      }
    }
  }

  angular
    .module('dlmSnippetMachine')
    .component('snippetDelete', snippetDelete);

})();