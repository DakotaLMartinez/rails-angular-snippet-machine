(function() {
'use strict';

  angular
    .module('dlmSnippetMachine')
    .controller('SnippetIndexController', SnippetIndexController);

  SnippetIndexController.$inject = ['Snippet', '$auth', '$rootScope'];
  function SnippetIndexController(Snippet, $auth, $rootScope) {
    var vm = this;
    vm.snippets = [];

    activate();

    ////////////////

    function activate() { 
      function getSnippets() {
        Snippet
          .getSnippets()
          .then(function(res){
            vm.snippets = res;
          });
      }

      $rootScope.$on('auth:login-success', function(ev,user){
        getSnippets();
      });

      $rootScope.$on('auth:logout-success', function(ev){
        vm.snippets = [];
      });
      
      getSnippets();
    }
  }
})();