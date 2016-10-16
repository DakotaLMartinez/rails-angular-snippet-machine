(function() {
  'use strict';
  // Usage:
  //
  // Creates:
  //

  var SnippetIndex = {
    bindings: {
      userId: '=',
      profilePage: '<'
    },
    templateUrl: 'app/components/snippetIndex/snippetIndex.html',
    controller: SnippetIndexController,
    controllerAs: 'vm'
  };

  SnippetIndexController.$inject = ['Snippet', 'User']
  function SnippetIndexController (Snippet, User) {
    var vm = this; 
    vm.snippets = [];
    if (vm.profilePage === true) {
      vm.title = "My Snippets";
    } else {
      vm.title = "Snippets Index";
    }
    
    activate();

    ///////////////////////////////

    function activate() {
      vm.loadSnippets = loadSnippets;
      vm.errors = {};
     
      loadSnippets();

      function loadSnippets() {
        if (vm.profilePage === true) {
          if (vm.userId) {
            getUserSnippets(vm.userId);
          } else {
            vm.errors.user = ['must be loaded before snippets can be fetched - please click reload snippets button'];
          }
        } else {
          getAllSnippets();
        }
      }
      
      function getAllSnippets() {
        Snippet
          .getSnippets()
          .then(handleSuccess, handleError)
        
        function handleSuccess(res) {
          vm.snippets = res;
          vm.errors = {};
        }

        function handleError(res){
          vm.errors = res;
        }
      }

      function getUserSnippets(id) {
          User
            .getUserSnippets(id)
            .then(handleSuccess, handleError)
          
          function handleSuccess(res) {
            vm.snippets = res;
            vm.errors = {};
          }
      
          function handleError(res){
            vm.errors = res;
          }
      }

    }
  }

  angular
    .module('dlmSnippetMachine')
    .component('snippetIndex', SnippetIndex);

})();