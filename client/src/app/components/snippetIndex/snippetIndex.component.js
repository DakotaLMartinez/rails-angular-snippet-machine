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

  SnippetIndexController.$inject = ['Snippet', 'User', 'Language', '$timeout', '$rootScope']
  function SnippetIndexController (Snippet, User, Language, $timeout, $rootScope) {
    var vm = this; 
    vm.snippets = [];
    vm.itemsPerPage = vm.itemsPerPage || 5;
    vm.languages = Language.listSupportedLanguages();
    if (vm.profilePage === true) {
      vm.title = "My Snippets";
    } else {
      vm.title = "Snippets Index";
    }
    vm.showAddButton = User.loggedIn();
    
    activate();

    ///////////////////////////////

    $rootScope.$on('auth:logout-success', function(){
      vm.showAddButton = User.loggedIn();
    })

    $rootScope.$on('auth:registration-email-success', function(){
      vm.showAddButton = User.loggedIn();
    })

    $rootScope.$on('auth:login-success', function(){
      vm.showAddButton = User.loggedIn();
    })

    function activate() {
      vm.loadSnippets = loadSnippets;
      vm.errors = {};
      vm.showError = true;
      vm.showAddButton = User.loggedIn();
     
      loadSnippets();

      $timeout(loadSnippets, 1100);

      function loadSnippets() {
        if (vm.profilePage === true) {
          if (vm.userId) {
            getUserSnippets(vm.userId);
          } else {
            $timeout(function(){
              if (vm.showError) {
                vm.errors.user = ['must be loaded before snippets can be fetched - please click reload snippets button'];
              }
            }, 2500);
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
            vm.showError = false;
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