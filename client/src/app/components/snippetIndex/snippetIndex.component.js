(function() {
'use strict';

  // Usage:
  // 
  // Creates:
  // 

  angular
    .module('dlmSnippetMachine')
    .component('snippetIndex', {
      templateUrl: 'app/components/snippetIndex/snippetIndex.html',
      controller: SnippetIndexController,
      bindings: {
        userId: '=',
        profilePage: '<'
      },
      controllerAs: 'vm'
    });

  SnippetIndexController.$inject = ['Snippet', 'User', 'Language', '$timeout', '$rootScope', '$log']
  function SnippetIndexController (Snippet, User, Language, $timeout, $rootScope, $log) {
    var $ctrl = this;
    $ctrl.snippets = [];
    $ctrl.itemsPerPage = $ctrl.itemsPerPage || 5;
    $ctrl.languages = Language.listSupportedLanguages();
    if ($ctrl.profilePage === true) {
      $ctrl.title = "My Snippets";
    } else {
      $ctrl.title = "Snippets index";
    }

    $ctrl.loadSnippets = loadSnippets;
    

    ////////////////

    $ctrl.$onInit = function() {
      $ctrl.loadSnippets = loadSnippets; 
      $ctrl.errors = {};
      $ctrl.notLoaded = true;
      $ctrl.showAddButton = User.loggedIn();

      loadSnippets();

      // adds retry to load snippets after 1.1 seconds 
      // this prevents a premature error if user 
      // not loaded before requesting snippets from api
      // $timeout(loadSnippets,1100);

      $rootScope.$on('auth:logout-success', function(){
        loadSnippets(true);
      })


    };
    $ctrl.$onChanges = function(changesObj) { };
    $ctrl.$onDestroy = function() { };

    ////////////////

    function loadSnippets(reload) {
      if ($ctrl.profilePage === true) {
        if ($ctrl.userId) {
          if ($ctrl.notLoaded || reload) {
            getUserSnippets($ctrl.userId);
          } else {
            $log.log('$ctrl.notLoaded || reload is returning false');
          }
        } else {
          // waits 2.5 seconds (till after retry of loadSnippets)
          // before displaying an error. Displays an error if both 
          // attempts to load snippets fail. (notLoaded is still true)
          $timeout(function(){
            if ($ctrl.notLoaded) {
              $ctrl.errors.user = ['must be loaded before snippets can be fetched - please click reload snippets button'];
            }
          }, 2500);
        }
      } else {
        if ($ctrl.notLoaded || reload) {
          $log.log('should be calling api');
          getAllSnippets();
        } else {
          $log.log('$ctrl.notLoaded || reload is returning false');
        }
      }
    }

    function getAllSnippets() {
      Snippet 
        .getSnippets()
        .then(handleSuccess, handleError)

      function handleSuccess(res) {
        $ctrl.snippets = res; 
        $ctrl.errors = {};
        $ctrl.notLoaded = false;
      }
      
      function handleError(res) {
        $ctrl.errors = res;
      }
    }

    function getUserSnippets(id) {
      User 
        .getUserSnippets(id)
        .then(handleSuccess, handleError)

      function handleSuccess(res) {
        $ctrl.snippets = res; 
        $ctrl.errors = {};
        $ctrl.notLoaded = false;
      }

      function handleError(res) {
        $ctrl.errors = res;
      }
    }
  }
})();