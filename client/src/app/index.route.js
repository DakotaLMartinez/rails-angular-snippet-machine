(function() {
  'use strict';

  angular
    .module('dlmSnippetMachine')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('register', {
        url: '/sign_up', 
        templateUrl: 'app/components/createAccount/createAccount.html', 
        controller: 'createAccountController', 
        controllerAs: 'vm'
      })
      
      .state('signIn', {
        url: '/sign_in', 
        templateUrl: 'app/components/loginForm/loginForm.html', 
        controller: 'loginFormController', 
        controllerAs: 'vm'
      })
      
      .state('snippetsIndex', {
        url: '/',
        template: '<snippet-index></snippet-index>'
      })
      
      .state('snippetNew', {
        url: '/snippets/new', 
        template: '<snippet-new></snippet-new>',
        resolve: {
          auth: ['$auth', '$q', function($auth, $q) {
            var deferred = $q.defer();
            if ($auth.validateUser()) {
              return deferred.resolve({});
            } else {
              return deferred.reject({redirectTo: 'signIn'});
            }
          }]
        }
      })
      
      .state('snippetShow', {
        url: '/snippets/:id',
        template: '<snippet-show id="$resolve.snippetId"></snippet-show>',
        resolve: {
          snippetId: ['$stateParams', function($stateParams){
            return $stateParams.id;
          }]
        }
      })

      .state('snippetShow.vscode', {
        url: '/vscode', 
        controller: function(snippetId) {
          var $ctrl = this;
          $ctrl.snippetId = snippetId;
        },
        template: '<vs-code-snippet id="$ctrl.snippetId"></vs-code-snippet>',
        controllerAs: '$ctrl'
      })

      .state('snippetShow.sublime', {
        url: '/sublime', 
        controller: function(snippetId) {
          var $ctrl = this;
          $ctrl.snippetId = snippetId;
        },
        template: '<sublime snippet-id="$ctrl.snippetId"></sublime>',
        controllerAs: '$ctrl'
      })
      
      .state('snippetEdit', {
        url: '/snippets/:id/edit', 
        template: '<snippet-edit></snippet-edit>'
      })

      .state('userProfile', {
        url: '/profile', 
        template: '<user-profile></user-profile>',
        resolve: {
          auth: ['$auth', '$q', function($auth, $q) {
            var deferred = $q.defer();
            if ($auth.validateUser()) {
              return deferred.resolve({});
            } else {
              return deferred.reject({redirectTo: 'signIn'});
            }
          }]
        }
      })
      
      .state('instructions', {
        url: '/instructions', 
        template: '<instructions></instructions>'
      });

    $urlRouterProvider.otherwise('/');
  }

})();
